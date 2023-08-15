namespace Buffer {
    /**
     * Allocate a new buffer.
     * @param size number of bytes in the buffer
     */
    //% shim=control::createBuffer
    export declare function create(size: number): Buffer;

    /**
     * Create a new buffer, decoding a hex string
     */
    export function fromHex(hex: string) {
        const hexStr = "0123456789abcdef"
        const res = Buffer.create(hex.length >> 1)
        hex = hex.toLowerCase()
        for (let i = 0; i < hex.length; i += 2) {
            const p0 = hexStr.indexOf(hex.charAt(i))
            const p1 = hexStr.indexOf(hex.charAt(i + 1))
            if (p0 < 0 || p1 < 0)
                throw "Invalid hex"
            res[i >> 1] = (p0 << 4) | p1
        }
        return res
    }

    function b64Idx(c: string) {
        if (c === undefined || c == "=") return -1

        // handle base64url
        if (c == "-") return 62
        if (c == "_") return 63

        const r = helpers._b64.indexOf(c)
        if (r < 0)
            throw "Invalid Base64"
        return r
    }

    function fromBase64Core(trg: Buffer, b64: string) {
        const len = b64.length
        let dp = 0
        for (let i = 0; i < len; i += 4) {
            const x0 = b64Idx(b64[i])
            const x1 = b64Idx(b64[i + 1])
            const x2 = b64Idx(b64[i + 2])
            const x3 = b64Idx(b64[i + 3])
            if (x0 < 0 || x1 < 0) throw "Invalid Base64"
            if (trg)
                trg[dp] = (x0 << 2) | (x1 >> 4)
            dp++
            if (x2 >= 0) {
                if (trg)
                    trg[dp] = (x1 << 4) | (x2 >> 2)
                dp++
                if (x3 >= 0) {
                    if (trg)
                        trg[dp] = (x2 << 6) | x3
                    dp++
                }
            } else {
                if (x3 >= 0 || i + 4 < len)
                    throw "Invalid Base64"
            }
        }
        return dp
    }

    /**
     * Create a new buffer, decoding a Base64 string
     */
    export function fromBase64(b64: string) {
        const sz = fromBase64Core(null, b64)
        const res = create(sz)
        fromBase64Core(res, b64)
        return res
    }

    /**
     * Create a new buffer from an UTF8-encoded string
     * @param str the string to put in the buffer
     */
    //% shim=control::createBufferFromUTF8
    export declare function fromUTF8(str: string): Buffer;

    function chunkLen(s: string, off: number, maxlen: number) {
        let L = Math.idiv(maxlen, 3)
        let R = maxlen

        if (fromUTF8(s.slice(off, off + R)).length <= maxlen)
            return R

        while (L < R) {
            const m = (L + R) >> 1
            if (m == L)
                break
            const ll = fromUTF8(s.slice(off, off + m)).length
            if (ll <= maxlen)
                L = m
            else
                R = m
        }

        return L
    }

    export function chunkedFromUTF8(str: string, maxBytes: number) {
        if (maxBytes < 3)
            throw "Oops"
        const chunks: Buffer[] = []
        let pos = 0
        while (pos < str.length) {
            const len = chunkLen(str, pos, maxBytes)
            chunks.push(fromUTF8(str.slice(pos, pos + len)))
            pos += len
        }
        return chunks
    }

    /**
     * Create a new buffer initialized to bytes from given array.
     * @param bytes data to initialize with
     */
    export function fromArray(bytes: number[]) {
        let buf = Buffer.create(bytes.length)
        for (let i = 0; i < bytes.length; ++i)
            buf[i] = bytes[i]
        return buf
    }

    /**
     * Concatenates all buffers in the list
     */
    export function concat(buffers: Buffer[]) {
        let len = 0
        for (let b of buffers)
            len += b.length
        const r = Buffer.create(len)
        len = 0
        for (let b of buffers) {
            r.write(len, b)
            len += b.length
        }
        return r
    }

    // Python-like packing, see https://docs.python.org/3/library/struct.html

    export function packedSize(format: string) {
        return __packUnpackCore(format, null, null, true)
    }

    export function pack(format: string, nums: number[]) {
        let buf = Buffer.create(packedSize(format))
        __packUnpackCore(format, nums, buf, true)
        return buf
    }

    function getFormat(pychar: string, isBig: boolean) {
        switch (pychar) {
            case 'B':
                return NumberFormat.UInt8LE
            case 'b':
                return NumberFormat.Int8LE
            case 'H':
                return isBig ? NumberFormat.UInt16BE : NumberFormat.UInt16LE
            case 'h':
                return isBig ? NumberFormat.Int16BE : NumberFormat.Int16LE
            case 'I':
            case 'L':
                return isBig ? NumberFormat.UInt32BE : NumberFormat.UInt32LE
            case 'i':
            case 'l':
                return isBig ? NumberFormat.Int32BE : NumberFormat.Int32LE
            case 'f':
                return isBig ? NumberFormat.Float32BE : NumberFormat.Float32LE
            case 'd':
                return isBig ? NumberFormat.Float64BE : NumberFormat.Float64LE
            default:
                return null as NumberFormat
        }
    }

    function isDigit(ch: string) {
        const code = ch.charCodeAt(0)
        return 0x30 <= code && code <= 0x39
    }

    export function __packUnpackCore(format: string, nums: number[], buf: Buffer, isPack: boolean, off = 0) {
        let isBig = false
        let idx = 0
        for (let i = 0; i < format.length; ++i) {
            switch (format[i]) {
                case ' ':
                case '<':
                case '=':
                    isBig = false
                    break
                case '>':
                case '!':
                    isBig = true
                    break
                default:
                    const i0 = i
                    while (isDigit(format[i])) i++
                    let reps = 1
                    if (i0 != i)
                        reps = parseInt(format.slice(i0, i))
                    if (format[i] == 'x')
                        off += reps
                    else
                        while (reps--) {
                            let fmt = getFormat(format[i], isBig)
                            if (fmt === null) {
                                throw "Unknown format character " + format[i]
                            } else {
                                if (buf) {
                                    if (isPack)
                                        buf.setNumber(fmt, off, nums[idx++])
                                    else
                                        nums.push(buf.getNumber(fmt, off))
                                }

                                off += sizeOfNumberFormat(fmt)
                            }
                        }
                    break
            }
        }
        return off
    }

    /**
     * Get the size in bytes of specified number format.
     */
    export function sizeOfNumberFormat(format: NumberFormat) {
        switch (format) {
            case NumberFormat.Int8LE:
            case NumberFormat.UInt8LE:
            case NumberFormat.Int8BE:
            case NumberFormat.UInt8BE:
                return 1;
            case NumberFormat.Int16LE:
            case NumberFormat.UInt16LE:
            case NumberFormat.Int16BE:
            case NumberFormat.UInt16BE:
                return 2;
            case NumberFormat.Int32LE:
            case NumberFormat.Int32BE:
            case NumberFormat.UInt32BE:
            case NumberFormat.UInt32LE:
            case NumberFormat.Float32BE:
            case NumberFormat.Float32LE:
                return 4;
            case NumberFormat.Float64BE:
            case NumberFormat.Float64LE:
                return 8;
        }
        return 0;
    }
    
}
namespace helpers {
    export function bufferConcat(a: Buffer, b: Buffer) {
        const r = Buffer.create(a.length + b.length)
        r.write(0, a)
        r.write(a.length, b)
        return r
    }

    export function bufferEquals(l: Buffer, r: Buffer) {
        if (!l || !r) return !!l == !!r;
        if (l.length != r.length) return false;
        for (let i = 0; i < l.length; ++i) {
            if (l[i] != r[i])
                return false;
        }
        return true;
    }

    export function bufferIndexOf(a: Buffer, b: Buffer) {
        for (let i = 0; i <= a.length - b.length; ++i) {
            if (a[i] == b[0]) {
                let j = 0
                while (j < b.length) {
                    if (a[i + j] != b[j])
                        break
                    j++
                }
                if (j >= b.length)
                    return i
            }
        }
        return -1
    }

    export function bufferUnpack(buf: Buffer, format: string, offset?: number) {
        if (!offset) offset = 0
        let res: number[] = []
        Buffer.__packUnpackCore(format, res, buf, false, offset)
        return res
    }

    export function bufferPackAt(buf: Buffer, offset: number, format: string, nums: number[]) {
        Buffer.__packUnpackCore(format, nums, buf, true, offset)
    }

    export function bufferChunked(buf: Buffer, maxBytes: number) {
        if (buf.length <= maxBytes) return [buf]
        else {
            const r: Buffer[] = []
            for (let i = 0; i < buf.length; i += maxBytes)
                r.push(buf.slice(i, maxBytes))
            return r
        }
    }

    export function bufferToArray(buf: Buffer, format: NumberFormat) {
        const sz = Buffer.sizeOfNumberFormat(format)
        const len = buf.length - sz
        const r: number[] = []
        for (let i = 0; i <= len; i += sz)
            r.push(buf.getNumber(format, i))
        return r
    }

    export const _b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    export function bufferToBase64(buf: Buffer) {
        const len = buf.length
        let r = ""
        for (let i = 0; i < len; i += 3) {
            const x0 = buf[i]
            r += _b64[x0 >> 2]
            if (i + 1 >= len) {
                r += _b64[(x0 & 3) << 4] + "=="
            } else {
                const x1 = buf[i + 1]
                r += _b64[(x0 & 3) << 4 | (x1 >> 4)]
                if (i + 2 >= len) {
                    r += _b64[(x1 & 15) << 2] + "="
                } else {
                    const x2 = buf[i + 2]
                    r += _b64[(x1 & 15) << 2 | (x2 >> 6)]
                    r += _b64[x2 & 63]
                }
            }
        }
        return r
    }
}
interface Buffer {
    [index: number]: number;

    /**
     * Return concatenation of current buffer and the given buffer
     */
    //% helper=bufferConcat
    concat(other: Buffer): Buffer;

    /**
     * Return position of other buffer in current buffer
     */
    //% helper=bufferIndexOf
    indexOf(other: Buffer): number;

    /**
     * Reads numbers from the buffer according to the format
     */
    //% helper=bufferUnpack
    unpack(format: string, offset?: number): number[];

    /**
     * Writes numbers to the buffer according to the format
     */
    //% helper=bufferPackAt
    packAt(offset: number, format: string, nums: number[]): void;

    /**
     * Returns true if this and the other buffer hold the same data
     */
    //% helper=bufferEquals
    equals(other: Buffer): boolean;

    /**
     * Splits buffer into parts no larger than specified
     */
    //% helper=bufferChunked
    chunked(maxSize: number): Buffer[];

    /**
     * Read contents of buffer as an array in specified format
     */
    //% helper=bufferToArray
    toArray(format: NumberFormat): number[];

    /**
     * Convert buffer to ASCII base64 encoding.
     */
    //% helper=bufferToBase64
    toBase64(): string;
        /**
     * Write a number in specified format in the buffer.
     */
    //% shim=BufferMethods::setNumber
    setNumber(format: NumberFormat, offset: int32, value: number): void;

    /**
     * Read a number in specified format from the buffer.
     */
    //% shim=BufferMethods::getNumber
    getNumber(format: NumberFormat, offset: int32): number;

    /** Returns the length of a Buffer object. */
    //% property shim=BufferMethods::length
    length: int32;

    /**
     * Fill (a fragment) of the buffer with given value.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::fill
    fill(value: int32, offset?: int32, length?: int32): void;

    /**
     * Return a copy of a fragment of a buffer.
     */
    //% offset.defl=0 length.defl=-1 shim=BufferMethods::slice
    slice(offset?: int32, length?: int32): Buffer;

        /**
     * Write contents of `src` at `dstOffset` in current buffer.
     */
    //% shim=BufferMethods::write
    write(dstOffset: int32, src: Buffer): void;

    // rest defined in buffer.cpp
}
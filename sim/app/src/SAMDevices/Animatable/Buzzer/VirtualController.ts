import BaseVirtualController from "../../../Utils/Controllers/VirtualController"
import ToneGenerator from "../../../Utils/Tones/toneGenerator/Controller"
const pitchToHertz = {
    0: 0,
    1: 440,
    2: 466.16,
    3: 493.88,
    4: 523.25,
    5: 554.37,
    6: 587.33,
    7: 622.25,
    8: 659.26,
    9: 698.46,
    10: 739.99,
    11: 783.99,
    12: 830.61,
}

export default class VirtualController extends BaseVirtualController {
     _toneGenerator: ToneGenerator
     _volume: number
    on: any
    constructor(...params: any) {
        super(...params)
        this._toneGenerator = new ToneGenerator()
        this._toneGenerator.setWave('square')
        this._volume = 100
        this._toneGenerator.setVolume(this._volume)
        this._toneGenerator.setPitch(0)
        this._toneGenerator.start()
        this.on('valueChanged', () => {
            // @ts-ignore
            const hertz = pitchToHertz[(this._pitch % 13)] / 2

            this._toneGenerator.setVolume(this._volume)
            this._toneGenerator.setPitch(hertz)
        })
    }
}
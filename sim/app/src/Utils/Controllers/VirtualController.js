import EventEmitter from 'event-emitter'
import {
    observable,
} from 'mobx'
import { parameterValidator } from '../index'


class Color {
    @observable
    r

    @observable
    g

    @observable
    b
}

class VirtualController extends EventEmitter {
    color = new Color()

    constructor(defaultDeviceColor, namePrefix) {
        super()
        this._getDefaultDeviceColor = () => defaultDeviceColor
        this.setColor(this._getDefaultDeviceColor())
        this._namePrefix = namePrefix
        this._device
        this._isConnected = true
        this._color
    }

    _setWriteCharacteristicValue = () => {
        this.emit('valueChanged')
    }

    setColor = parameterValidator(['string'], (hexColor) => {
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            } : null
        }

        var rgb = hexToRgb(hexColor)
        if(!rgb) throw new Error(`"${hexColor}" is not a valid color.`)
        this._color = rgb
        this.color.r = rgb.r
        this.color.g = rgb.g
        this.color.b = rgb.b
        //this._writeColor = true
        //this._write()
    })

    reset = () => {
        // Previously, when the program stopped I returned it back
        // to the original color.  If we want that behavior back then uncomment this.
        //this.setColor(this._getDefaultDeviceColor())
        this._reset && this._reset()
    }

}

export default VirtualController
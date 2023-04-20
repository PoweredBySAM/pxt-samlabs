import { parameterValidator } from "../../../Utils"


export default (SuperController:any) => (
    class Controller extends SuperController {
        constructor(appManager:any) {
            super(appManager, 'SAM RGB LED')
            this._ledColor = '#000000'
            this._ledBrightness = 100
        }

        _reset = () => {
            this.setLEDBrightness(100)
            this.setLEDColor('#000000')
        }

        _hexToRgB = (hex: string) => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

            return result ? {
                r: Math.round(parseInt(result[1], 16) * (this._ledBrightness / 100)),
                g: Math.round(parseInt(result[2], 16) * (this._ledBrightness / 100)),
                b: Math.round(parseInt(result[3], 16) * (this._ledBrightness / 100)),
            } : null
        }

        getLEDBrightness = () => this._ledBrightness

        setLEDBrightness = (brightness: number) => {
            // Ignore parameters that aren't numbers, and restrict the
            // value to between 0 and 100
            if(typeof brightness !== 'number') return
            if(brightness > 100) brightness = 100
            if(brightness < 0) brightness = 0

            this._ledBrightness = brightness
            this.setLEDColor(this._ledColor)
        }

        getLEDColor = () => this._ledColor

        isLEDOn = () => this._ledColor !== '#000000'

        turnLEDOff = () => this.setLEDColor('#000000')

        setLEDColor = parameterValidator(['string'], (hexColor: string) => {
            var rgb = this._hexToRgB(hexColor)
            if(!rgb) throw new Error(`"${hexColor}" is not a valid color.`)
            this._ledColor = hexColor
            this._setWriteCharacteristicValue([rgb.r, rgb.g, rgb.b])
        })
    }
)
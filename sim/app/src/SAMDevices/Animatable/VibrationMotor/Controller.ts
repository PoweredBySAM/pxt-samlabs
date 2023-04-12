import { parameterValidator } from "../../../Utils"

export default (SuperController: any) => (
    class Controller extends SuperController {
        constructor(appManager: any) {
            super(appManager, 'SAM Vibrator')
            this._intensity = 0
            this._adjustedIntensity = 0
        }

        _reset = () => {
            this._intensity = 0
            this._setWriteCharacteristicValue([this._intensity])
        }

        getIntensity = () => this._adjustedIntensity

        setIntensity = parameterValidator(['number'], (intensity: number) => {
            if(!intensity) intensity = 0
            if(intensity > 100) intensity = 100
            if(intensity < -100) intensity = -100
            let adjustedValue = Math.floor((Math.abs(intensity)/100) * 127)
            if(intensity < 0) {
                adjustedValue = adjustedValue + 128
            }
            if(this._intensity === adjustedValue) return
            this._adjustedIntensity = intensity
            this._intensity = adjustedValue
            this._setWriteCharacteristicValue([this._intensity])
        })
    }
)
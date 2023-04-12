import { parameterValidator } from "../../../Utils"

export default (SuperController: any) => (
    class Controller extends SuperController {
        constructor(appManager: any) {
            super(appManager, 'SAM DC Motor')
            this._speed = 0
            this._adjustedSpeed = 0
        }

        _reset = () => {
            this._speed = 0
            this._adjustedSpeed = 0
            this._setWriteCharacteristicValue([this._speed])
        }

        getSpeed = () => this._adjustedSpeed

        setSpeed = parameterValidator(['number'], (speed: number) => {
            if(!speed) speed = 0
            if(speed > 100) speed = 100
            if(speed < -100) speed = -100
            let adjustedValue = Math.floor((Math.abs(speed)/100) * 127)
            if(speed < 0) {
                adjustedValue = adjustedValue + 128
            }
            if(this._speed === adjustedValue) return
            this._adjustedSpeed = speed
            this._speed = adjustedValue
            this._setWriteCharacteristicValue([this._speed])
        })
    }
)
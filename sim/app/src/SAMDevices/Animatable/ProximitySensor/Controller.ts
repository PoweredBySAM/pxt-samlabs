export default (SuperController: any) => (
    class Controller extends SuperController {
        constructor(appManager: any) {
            super(appManager, 'SAM IR Sensor')
            this._value = 0
        }

        getValue = () => this._value

        _onReadCharacteristicValueChanged = (value: any[]) => {
            const rawValue = value[0]
            let processedValue
            if(rawValue <= 10) {
                processedValue = 0
            }
            else if(rawValue >= 245) {
                processedValue = 100
            }
            else {
                processedValue = Math.floor((rawValue / 255) * 100)
            }

            if(this._value !== processedValue) {
                this._value = processedValue
                this.emit('valueChanged', processedValue)
            }
        }
    }
)
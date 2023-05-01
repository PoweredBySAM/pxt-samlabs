export default (SuperController: any) => (
    class Controller extends SuperController {
        constructor(appManager: any) {
            super(appManager, 'SAM RotaryPot')
            this._value = 0
        }

        getValue = () => this._value

        _onReadCharacteristicValueChanged = (value: any[]) => {
            const rawValue = value[0]
            const processedValue = Math.floor((rawValue / 255) * 100)

            if(this._value !== processedValue) {
                this._value = processedValue
                this.emit('valueChanged', processedValue)
            }
        }
    }
)

export default (SuperController: any) => (
    class Controller extends SuperController {
        constructor(appManager: any) {
            super(appManager, 'SAM Tilt')
            this._value = false
        }

        getValue = () => this._value

        _onReadCharacteristicValueChanged = (value: any[]) => {
            let isTilted = !!value[0]

            if(this._value !== isTilted) {
                this._value = isTilted
                this.emit('valueChanged', isTilted)
            }
        }
    }
)
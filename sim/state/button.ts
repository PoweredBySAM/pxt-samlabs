namespace samlabs{
    /**
     * A Button.
     */
    //%
    export class SamButton {
        private _pressed: boolean;
        public deviceName = 'sam_button'
        constructor() {
                const detail = {
                    device: this.deviceName,
                    event: 'device_created',
                }
                this._dispatch({ device: this.deviceName, detail }, samlabs.samSimEvents.TOSIM_DEVICE_CREATED)
        }
        public get pressed() {
            return this._pressed;
     }  

     _dispatch(payload: any, type: string) {
        samlabs.WindowEventService.getInstance().sendEvent(type, { ...payload });
      }
    }
}
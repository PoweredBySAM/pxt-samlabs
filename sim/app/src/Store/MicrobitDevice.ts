import {action, makeAutoObservable, observable} from "mobx";

class MicrobitDevice{
    private _virtualController: any;
    private _bluetoothController: any;
    private _deviceId: string;
    possibleStates: any;
    restProps: any;
    virtualInteractionComponentName: string;

    @observable isConnected = false;
    @observable isConnecting = false;
    @observable  isActive: boolean;
    @observable blockVisibility: boolean;
    @observable deviceInTestMode: boolean;
    @observable deleted: boolean;
    constructor(deviceData: any) {
        const {
            deviceIdOnCreate,
            meta,
            virtualInteractionComponentName,
            virtualController,
            controller,
            ...restprops
        } = deviceData;
        this._deviceId = deviceIdOnCreate;
        this.virtualInteractionComponentName = virtualInteractionComponentName;
        this._virtualController = virtualController;
        this._bluetoothController = controller;
        this.restProps = restprops;
        this.isActive = false;
        this.blockVisibility = true;
        this.deviceInTestMode = false;
        this.deleted = false;
        makeAutoObservable(this);
    }
    @action
    toggleVisibility() {
        this.blockVisibility = !this.blockVisibility;
    }
    @action
    toggleTestMode() {
        this.deviceInTestMode = !this.deviceInTestMode;
    }
    @action
    deleteDevice() {
        this.deleted = true;
    }
    get virtualController() {
        return this._virtualController;
    }
    get bluetoothController() {
        return this._bluetoothController;
    }
    set virtualController(controller: any) {
        this._virtualController = controller;
    }

}


export default MicrobitDevice;
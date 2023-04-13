import { observable, action, makeObservable } from 'mobx';

class Device {
  id;
  @observable isConnected = false;
  @observable state = false;

  constructor(id: any) {
    makeObservable(this);
    this.id = id;
  }
  @action
  updateState(newState:any) {
    this.state = newState;
  }

  @action connect() {
    this.isConnected = true;
  }

  @action disconnect() {
    this.isConnected = false;
  }
}

export default Device;

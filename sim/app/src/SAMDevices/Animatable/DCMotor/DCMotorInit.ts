import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import DCMotor from './DCMotor'

interface IDCMotorInit {
    id: string,
    Controller: any,
    VirtualController: any,
    VirtualInteractionComponent: any,

    meta: {
        hue: string,
        description: string,
        bluetooth: boolean,
        possibleStates?: string[],
        defaultState?: string,
        eventLog?: {
            name: string,
            event: string,
        }[],
        sensorData?: {
            items: {
                title: string,
                subscribeInfo: {
                    fn: string,
                    events: string[],
                },
            }[],
        }[],
    },
}
const DCMotorInit: IDCMotorInit = {
    id: 'DCMotor',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: DCMotor,

    meta: {
        hue: '#08d0c4',
        description: 'Easily control the speed and the direction of the motor.',
        bluetooth: true,

    },
}
export default DCMotorInit;
import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import Servo from './Servo'

interface IServoMotorInit {
    id: string,
    Controller: any,
    VirtualController: any,
    VirtualInteractionComponent: ({device}:{device:any})=>JSX.Element,
    meta: {
        hue: string,
        description: string,
        bluetooth: boolean,
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

const ServoMotorInit:IServoMotorInit = {
    id: 'ServoMotor',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: Servo,

    meta: {
        hue: '#08d0c4',
        description: 'Turns back and forth by 180 degrees.',
        bluetooth: true,
    },
}
export default ServoMotorInit;
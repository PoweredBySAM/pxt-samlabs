import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import PressureSensor from './PressureSensor'
import PressureSensorDevice from '../../../Store/PressureSensorDevice'

interface IPressureSensorInit {
    id: string,
    Controller: any,
    VirtualController: any,
    VirtualInteractionComponent: ({device}:{device:PressureSensorDevice})=>JSX.Element,
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

const PressureSensorInit:IPressureSensorInit = {
    id: 'PressureSensor',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: PressureSensor,
    meta: {
        hue: '#08d0c4',
        description: 'Get values from 0 to 100 depending on force.',
        bluetooth: true,
        sensorData: [
            {
                items: [
                    {
                        title: 'Value',
                        subscribeInfo: {
                            fn: 'getValue',
                            events: ['valueChanged'],
                        },
                    },
                ],
            },
        ],
    },
}
export default PressureSensorInit
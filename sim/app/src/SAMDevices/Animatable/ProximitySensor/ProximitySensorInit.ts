import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import PressureSensorDevice from '../../../Store/PressureSensorDevice'
import ProximitySensor from './ProximitySensor'

interface IProximitySensorInit {
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
const ProximitySensorInit:IProximitySensorInit =  {
    id: 'ProximitySensor',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: ProximitySensor,
    meta: {
        hue: '#08d0c4',
        description: 'Sense how close you or objects are and communicate that to other devices.',
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
export default ProximitySensorInit
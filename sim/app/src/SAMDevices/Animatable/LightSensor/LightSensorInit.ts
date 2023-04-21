import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import LightSensor from './LightSensor'

interface ILightSensorInit {
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

const LightSensorInit:ILightSensorInit = {
    id: 'LightSensor',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: LightSensor,
    meta: {
        hue: '#08d0c4',
        description: 'Detect how much light there is and transform that into an action.',
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
        ]
    },
}
export default LightSensorInit
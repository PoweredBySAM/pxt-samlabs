import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import Slider from './Slider'

interface ISliderInit {
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
const SliderInit:ISliderInit = {
    id: 'Slider',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: Slider,

    meta: {
        hue: '#08d0c4',
        description: 'Get values from 0 to 100. Use it as a game controller, steer your robot or dim your lights.',
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
export default SliderInit
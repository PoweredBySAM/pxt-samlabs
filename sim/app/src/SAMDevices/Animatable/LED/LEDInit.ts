import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import LED from './LED'

interface ILEDInit {
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

export const LEDInit:ILEDInit = {
    id: 'LED',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: LED,
    meta: {
        hue: '#08d0c4',
        description: 'A light that can flash, stay on, dim, or cycle through any colour.',
        bluetooth: true,
    },
}
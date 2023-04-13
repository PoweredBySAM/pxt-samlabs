import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
// import VirtualInteraction from './VirtualInteraction'

interface IButtonInit {
    id: string,
    Controller: any,
    VirtualController: any,
    meta: {
        hue: string,
        description: string,
        bluetooth: boolean,
        eventLog: {
            name: string,
            event: string,
        }[],
        sensorData: {
            items: {
                title: string,
                subscribeInfo: {
                    fn: string,
                    events: string[],
                },
            }[],
        }[],
        // VirtualInteractionComponent: any,
    },
}


const ButtonInit: IButtonInit = {
    id: 'Button',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    meta: {
        hue: '#08d0c4',
        description: 'Make a tune on a Buzzer, turn it to a smart doorbell or build an instant pizza button.',
        bluetooth: true,
        eventLog: [
            {
                name: 'Pressed',
                event: 'pressed',
            },
            {
                name: 'Released',
                event: 'released',
            },
        ],
        sensorData: [
            {
                items: [
                    {
                        title: 'Pressed',
                        subscribeInfo: {
                            fn: 'getIsPressed',
                            events: ['pressed', 'released'],
                        },
                    },
                ],
            },
        ],
        // VirtualInteractionComponent: VirtualInteraction,
    },
}
export default ButtonInit
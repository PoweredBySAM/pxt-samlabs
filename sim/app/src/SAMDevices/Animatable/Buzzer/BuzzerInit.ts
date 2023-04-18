import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from './VirtualController'
import Buzzer from './Buzzer'

interface IBuzzerInit {
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
const BuzzerInit: IBuzzerInit = {
    id: 'Buzzer',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: Buzzer,
    meta: {
        hue: '#08d0c4',
        description: 'Play tunes and melodies.',
        bluetooth: true,
    },
}
export default BuzzerInit;
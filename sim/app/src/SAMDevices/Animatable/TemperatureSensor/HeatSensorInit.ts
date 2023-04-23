import Controller from './Controller'
import BaseController from "../../../Utils/Controllers/BaseController"
import VirtualController from '../../../Utils/Controllers/VirtualController'
import PressureSensorDevice from '../../../Store/PressureSensorDevice'
import HeatSensor from './HeatSensor'
import HeatSensorDevice from '../../../Store/HeatSensorDevice'

interface IHeatSensorInit {
    id: string,
    Controller: any,
    VirtualController: any,
    VirtualInteractionComponent: ({device}:{device:HeatSensorDevice})=>JSX.Element,
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

const HeatSensorInit:IHeatSensorInit =  {
    id: 'TemperatureSensor',
    Controller: Controller(BaseController),
    VirtualController: Controller(VirtualController),
    VirtualInteractionComponent: HeatSensor,
    meta: {
        hue: '#08d0c4',
        description: 'Get the temperature and tell other devices how to react.',
        bluetooth: true,
        sensorData: [
            {
                items: [
                    {
                        title: 'Value Celsius',
                        subscribeInfo: {
                            fn: 'getCelsiusValue',
                            events: ['valueChanged'],
                        },
                    },
                    {
                        title: 'Value Farenheit',
                        subscribeInfo: {
                            fn: 'getFarenheitValue',
                            events: ['valueChanged'],
                        },
                    },
                ],
            },
        ],
    },
}
export default HeatSensorInit
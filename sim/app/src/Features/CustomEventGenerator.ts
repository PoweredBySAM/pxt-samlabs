import {AllSamSimEvents} from 'src/App';
import {BasicEvents} from 'src/Hooks/useSamDeviceQueueEvents';

type EventMap = WindowEventMap & {
    [K in AllSamSimEvents]: CustomEvent;
} & {
    [key: `${BasicEvents.TOSIM_DEVICE_VALUE_CHANGED}_${string}`]: CustomEvent;
};

export class CustomEventGenerator {
    private static instance: CustomEventGenerator;

    private constructor() {}

    static getInstance(): CustomEventGenerator {
        if (!CustomEventGenerator.instance) {
            CustomEventGenerator.instance = new CustomEventGenerator();
        }
        return CustomEventGenerator.instance;
    }

    dispatchEvent(eventName: string, detail: any): void {
        const event = new CustomEvent(eventName, {detail});
        window.dispatchEvent(event);
    }

    receiveEvent<K extends keyof EventMap>(
        eventName: K,
        callback: (event: EventMap[K]) => void
    ) {
        window.addEventListener(eventName as string, callback as EventListener);
        return () => {
            window.removeEventListener(eventName as string, callback as EventListener);
        };
    }

    unregisterEvent(eventName: string, callback: (event: Event) => void) {
        window.removeEventListener(eventName, callback);
    }
}

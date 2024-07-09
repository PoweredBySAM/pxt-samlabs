import {CustomEventGenerator} from 'src/Features/CustomEventGenerator';
import {SamDeviceStoreType} from 'src/SAMDevices/Types/SAMDeviceTypes';
import {BasicEvents} from './useSamDeviceQueueEvents';
import {useSingleDeviceStore} from './useSingleDeviceStore';

function usePxtToSimEvents(device: SamDeviceStoreType) {
    const {singleDeviceStore} = useSingleDeviceStore(device);
    const callback = (event: CustomEvent) => {
        const eventDetail = event.detail.detail;
        singleDeviceStore.setDeviceProp(eventDetail.property, eventDetail.value);
    };
    const addPxtEvents = () => {
        CustomEventGenerator.getInstance().receiveEvent(
            `${BasicEvents.TOSIM_DEVICE_VALUE_CHANGED}_${singleDeviceStore._deviceId}`,
            callback
        );
    };
    const removePxtEvents = () => {
        CustomEventGenerator.getInstance().unregisterEvent(
            `${BasicEvents.TOSIM_DEVICE_VALUE_CHANGED}_${singleDeviceStore._deviceId}`,
            callback as EventListener
        );
    };
    return {addPxtEvents, removePxtEvents};
}

export default usePxtToSimEvents;

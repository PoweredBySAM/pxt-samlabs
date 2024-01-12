import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {Buzzer as SamBuzzer} from '@samlabs/samblocks';
import useEventsController from 'src/Hooks/useEventsController';
import useBasicEvents from 'src/Hooks/useBasicEvents';
import {useSingleDeviceStore} from 'src/Hooks/useSingleDeviceStore';
import {Box} from '@mui/material';
import BuzzerDevice from 'src/Store/BuzzerDevice';
import {bluetoothEvents, hexToRGBA} from 'src/SAMDevices/Animatable';
import usePxtToSimEvents from 'src/Hooks/usePxtToSimEvents';
import DoubleSliderWithHoc from 'src/SAMDevices/Common/DoubleSliderWithHOC';

function Buzzer({device}: {device: BuzzerDevice}) {
    const {handleBasicControllerEvents} = useBasicEvents(device);
    const {singleDeviceStore} = useSingleDeviceStore(device);
    const {blockVisibility, pitch, volume} = singleDeviceStore || {};
    const {addPxtEvents, removePxtEvents} = usePxtToSimEvents(device);
    const {addEvents} = useEventsController(device, handleBasicControllerEvents);

    const handlePitchChange = (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => {
        singleDeviceStore.setPitch(value as number);
    };
    const handleVolumeChange = (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => {
        singleDeviceStore.setVolume(value as number);
    };

    const virtualEvents = ['valueChanged'];

    useEffect(() => {
        addEvents(bluetoothEvents, virtualEvents);
    }, []);
    useEffect(() => {
        addPxtEvents();
        return () => {
            removePxtEvents();
        };
    }, []);
    return (
        <>
            {/*<DoubleSliderWithHoc*/}
            {/*  setSliderOneValue={handlePitchChange}*/}
            {/*  setSliderTwoValue={handleVolumeChange}*/}
            {/*  currentSliderOnValue={pitch}*/}
            {/*  currentSliderTwoValue={volume}*/}
            {/*  controlsVisibility={blockVisibility}*/}
            {/*>*/}
            {/*  {blockVisibility && (*/}
            <Box sx={{mt: 5}}>
                <SamBuzzer
                    getIsActive={() => singleDeviceStore.isActive}
                    getColor={() => (device.Color ? hexToRGBA(device.Color) : undefined)}
                />
            </Box>
            {/*  )}*/}
            {/*</DoubleSliderWithHoc>*/}
        </>
    );
}

export default observer(Buzzer);

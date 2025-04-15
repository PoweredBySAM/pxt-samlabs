import {Box} from '@mui/material';
import React from 'react';
import {getVirtualDevice} from 'src/SAMDevices/Animatable';
import FullSimDeviceWrapper from 'src/SAMDevices/Common/FullSimDeviceWrapper';
import {
    MicrobitDeviceType,
    SamDeviceStoreType,
    SamVirtualDeviceType,
} from 'src/SAMDevices/Types/SAMDeviceTypes';
import {observer} from 'mobx-react';
import {useSingleDeviceStore} from 'src/Hooks/useSingleDeviceStore';

const svgContainerStyle = {
    '& svg': {
        width: 'auto !important',
        maxWidth: '100%',
    },
};

function ActiveDeviceItem({device}: {device: SamDeviceStoreType}) {
    const {virtualInteractionComponentName} = device || {};
    const {singleDeviceStore} = useSingleDeviceStore(device);

    const VirtualInteractionComponent: SamVirtualDeviceType | MicrobitDeviceType =
        getVirtualDevice(virtualInteractionComponentName);


    const isMicrobit = virtualInteractionComponentName?.toLowerCase().includes('microbit');

    return (
        <>
            {!singleDeviceStore.deleted && (
                <FullSimDeviceWrapper device={device}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Box className='svg-container' sx={isMicrobit ? {} : svgContainerStyle}>
                            {virtualInteractionComponentName && (
                                <VirtualInteractionComponent device={device} />
                            )}
                        </Box>
                    </Box>
                </FullSimDeviceWrapper>
            )}
        </>
    );
}

export default observer(ActiveDeviceItem);

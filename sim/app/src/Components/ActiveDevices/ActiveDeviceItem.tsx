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

function ActiveDeviceItem({device}: {device: SamDeviceStoreType}) {
    const {virtualInteractionComponentName} = device || {};
    const {singleDeviceStore} = useSingleDeviceStore(device);

    const VirtualInteractionComponent: SamVirtualDeviceType | MicrobitDeviceType =
        getVirtualDevice(virtualInteractionComponentName);

    return (
        <>
            {!singleDeviceStore.deleted && (
                <FullSimDeviceWrapper device={device}>
                    <div className='flex justify-center'>
                        <div className='[&_svg]:!filter-none [&_svg]:-webkit-filter-none [&_svg]:-ms-filter-none [&_svg]:!w-auto [&_*_svg]:!filter-none [&_*_svg]:-webkit-filter-none [&_*_svg]:-ms-filter-none [&_*_svg]:!w-auto [&_*_*_svg]:!filter-none [&_*_*_svg]:-webkit-filter-none [&_*_*_svg]:-ms-filter-none [&_*_*_svg]:!w-auto [&_*_*_*_svg]:!filter-none [&_*_*_*_svg]:-webkit-filter-none [&_*_*_*_svg]:-ms-filter-none [&_*_*_*_svg]:!w-auto'>
                            {virtualInteractionComponentName && (
                                <VirtualInteractionComponent device={device} />
                            )}
                        </div>
                    </div>
                </FullSimDeviceWrapper>
            )}
        </>
    );
}

export default observer(ActiveDeviceItem);

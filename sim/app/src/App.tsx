import React, {useEffect} from 'react';
// import SelectorComponent from "./Components/selector/SelectorComponent";
import MuiThemeLayout from './Layouts/MuiThemeLayout';
import SAMDeviceBuilder from './SAMDevices/SAMDeviceBuilder';
import ActiveDevices from './Components/ActiveDevices/ActiveDevices';
import {Box} from '@mui/material';
import {observer} from 'mobx-react-lite';
import {useStores} from './Hooks/useStores';
import {DeviceMenuItemType, IBuiltDevice} from './SAMDevices/Types/SAMDeviceTypes';
import {CustomEventGenerator} from './Features/CustomEventGenerator';
import {deviceNameType} from './SAMDevices/Icons/deviceIconTypes';
import {deviceLabels} from './Constants/DeviceLabel';
import {getDeviceIcon} from './SAMDevices/Icons';
import useAddNewDeviceEventHandler from './Hooks/useAddNewDeviceEventHandler';
import PromptModal from 'src/Components/PromptModal';
import AIChatModal from 'src/Components/AIChatModal';
import Button from '@mui/material/Button';

export enum samSimEvents {
    FROMSIM_EDITOR_GOT_PROMOPT = 'FROMSIM_EDITOR_GOT_PROMOPT',
    TOSIM_EDITOR_GENERAL_STORE_CREATED = 'TOSIM_EDITOR_GENERAL_STORE_CREATED',
    TOSIM_DEVICE_VALUE_CHANGED = 'TOSIM_DEVICE_VALUE_CHANGED',
    TOSIM_DEVICE_CREATED = 'TOSIM_EDITOR_DEVICE_CREATED',
    FROMSIM_DEVICE_VALUE_CHANGED = 'FROMSIM_DEVICE_VALUE_CHANGED',
}

const App: React.FC = observer(() => {
    const {devicesStore} = useStores();
    const [openChat, setOpenChat] = React.useState(false);
    const [showActiveDevices, setShowActiveDevices] = React.useState(true);
    const deviceKeys: deviceNameType[] = Object.keys(deviceLabels) as deviceNameType[];
    const {addNewDeviceEventHandler} = useAddNewDeviceEventHandler();
    const menuItemData: DeviceMenuItemType[] = deviceKeys.map((key: deviceNameType) => {
        return {
            label: deviceLabels[key],
            icon: getDeviceIcon(key),
        };
    });

    const addDeviceHandler = (device: DeviceMenuItemType): void => {
        const newDevice: SAMDeviceBuilder = new SAMDeviceBuilder(device);
        const builtDevice: IBuiltDevice = newDevice.build();
        devicesStore.addDevice(builtDevice);
    };

    const toggleActiveDevicesVisibility = (): void => {
        setShowActiveDevices((prev) => !prev);
    };

    useEffect(() => {
        const createdEvent = CustomEventGenerator.getInstance().receiveEvent(
            'TOSIM_EDITOR_DEVICE_CREATED',
            (event: CustomEvent) => {
                addNewDeviceEventHandler(event.detail);
            }
        );
        const simMessageEvent = CustomEventGenerator.getInstance().receiveEvent(
            'message',
            (event: any) => {
                const {data}: {data: any} = event;
                if (data.type === 'run') {
                    devicesStore.emptyDevicesStore();
                }
            }
        );
        const eventsArr = [
            {event: createdEvent, name: samSimEvents.TOSIM_DEVICE_CREATED},
            {event: simMessageEvent, name: 'message'},
        ];
        return () => {
            eventsArr.forEach((event: any) => {
                CustomEventGenerator.getInstance().unregisterEvent(
                    event.name,
                    event.event
                );
            });
        };
    }, []);

    return (
        <MuiThemeLayout>
            <PromptModal />
            <AIChatModal setOpenChat={setOpenChat} openChat={openChat} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 2,
                }}
            >
                <Button
                    style={{
                        marginBottom: '10px',
                        fontFamily: 'Nunito',
                    }}
                    disableElevation
                    variant='contained'
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#26D0C4',
                        '&:hover': {
                            backgroundColor: '#21B8A8',
                        },
                    }}
                    onClick={() => {
                        window.parent.postMessage(
                            {
                                type: `getScriptText`,
                            },
                            window.location.origin
                        );
                        setOpenChat(true);
                    }}
                >
                    GET AI ANSWER
                </Button>
                {/*<SelectorComponent*/}
                {/*  addDevice={addDeviceHandler}*/}
                {/*  toggleActiveDevicesVisibility={toggleActiveDevicesVisibility}*/}
                {/*/>*/}
                {<ActiveDevices showActiveDevices={showActiveDevices} />}
            </Box>
        </MuiThemeLayout>
    );
});

export default App;

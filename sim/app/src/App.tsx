import React, {useEffect} from 'react';
import MuiThemeLayout from './Layouts/MuiThemeLayout';
import ActiveDevices from './Components/ActiveDevices/ActiveDevices';
import {Box, Button} from '@mui/material';
import {observer} from 'mobx-react-lite';
import {useStores} from './Hooks/useStores';
import {CustomEventGenerator} from './Features/CustomEventGenerator';
import useAddNewDeviceEventHandler from './Hooks/useAddNewDeviceEventHandler';
import PromptModal from 'src/Components/PromptModal';
import ConsoleWrapper from 'src/Components/ConsoleView/ConsoleWrapper';

export enum samSimEvents {
    TOSIM_EDITOR_GOT_CONSOLE_LOG = 'TOSIM_EDITOR_GOT_CONSOLE_LOG',
    FROMSIM_EDITOR_GOT_PROMOPT = 'FROMSIM_EDITOR_GOT_PROMOPT',
    TOSIM_EDITOR_GENERAL_STORE_CREATED = 'TOSIM_EDITOR_GENERAL_STORE_CREATED',
    TOSIM_DEVICE_VALUE_CHANGED = 'TOSIM_DEVICE_VALUE_CHANGED',
    TOSIM_DEVICE_CREATED = 'TOSIM_EDITOR_DEVICE_CREATED',
    FROMSIM_DEVICE_VALUE_CHANGED = 'FROMSIM_DEVICE_VALUE_CHANGED',
}
export type AllSamSimEvents = (typeof samSimEvents)[keyof typeof samSimEvents];

const App: React.FC = observer(() => {
    const {devicesStore} = useStores();
    const [showActiveDevices, setShowActiveDevices] = React.useState(true);
    const [showConsole, setShowConsole] = React.useState(true);

    const {addNewDeviceEventHandler} = useAddNewDeviceEventHandler();

    useEffect(() => {
        const createdEventHandler = (event: CustomEvent) => {
            addNewDeviceEventHandler(event.detail);
        };

        const simMessageEventHandler = (event: MessageEvent) => {
            const {data} = event;
            if (data.type === 'run') {
                devicesStore.emptyDevicesStore();
            }
        };

        CustomEventGenerator.getInstance().receiveEvent(
            samSimEvents.TOSIM_DEVICE_CREATED,
            createdEventHandler
        );

        CustomEventGenerator.getInstance().receiveEvent(
            'message',
            simMessageEventHandler
        );

        const eventsArr = [
            {name: samSimEvents.TOSIM_DEVICE_CREATED, handler: createdEventHandler},
            {name: 'message', handler: simMessageEventHandler as EventListener},
        ];
        return () => {
            eventsArr.forEach((eventItem) => {
                CustomEventGenerator.getInstance().unregisterEvent(
                    eventItem.name,
                    eventItem.handler as EventListener
                );
            });
        };
    }, []);

    return (
        <MuiThemeLayout>
            <PromptModal />
            <Button
                variant={showConsole ? 'contained' : 'outlined'}
                onClick={() => setShowConsole(!showConsole)}
            >
                Console
            </Button>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    m: 2,
                }}
            >
                {showConsole ? (
                    <ConsoleWrapper />
                ) : (
                    <ActiveDevices showActiveDevices={showActiveDevices} />
                )}
            </Box>
        </MuiThemeLayout>
    );
});

export default App;

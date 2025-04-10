import React, {useEffect} from 'react';
import TailwindLayout from './Layouts/TailwindLayout';
import ActiveDevices from './Components/ActiveDevices/ActiveDevices';
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
    const [showConsole, setShowConsole] = React.useState(false);

    const {addNewDeviceEventHandler} = useAddNewDeviceEventHandler();

    useEffect(() => {
        const createdEventHandler = (event: CustomEvent) => {
            addNewDeviceEventHandler(event.detail);
        };

        const simMessageEventHandler = (event: MessageEvent) => {
            const {data} = event;
            if (data.type === 'run') {
                devicesStore.emptyDevicesStore();
                return;
            }
            if (data.type === 'CONSOLE_CALLED') {
                setShowConsole(data.value);
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
        <TailwindLayout>
            <PromptModal />
            <div
                className="invisibleScrollbar flex flex-col justify-center overflow-y-scroll h-screen"
            >
                <ConsoleWrapper showConsole={showConsole} />
                {!showConsole && <ActiveDevices showActiveDevices={showActiveDevices} />}
            </div>
        </TailwindLayout>
    );
});

export default App;

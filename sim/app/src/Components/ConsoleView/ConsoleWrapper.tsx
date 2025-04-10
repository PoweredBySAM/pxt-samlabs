import React, {useEffect} from 'react';
import {CustomEventGenerator} from 'src/Features/CustomEventGenerator';
import {samSimEvents} from 'src/App';

const ConsoleWrapper = ({showConsole}: {showConsole: boolean}) => {
    const [logs, setLogs] = React.useState<string[]>([]);
    useEffect(() => {
        const logToConsole = (event: CustomEvent) => {
            let value: string;
            const {printValue} = event.detail;

            value = printValue;
            if (typeof printValue === 'boolean') {
                value = printValue ? 'true' : 'false';
            }
            if (typeof printValue === 'object') {
                value = printValue.constructor.name;
            }
            setLogs((prevLogs) => [...prevLogs, value]);
        };
        const simMessageEventHandler = (event: MessageEvent) => {
            const {data} = event;
            if (data.type === 'CLEAR_CONSOLE_CALLED') {
                setLogs([]);
            }
        };

        const receiveConsoleLog = CustomEventGenerator.getInstance().receiveEvent(
            samSimEvents.TOSIM_EDITOR_GOT_CONSOLE_LOG,
            (event) => {
                if (!showConsole) {
                    window.parent.postMessage(
                        {
                            type: `CONSOLE_BUTTON_FLASH_ON`,
                        },
                        window.location.origin
                    );
                }
                logToConsole(event);
            }
        );
        CustomEventGenerator.getInstance().receiveEvent(
            'message',
            simMessageEventHandler
        );
        const eventsArr = [
            {
                name: samSimEvents.TOSIM_EDITOR_GOT_CONSOLE_LOG,
                handler: () => receiveConsoleLog,
            },
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
        <div
            className={`${showConsole ? 'flex' : 'hidden'} mb-auto h-full`}
        >
            {logs.length === 0 ? (
                <section className="p-3 pt-9">
                    No program output to show. Use the <strong>"Print"</strong> block
                    under <strong>"General"</strong> to start debugging your program.
                </section>
            ) : (
                <div
                    className="flex flex-col w-full h-full"
                >
                    <div
                        className="p-2.5 h-full overflow-y-scroll"
                    >
                        {logs.map((log, index) => (
                            <div
                                className="border-b border-[#dbdbdb] w-full"
                                key={index}
                            >
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsoleWrapper;

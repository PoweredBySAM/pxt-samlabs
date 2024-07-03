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
            setLogs((prevLogs) => [...prevLogs, value]);
        };

        const abbas = CustomEventGenerator.getInstance().receiveEvent(
            samSimEvents.TOSIM_EDITOR_GOT_CONSOLE_LOG,
            (event) => {
                logToConsole(event);
            }
        );
        return () => {
            CustomEventGenerator.getInstance().unregisterEvent(
                samSimEvents.TOSIM_EDITOR_GOT_CONSOLE_LOG,
                () => abbas
            );
        };
    }, []);

    return (
        <div style={{display: showConsole ? 'flex' : 'none', marginBottom: 'auto'}}>
            {logs.length === 0 ? (
                <section style={{padding: 12, paddingTop: 36}}>
                    No program output to show. Use the <strong>"Print"</strong> block
                    under <strong>"General"</strong> to start debugging your program.
                </section>
            ) : (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        padding: '10px',
                    }}
                >
                    {logs.map((log, index) => (
                        <div
                            style={{
                                borderBottom: '1px solid rgb(219, 219, 219)',
                                width: '100%',
                            }}
                            key={index}
                        >
                            {log}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConsoleWrapper;

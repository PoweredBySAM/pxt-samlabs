import React, {useEffect} from 'react';
import {CustomEventGenerator} from 'src/Features/CustomEventGenerator';
import {samSimEvents} from 'src/App';

const ConsoleWrapper = () => {
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

    return logs.length === 0 ? (
        <div>
            No program output to show. Use the block under General to start debugging your
            program.
        </div>
    ) : (
        <div>
            {logs.map((log, index) => (
                <div key={index}>{log}</div>
            ))}
        </div>
    );
};

export default ConsoleWrapper;

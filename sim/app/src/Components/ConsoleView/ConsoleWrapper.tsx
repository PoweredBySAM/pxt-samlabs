import React, {useEffect} from 'react';
import {CustomEventGenerator} from 'src/Features/CustomEventGenerator';
import {samSimEvents} from 'src/App';
import {Button} from '@mui/material';

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
        return () => {
            CustomEventGenerator.getInstance().unregisterEvent(
                samSimEvents.TOSIM_EDITOR_GOT_CONSOLE_LOG,
                () => receiveConsoleLog
            );
        };
    }, []);

    return (
        <div
            style={{
                display: showConsole ? 'flex' : 'none',
                marginBottom: 'auto',
                height: '100%',
            }}
        >
            {logs.length === 0 ? (
                <section style={{padding: 12, paddingTop: 36}}>
                    No program output to show. Use the <strong>"Print"</strong> block
                    under <strong>"General"</strong> to start debugging your program.
                </section>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div
                        style={{
                            padding: '10px',
                            height: '100%',
                            overflowY: 'scroll',
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
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: 12,
                        }}
                    >
                        <Button
                            style={{
                                width: '100%',
                                padding: 10,
                            }}
                            variant='contained'
                            sx={{
                                fontSize: '1rem',
                                textTransform: 'none',
                                backgroundColor: '#26D0C4',
                                '&:hover': {
                                    backgroundColor: '#21B8A8',
                                },
                            }}
                            onClick={() => {
                                setLogs([]);
                            }}
                        >
                            Clear Console
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsoleWrapper;

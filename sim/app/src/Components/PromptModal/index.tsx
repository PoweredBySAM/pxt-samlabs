import * as React from 'react';
import {useEffect} from 'react';
import {CustomEventGenerator} from 'src/Features/CustomEventGenerator';
import {samSimEvents} from 'src/App';
import NumberInput from './NumberInput';
import Input from 'src/Components/PromptModal/TextInput';

export default function PromptModal() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState<string | number>(' ');
    const [isNumber, setIsNumber] = React.useState(false);
    const [prompt, setPrompt] = React.useState(' ');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        const handleMessage = (event: any) => {
            if (event.data.type === 'PXT_STOPPED') {
                handleClose();
            }
        };
        window.addEventListener('message', handleMessage);

        const generalStoreCreated = CustomEventGenerator.getInstance().receiveEvent(
            samSimEvents.TOSIM_EDITOR_GENERAL_STORE_CREATED,
            (event: CustomEvent) => {
                setName('');

                if (event.detail.type === 'number') {
                    setIsNumber(true);
                } else {
                    setIsNumber(false);
                }
                setPrompt(event.detail.prompt);
                handleOpen();
            }
        );
        return () => {
            window.removeEventListener('message', handleMessage);
            CustomEventGenerator.getInstance().unregisterEvent(
                samSimEvents.TOSIM_EDITOR_GENERAL_STORE_CREATED,
                () => generalStoreCreated
            );
        };
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
            <div 
                className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[400px] bg-white shadow-lg p-4 flex flex-col"
            >
                <h2 className="font-sans text-xl mb-4 p-2.5">
                    {prompt}
                </h2>

                <div className="font-sans flex m-auto">
                    {isNumber ? (
                        <NumberInput
                            aria-label='Demo number input'
                            aria-placeholder='Type a number…'
                            style={{
                                fontFamily: 'Nunito',
                            }}
                            value={name as number}
                            onChange={(event, val) => setName(val as number)}
                        />
                    ) : (
                        <Input
                            placeholder={'Enter your text response here'}
                            value={name}
                            style={{
                                fontFamily: 'Nunito',
                            }}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setName(event.target.value);
                            }}
                        />
                    )}

                    <button
                        className="ml-2.5 font-sans bg-[#26D0C4] hover:bg-[#21B8A8] text-white py-2 px-4 rounded normal-case"
                        onClick={() => {
                            CustomEventGenerator.getInstance().dispatchEvent(
                                samSimEvents.FROMSIM_EDITOR_GOT_PROMOPT,
                                {
                                    name: name,
                                }
                            );
                            handleClose();
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

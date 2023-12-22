import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect} from 'react';
import {CustomEventGenerator} from 'src/Features/CustomEventGenerator';
import {samSimEvents} from 'src/App';
import NumberInput from './NumberInput';
import Input from 'src/Components/PromptModal/TextInput';

const style = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    position: 'fixed' as 'fixed',
    top: '0%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

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
                console.log(event.detail.type === 'number');
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

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography
                        style={{
                            fontFamily: 'Nunito',
                            padding: '10px',
                        }}
                        id='modal-modal-title'
                        variant='h6'
                        component='h2'
                    >
                        {prompt}
                    </Typography>

                    <Box
                        style={{
                            fontFamily: 'Nunito',
                            display: 'flex',
                            margin: 'auto',
                        }}
                    >
                        {isNumber ? (
                            <NumberInput
                                aria-label='Demo number input'
                                placeholder='Type a number…'
                                style={{
                                    fontFamily: 'Nunito',
                                }}
                                value={name as number}
                                onChange={(event, val) => setName(val as number)}
                            />
                        ) : (
                            <Input
                                // id='outlined-controlled'
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

                        <Button
                            style={{
                                marginLeft: '10px',
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
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

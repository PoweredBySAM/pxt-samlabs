import React, {useEffect} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {Configuration, OpenAIApi} from 'openai-edge';
import {OpenAIStream, StreamingTextResponse} from 'ai';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Input from 'src/Components/PromptModal/TextInput';

const confiiguration = new Configuration({
    // apiKey: '',
});

const openai = new OpenAIApi(confiiguration);

const AIChatModal = ({
    setOpenChat,
    openChat,
}: {
    setOpenChat: React.Dispatch<boolean>;
    openChat: boolean;
}) => {
    const [promptCount, setPromptCount] = React.useState(0);
    const [promptRes, setPromptRes] = React.useState<string[]>(['']);
    const [CodePrompt, setCodePrompt] = React.useState('');
    const [question, setQuestion] = React.useState('');
    const handleClose = () => setOpenChat(false);

    useEffect(() => {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'CODE_TO_SIM') {
                const {value} = event.data;
                setCodePrompt(value);
            }
        });

        new Promise<void>(async (resolve, reject) => {
            if (CodePrompt !== '') {
                await makeReqToOpenAI();
                resolve();
            }
            reject();
        })
            .then(() => {
                console.log('done');
            })
            .catch((err) => {
                console.log('error', err);
            });

        return () => {
            window.removeEventListener('message', () => {});
        };
    }, [CodePrompt]);
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
        padding: '14px',
    };

    const makeReqToOpenAI = async () => {
        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                stream: true,
                // max_tokens: 4000,
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a steam and CS instructor and teaching middle school children students learn to code. ' +
                            'You are explaining the output code in MICROSOFT PXT that is either Python or Javascript, they gonna ask you questions about the snippet they provide. ' +
                            'Help them understand the code based on their age (9 to 13) and grades (5 to 9) also dont mention anything about the microsoft PXT. ' +
                            'Also try to to not use many paragraphs basically dont over explain. and keep it 3 around sentences',
                    },
                    {
                        role: 'user',
                        content: `${
                            question === ''
                                ? `here's my code snippet 
                                ${CodePrompt}`
                                : question
                        }`,
                    },
                ],
            });
            setQuestion('');

            //@ts-ignore
            const stream = new OpenAIStream(response);
            const readerInit = new StreamingTextResponse(stream);
            const reader = readerInit?.body?.getReader();

            while (true) {
                //@ts-ignore
                const {done, value} = await reader?.read();

                if (done) {
                    break;
                }
                const currentChunk = new TextDecoder().decode(value);
                setPromptRes((oldArray) =>
                    oldArray.map((item, i) =>
                        i === promptCount ? item + currentChunk : item
                    )
                );
            }
            setPromptRes((prev) => [...prev, '']);
            setPromptCount((prev) => prev + 1);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };
    return (
        <div>
            <Modal
                open={openChat}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
                style={{
                    padding: 10,
                }}
            >
                <Box sx={style}>
                    <Box display={'flex'}>
                        <Button style={{marginLeft: 'auto'}} onClick={handleClose}>
                            <CloseIcon />
                        </Button>
                    </Box>
                    {promptRes.map((res: string) => {
                        return (
                            <Typography
                                style={{
                                    fontFamily: 'Nunito',
                                    fontSize: 17,
                                    padding: '10px',
                                }}
                                id='modal-modal-title'
                                variant='h6'
                                component='h2'
                            >
                                {res}
                            </Typography>
                        );
                    })}
                    <Input
                        placeholder={'Ask a question'}
                        value={question}
                        style={{
                            fontFamily: 'Nunito',
                        }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setQuestion(event.target.value);
                        }}
                    />
                    <Button
                        style={{
                            marginTop: '10px',
                            fontFamily: 'Nunito',
                        }}
                        disableElevation
                        variant='contained'
                        sx={{
                            textTransform: 'none',
                            backgroundColor: 'rgb(255, 69, 0)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,69,0,0.58)',
                            },
                        }}
                        onClick={async () => {
                            if (question !== '') {
                                await makeReqToOpenAI();
                            }
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AIChatModal;

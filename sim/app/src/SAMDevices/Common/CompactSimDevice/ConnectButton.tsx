import React from 'react';
import {Button, CircularProgress} from '@mui/material';

const ConnectButton = ({
    isConnected,
    isConnecting,
    isInTestMode,
    bleError,
    onConnect,
    onDisconnect,
}: {
    isConnected: boolean;
    isConnecting: boolean;
    isInTestMode: boolean;
    bleError: boolean;
    onConnect: () => void;
    onDisconnect: () => void;
}) => (
    <Button
        id='composition-button'
        onClick={isConnected ? onDisconnect : onConnect}
        disableElevation
        disabled={isInTestMode || isConnecting}
        variant='contained'
        sx={{
            width: '88px',
            padding: '6px 14px',
            textTransform: 'none',
            backgroundColor: isConnected ? '#FF0000' : '#26D0C4',
            '&:hover': {
                backgroundColor: isConnected ? '#cc0101' : '#21B8A8',
            },
            '&.Mui-disabled': {
                backgroundColor: isConnected ? '#FF0000' : '#26D0C4',
            },
        }}
    >
        {isConnecting ? (
            <CircularProgress
                size={20}
                sx={{
                    color: '#ffffff',
                    '& .MuiCircularProgress-circle': {
                        strokeLinecap: 'round',
                    },
                    '& .MuiCircularProgress-track': {
                        stroke: '#26D0C4',
                    },
                }}
            />
        ) : bleError ? (
            'Error Connecting this device'
        ) : isConnected ? (
            'Disconnect'
        ) : (
            'Connect'
        )}
    </Button>
);

export default ConnectButton;

import {Box, Typography} from '@mui/material';
import {SquareAsteriskIcon} from 'src/SAMDevices/Icons/SquareAsteriskIcon';
import React from 'react';

const BlockHexDisplay = ({value, onClick}: {value?: string; onClick: () => void}) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#8C8C8C',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        <SquareAsteriskIcon
            sx={{
                fontSize: '16px',
                color: '#8C8C8C',
                marginLeft: '4px',
                marginRight: '3px',
                display: 'flex',
            }}
        />
        <Typography
            component='span'
            sx={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#8C8C8C',
                display: 'flex',
                alignItems: 'center',
                lineHeight: 1,
            }}
        >
            {value}
        </Typography>
    </Box>
);

export default BlockHexDisplay;

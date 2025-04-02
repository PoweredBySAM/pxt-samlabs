import React from 'react';
import {Box, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PairInput = ({
    value,
    onChange,
    onClear,
}: {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '2px solid #25cfc3',
            borderRadius: '8px',
            width: '88px',
            padding: '2px 4px 2px 6px',
        }}
    >
        <input
            type='text'
            maxLength={4}
            value={value}
            onChange={(e) => {
                const newValue = e.target.value.replace(/[oO]/g, '0');
                onChange(newValue);
            }}
            style={{
                width: '55px',
                fontSize: '15px',
                fontWeight: 'bold',
                border: 'none',
                padding: 0,
                color: '#595959',
                background: 'transparent',
                outline: 'none',
                fontFamily:'Nunito'
            }}
            placeholder=''
        />
        <IconButton
            size='small'
            onClick={onClear}
            sx={{
                padding: 0,
                width: '12px',
                height: '12px',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            }}
        >
            <CloseIcon sx={{fontSize: '12px', color: '#8C8C8C'}} />
        </IconButton>
    </Box>
);

export default PairInput;

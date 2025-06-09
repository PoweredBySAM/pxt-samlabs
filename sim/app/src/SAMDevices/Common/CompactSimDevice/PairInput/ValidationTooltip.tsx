import React from 'react';
import {Box, Typography} from '@mui/material';

interface ValidationTooltipProps {
    isVisible: boolean;
    message: string;
    targetRef: React.RefObject<HTMLElement>;
}

const ValidationTooltip: React.FC<ValidationTooltipProps> = ({
    isVisible,
    message,
    targetRef,
}) => {
    if (!isVisible || !targetRef.current) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '4px',
                backgroundColor: '#fff',
                border: '1px solid #ff4444',
                borderRadius: '4px',
                padding: '8px 12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                zIndex: 1000,
                maxWidth: '250px',
                fontSize: '12px',
                fontFamily: 'Nunito',
            }}
        >
            <Typography
                variant='body2'
                sx={{
                    color: '#ff4444',
                    fontSize: '12px',
                    fontFamily: 'Nunito',
                    margin: 0,
                }}
            >
                {message}
            </Typography>
            <Box
                sx={{
                    position: 'absolute',
                    top: '-6px',
                    left: '12px',
                    width: 0,
                    height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderBottom: '6px solid #ff4444',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    top: '-5px',
                    left: '13px',
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: '5px solid #fff',
                }}
            />
        </Box>
    );
};

export default ValidationTooltip;

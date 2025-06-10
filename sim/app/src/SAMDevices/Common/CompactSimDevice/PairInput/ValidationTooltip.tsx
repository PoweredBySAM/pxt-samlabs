import React, {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import {Box} from '@mui/material';

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
    const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (!isVisible || !targetRef.current) return;

        const element = targetRef.current;
        const rect = element.getBoundingClientRect();

        setTooltipStyle({
            position: 'fixed',
            left: rect.left,
            top: rect.bottom + 4,
            zIndex: 9999,
        });
    }, [isVisible, targetRef]);

    if (!isVisible || !targetRef.current) {
        return null;
    }

    const tooltipContent = (
        <Box
            sx={{
                ...tooltipStyle,
                backgroundColor: '#fff',
                border: '1px solid #ff4444',
                borderRadius: '4px',
                padding: '8px 12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                maxWidth: '250px',
                fontSize: '12px',
                fontFamily: 'Nunito',
                color: '#ff4444',
                lineHeight: 1.4,
            }}
        >
            {message}

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
        </Box>
    );

    return createPortal(tooltipContent, document.body);
};

export default ValidationTooltip;

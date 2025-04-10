import React from 'react';
import {Box, Grid} from '@mui/material';

const DeviceIcon = ({
    isInTestMode,
    Icon,
}: {
    isInTestMode: boolean;
    Icon: React.ReactNode;
}) => (
    <Grid
        item
        xs={3}
        sx={{
            backgroundColor: isInTestMode ? '#c4c4c4' : '#26D0C4',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '5px',
            color: '#ffffff !important',
            '& svg': {
                filter: 'none !important',
                WebkitFilter: 'none !important',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
            }
        }}
    >
        <Box>{Icon}</Box>
    </Grid>
);

export default DeviceIcon;

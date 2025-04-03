import React from 'react';
import {Grid, IconButton} from '@mui/material';
import {LightTooltip} from 'src/SAMDevices/Common/LightToolTip';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const VisibilityControl = ({
    visibility,
    onToggle,
}: {
    visibility: boolean;
    onToggle: () => void;
}) => (
    <Grid
        item
        xs={1}
        sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            ml: 'auto',
        }}
    >
        <LightTooltip title='Toggle Virtual Controls' placement='top-start'>
            <IconButton aria-label='toggle' onClick={onToggle} sx={{m: '0 auto', p: 0}}>
                {visibility ? (
                    <VisibilityOffIcon sx={{m: 0, p: 0, fontSize: '0.9rem'}} />
                ) : (
                    <VisibilityIcon sx={{m: 0, p: 0, fontSize: '0.9rem'}} />
                )}
            </IconButton>
        </LightTooltip>
    </Grid>
);

export default VisibilityControl;

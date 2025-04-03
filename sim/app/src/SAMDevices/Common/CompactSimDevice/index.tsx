import React, {useEffect, useState} from 'react';
import {Box, Grid, Typography} from '@mui/material';
import styles from 'src/Components/selector/SelectorComponent.module.css';
import {SquareAsteriskIcon} from 'src/SAMDevices/Icons/SquareAsteriskIcon';
import {ReactComponent as PairCodeIcon} from '../../../Components/SharedModal/pair-code.svg';
import ConnectButton from 'src/SAMDevices/Common/CompactSimDevice/ConnectButton';
import PairInput from 'src/SAMDevices/Common/CompactSimDevice/PairingInput';
import VisibilityControl from 'src/SAMDevices/Common/CompactSimDevice/VisibilityControl';
import SharedModal from '../../../Components/SharedModal';
import DeviceIcon from './DeviceIcon';
import BlockHexDisplay from './BlockHexDisplay';

function CompactSimDevice({
    device,
    Icon,
    visibility,
    toggleVisibility,
    labels,
    isInTestMode,
}: {
    device: any;
    Icon?: React.ReactNode;
    visibility: boolean;
    toggleVisibility?: () => void;
    labels?: {
        maker?: string;
    };
    isInTestMode: boolean;
}) {
    const [isConnected, setIsConnected] = React.useState(false);
    const [bleError, setBleError] = React.useState(false);
    const [hexValue, setHexValue] = React.useState('');
    const [blockHexValue, setBlockHexValue] = React.useState<string | undefined>(
        undefined
    );
    const [isConnecting, setIsConnecting] = React.useState(false);
    const [showPairInfo, setShowPairInfo] = React.useState(false);
    const [isHexErrorVisible, setIsHexErrorVisible] = useState(false);

    const handleConnect = () => {
        setIsConnecting(true);
        window.parent.postMessage(
            {
                type: `${device.assignedName} connect`,
                value: hexValue || undefined,
            },
            window.location.origin
        );
    };

    const handleDisconnect = () => {
        window.parent.postMessage(
            {
                type: `${device.assignedName} disconnect`,
            },
            window.location.origin
        );
    };

    useEffect(() => {
        window.parent.postMessage(
            {
                type: `${device.assignedName} hydrate`,
            },
            window.location.origin
        );

        const listenerEvent = (event: MessageEvent) => {
            if (event.data.type === `${device.assignedName} hexValueError`) {
                setIsConnecting(false);
                setIsHexErrorVisible(true);
            }
            if (event.data.type === `${device.assignedName} bluetoothConnectionErr`) {
                setBleError(true);
                setIsConnecting(false);
            }
            if (event.data.type === `${device.assignedName} bluetoothCancelled`) {
                setIsConnecting(false);
            }
            if (
                event.data.type === `${device.assignedName} bluetoothConnected` ||
                event.data.type === `${device.assignedName} bluetoothIsConnected`
            ) {
                setBlockHexValue(event.data.value);
                setIsConnected(true);
                setIsConnecting(false);
            }
            if (event.data.type === `${device.assignedName} bluetoothDisconnected`) {
                if (!device.assignedName.startsWith('Microbit')) {
                    device.updateColor('#FFFFFF');
                }
                setIsConnected(false);
                setIsConnecting(false);
            }
        };

        window.addEventListener('message', listenerEvent);
        return () => window.removeEventListener('message', listenerEvent);
    }, []);

    return (
        <Box className={styles.option} sx={{my: 2, mx: 1}}>
            <Grid container columns={12} spacing={0} sx={{m: 1}}>
                <DeviceIcon isInTestMode={isInTestMode} Icon={Icon} />
                <Grid item xs={1} />
                <Grid
                    item
                    xs={7}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'space-between',
                    }}
                >
                    <Typography variant='body2' sx={{padding: '0 !important'}}>
                        {device.assignedName}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{color: '#d7d7d7', padding: '0 !important'}}
                    >
                        {labels?.maker}
                    </Typography>
                    <Box sx={{display: 'flex'}}>
                        <ConnectButton
                            isConnected={isConnected}
                            isConnecting={isConnecting}
                            isInTestMode={isInTestMode}
                            bleError={bleError}
                            onConnect={handleConnect}
                            onDisconnect={handleDisconnect}
                        />
                        {!isConnected && !device.assignedName.startsWith('Microbit') ? (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        color: '#8C8C8C',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        margin: '0 4px',
                                    }}
                                    onClick={() => setShowPairInfo(true)}
                                >
                                    <SquareAsteriskIcon
                                        sx={{fontSize: '16px', color: '#8C8C8C'}}
                                    />
                                </Box>

                                <PairInput
                                    value={hexValue}
                                    onChange={(newValue) => {
                                        setHexValue(newValue);
                                    }}
                                    onClear={() => {
                                        setHexValue('');
                                    }}
                                />
                            </>
                        ) : !device.assignedName.startsWith('Microbit') ? (
                            <BlockHexDisplay
                                value={blockHexValue}
                                onClick={() => setShowPairInfo(true)}
                            />
                        ) : null}
                    </Box>
                </Grid>
                <VisibilityControl
                    visibility={visibility}
                    onToggle={toggleVisibility || (() => {})}
                />
            </Grid>
            <SharedModal
                isVisible={showPairInfo}
                onClose={() => setShowPairInfo(false)}
                title='PAIRING ID'
                description={
                    <>
                        <p>
                            Each block has its own Pairing ID to help you know which block
                            is yours. Enter the code before pairing, and you will only see
                            your block!
                        </p>
                        <aside
                            style={{
                                backgroundColor: '#F5F5F5',
                                padding: '12px',
                                borderRadius: '8px',
                                marginTop: '16px',
                            }}
                        >
                            Teacher Tip: You may write the Pairing ID on your block with a
                            marker or sticker so it is always easy to find
                        </aside>
                    </>
                }
                icon={<PairCodeIcon style={{width: '100%', height: '100%'}} />}
            />
            <SharedModal
                isVisible={isHexErrorVisible}
                onClose={() => {
                    setHexValue('');
                    setIsHexErrorVisible(false);
                }}
                title='Invalid Pairing ID'
                description={
                    <p>
                        The Pairing ID you entered is not valid. Please check the ID on
                        your block and enter the correct 4-character code.
                    </p>
                }
            />
        </Box>
    );
}

export default CompactSimDevice;

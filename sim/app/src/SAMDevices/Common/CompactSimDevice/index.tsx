import React, {useEffect, useState} from 'react';
import styles from 'src/Components/selector/SelectorComponent.module.css';
import {ReactComponent as PairCodeIcon} from '../../../Components/SharedModal/pair-code.svg';
import ConnectButton from 'src/SAMDevices/Common/CompactSimDevice/ConnectButton';
import PairInput from 'src/SAMDevices/Common/CompactSimDevice/PairingInput';
import VisibilityControl from 'src/SAMDevices/Common/CompactSimDevice/VisibilityControl';
import SharedModal from '../../../Components/SharedModal';
import DeviceIcon from './DeviceIcon';
import BlockHexDisplay from './BlockHexDisplay';

const SquareAsteriskIcon = () => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#8C8C8C" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-[16px] text-[#8C8C8C]"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M12 8v8" />
    <path d="m8.5 14 7-4" />
    <path d="m8.5 10 7 4" />
  </svg>
);

interface BluetoothEventData {
    type: string;
    value?: string;
}

type EventHandler = (data: BluetoothEventData) => void;


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
    const [isCordova, setIsCordova] = useState(false);
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

        const listenerEvent = (event: MessageEvent<BluetoothEventData>) => {
            const eventHandlers: Record<string, EventHandler> = {
                [`itsCordovaEnvironment`]: () => {
                    console.log("Cordova detected in compact sim device");
                    setIsCordova(true);
                },
                [`${device.assignedName} hexValueError`]: () => {
                    setIsConnecting(false);
                    setIsHexErrorVisible(true);
                },
                [`${device.assignedName} bluetoothConnectionErr`]: () => {
                    setBleError(true);
                    setIsConnecting(false);
                },
                [`${device.assignedName} bluetoothCancelled`]: () => {
                    setIsConnecting(false);
                },
                cordovaModalClosed: () => {
                    setIsConnecting(false);
                },
                [`${device.assignedName} bluetoothConnected`]: (data) => {
                    setBlockHexValue(data.value);
                    setIsConnected(true);
                    setIsConnecting(false);
                },
                [`${device.assignedName} bluetoothIsConnected`]: (data) => {
                    setBlockHexValue(data.value);
                    setIsConnected(true);
                    setIsConnecting(false);
                },
                [`${device.assignedName} bluetoothDisconnected`]: () => {
                    if (!device.assignedName.startsWith('Microbit')) {
                        device.updateColor('#FFFFFF');
                    }
                    setIsConnected(false);
                    setIsConnecting(false);
                },
            };

            const handler = eventHandlers[event.data.type];
            if (handler) {
                handler(event.data);
            }
        };

        window.addEventListener('message', listenerEvent);
        return () => window.removeEventListener('message', listenerEvent);
    }, []);

    return (
        <div className={`${styles.option} my-2 mx-1`}>
            <div className="grid grid-cols-12 gap-0 m-1">
                <DeviceIcon isInTestMode={isInTestMode} Icon={Icon} />
                <div className="col-span-1" />
                <div
                    className="col-span-7 flex flex-col content-between"
                >
                    <p className="text-sm p-0">
                        {device.assignedName}
                    </p>
                    <p
                        className="text-sm text-[#d7d7d7] p-0"
                    >
                        {labels?.maker}
                    </p>
            
                    <div className="flex">
                        <ConnectButton
                            isConnected={isConnected}
                            isConnecting={isConnecting}
                            isInTestMode={isInTestMode}
                            bleError={bleError}
                            onConnect={handleConnect}
                            onDisconnect={handleDisconnect}
                        />
                        {!device.assignedName.startsWith('Microbit') &&
                            (isCordova ? (
                                isConnected && (
                                    <BlockHexDisplay
                                        value={blockHexValue}
                                        onClick={() => setShowPairInfo(true)}
                                    />
                                )
                            ) : !isConnected ? (
                                <>
                                    <div
                                        className="flex items-center gap-0.5 text-[#8C8C8C] text-sm font-bold cursor-pointer mx-1"
                                        onClick={() => setShowPairInfo(true)}
                                    >
                                        <SquareAsteriskIcon />
                                    </div>

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
                            ) : (
                                <BlockHexDisplay
                                    value={blockHexValue}
                                    onClick={() => setShowPairInfo(true)}
                                />
                            ))}
                    </div>
                </div>
                <VisibilityControl
                    visibility={visibility}
                    onToggle={toggleVisibility || (() => {})}
                />
            </div>
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
                            className="bg-[#F5F5F5] p-3 rounded-lg mt-4"
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
        </div>
    );
}

export default CompactSimDevice;

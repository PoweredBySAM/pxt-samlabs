import React from 'react';

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
    <button
        id='composition-button'
        onClick={isConnected ? onDisconnect : onConnect}
        disabled={isInTestMode || isConnecting}
        className={`w-[88px] py-1.5 px-3.5 normal-case rounded shadow-none font-medium text-white 
        ${isConnected ? 'bg-[#FF0000] hover:bg-[#cc0101]' : 'bg-[#26D0C4] hover:bg-[#21B8A8]'} 
        ${(isInTestMode || isConnecting) ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
        {isConnecting ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
        ) : bleError ? (
            'Error Connecting this device'
        ) : isConnected ? (
            'Disconnect'
        ) : (
            'Connect'
        )}
    </button>
);

export default ConnectButton;

import React from 'react';

const DeviceIcon = ({
    isInTestMode,
    Icon,
}: {
    isInTestMode: boolean;
    Icon: React.ReactNode;
}) => (
    <div
        className={`col-span-3 ${isInTestMode ? 'bg-[#c4c4c4]' : 'bg-[#26D0C4]'} p-1 flex items-center justify-center rounded-md text-white [&>svg]:filter-none [&>svg]:webkit-filter-none [&>svg]:transform-gpu [&>svg]:backface-hidden [&>svg]:webkit-backface-hidden`}
    >
        <div>{Icon}</div>
    </div>
);

export default DeviceIcon;

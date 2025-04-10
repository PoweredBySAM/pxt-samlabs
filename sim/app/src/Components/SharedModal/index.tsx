import React from 'react';

interface SharedModalProps {
    onClose?: () => void;
    isVisible: boolean;
    title: string;
    description: React.ReactNode;
    icon?: React.ReactNode;
}

const SharedModal: React.FC<SharedModalProps> = ({
    onClose,
    isVisible,
    title,
    description,
    icon
}) => {
    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose?.();
            }}
        >
            <article className="bg-white rounded-xl p-5 w-[90%] max-w-[400px] shadow-md" aria-labelledby='modal-title'>
                <div className="flex justify-end mb-4">
                    <button
                        className="bg-transparent border-none text-[#25cfc3] text-base cursor-pointer font-sans font-bold"
                        onClick={onClose}
                        aria-label='Close modal'
                    >
                        Done
                    </button>
                </div>

                {icon && (
                    <div
                        className="w-[60%] h-auto mx-auto mb-5"
                        role='img'
                        aria-label='Modal illustration'
                    >
                        {icon}
                    </div>
                )}

                <section className="text-left">
                    <span
                        role='heading'
                        aria-level={2}
                        className="block text-xl font-bold text-gray-800 mb-3 font-sans"
                        id='modal-title'
                    >
                        {title}
                    </span>
                    <div className="text-base text-[#595959] leading-relaxed mb-4 font-sans">
                        {description}
                    </div>
                </section>
            </article>
        </div>
    );
};

export default SharedModal; 
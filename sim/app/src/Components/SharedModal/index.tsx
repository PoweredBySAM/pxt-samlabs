import React from 'react';
import styles from './SharedModal.module.css';

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
            className={styles.modalOverlay}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose?.();
            }}
        >
            <article className={styles.modalWrapper} aria-labelledby='modal-title'>
                <div className={styles.header}>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label='Close modal'
                    >
                        Done
                    </button>
                </div>

                {icon && (
                    <div
                        className={styles.svgWrapper}
                        role='img'
                        aria-label='Modal illustration'
                    >
                        {icon}
                    </div>
                )}

                <section className={styles.copyWrapper}>
                    <span
                        role='heading'
                        aria-level={2}
                        className={styles.title}
                        id='modal-title'
                    >
                        {title}
                    </span>
                    <div className={styles.description}>
                        {description}
                    </div>
                </section>
            </article>
        </div>
    );
};

export default SharedModal; 
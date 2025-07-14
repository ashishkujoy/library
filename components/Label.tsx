'use client';

import '../styles/Label.css';

type Props = {
    title: string;
    onRemove?: () => void;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'small' | 'medium' | 'large';
    removable?: boolean;
    className?: string;
}

const Label = (props: Props) => {
    const {
        title,
        onRemove,
        color = 'primary',
        size = 'medium',
        removable = false,
        className = ''
    } = props;

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onRemove) {
            onRemove();
        }
    };

    return (
        <span className={`label label-${color} label-${size} ${className}`}>
            <span className="label-text">{title}</span>
            {removable && onRemove && (
                <button
                    type="button"
                    className="label-remove-btn"
                    onClick={handleRemove}
                    aria-label={`Remove ${title}`}
                >
                    ×
                </button>
            )}
        </span>
    );
};

export default Label;

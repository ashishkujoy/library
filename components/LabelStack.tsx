'use client';

import Label from './Label';
import '../styles/LabelStack.css';

type LabelItem = {
    id: string | number;
    title: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

type Props = {
    labels: LabelItem[];
    onRemoveLabel?: (id: string | number) => void;
    size?: 'small' | 'medium' | 'large';
    direction?: 'horizontal' | 'vertical';
    wrap?: boolean;
    maxItems?: number;
    className?: string;
}

const LabelStack = (props: Props) => {
    const {
        labels,
        onRemoveLabel,
        size = 'medium',
        direction = 'horizontal',
        wrap = true,
        maxItems,
        className = ''
    } = props;

    const handleRemoveLabel = (id: string | number) => {
        if (onRemoveLabel) {
            onRemoveLabel(id);
        }
    };

    const displayLabels = maxItems ? labels.slice(0, maxItems) : labels;
    const hiddenCount = maxItems && labels.length > maxItems ? labels.length - maxItems : 0;

    return (
        <div className={`label-stack label-stack-${direction} ${wrap ? 'label-stack-wrap' : ''} ${className}`}>
            {displayLabels.map((label) => (
                <Label
                    key={label.id}
                    title={label.title}
                    color={label.color}
                    size={size}
                    removable={!!onRemoveLabel}
                    onRemove={() => handleRemoveLabel(label.id)}
                />
            ))}
            {hiddenCount > 0 && (
                <span className={`label label-secondary label-${size} label-count`}>
                    +{hiddenCount} more
                </span>
            )}
        </div>
    );
};

export default LabelStack;

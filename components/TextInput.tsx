'use client';

import { useState } from 'react';
import '../styles/TextInput.css';

type Props = {
    label: string;
    id: string;
    name: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const TextInput = (props: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(props.value ? props.value.length > 0 : false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setHasValue(e.target.value.length > 0);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value.length > 0);
        if (props.onChange) {
            props.onChange(e);
        }
    };

    const isLabelFloating = isFocused || hasValue;

    return (
        <div className={`text-input-container ${props.className || ''}`}>
            <input
                type={props.type || 'text'}
                id={props.id}
                name={props.name}
                className={`text-input ${isLabelFloating ? 'has-content' : ''}`}
                required={props.required}
                disabled={props.disabled}
                minLength={props.minLength}
                maxLength={props.maxLength}
                value={props.value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <label 
                htmlFor={props.id} 
                className={`text-input-label ${isLabelFloating ? 'floating' : ''}`}
            >
                {props.label}
                {props.required && <span className="required-asterisk"> *</span>}
            </label>
        </div>
    );
}

export default TextInput;

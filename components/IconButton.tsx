"use client";
import React from 'react';
import "../styles/IconButton.css";

interface IconButtonProps {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const IconButton = ({ 
    icon, 
    title, 
    onClick, 
    className = '', 
    disabled = false,
    size = 'medium'
}: IconButtonProps) => {
    return (
        <button
            className={`icon-button icon-button-${size} ${className}`}
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={title}
            type="button"
        >
            {icon}
        </button>
    );
};

export default IconButton;

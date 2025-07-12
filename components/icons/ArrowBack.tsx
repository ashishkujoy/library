import React from 'react';

interface ArrowBackProps {
    size?: number;
    color?: string;
    className?: string;
}

const ArrowBack = ({ size = 24, color = 'currentColor', className = '' }: ArrowBackProps) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path 
                d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" 
                fill={color}
            />
        </svg>
    );
};

export default ArrowBack;

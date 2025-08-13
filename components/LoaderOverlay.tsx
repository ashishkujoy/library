import React, { memo } from 'react';
import "../styles/LoaderOverlay.css";

type Props = {
    title: string;
    message: string;
}

/**
 * Enhanced loader overlay component with memoization
 * Prevents unnecessary re-renders when props haven't changed
 */
const LoaderOverlay = memo((props: Props) => {
    return (
        <div className="modal active">
            <div className="loading-overlay" id="loadingOverlay">
                <div className="loading-content">
                    <div className="spinner"></div>
                    <div className="loading-title">{props.title}</div>
                    <div className="loading-message">{props.message}</div>
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    );
});

LoaderOverlay.displayName = 'LoaderOverlay';

export default LoaderOverlay;
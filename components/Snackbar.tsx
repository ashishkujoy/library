"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import "../styles/Snackbar.css";

export interface SnackbarProps {
    message: string;
    type: "success" | "error";
    isOpen: boolean;
    onClose: () => void;
    duration?: number; // Duration in milliseconds, default 4000ms
    autoClose?: boolean; // Whether to auto-close, default true
}

const Snackbar = ({
    message,
    type,
    isOpen,
    onClose,
    duration = 4000,
    autoClose = true
}: SnackbarProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            
            if (autoClose && duration > 0) {
                const timer = setTimeout(() => {
                    handleClose();
                }, duration);

                return () => clearTimeout(timer);
            }
        } else {
            setIsVisible(false);
        }
    }, [isOpen, duration, autoClose]);

    const handleClose = () => {
        setIsVisible(false);
        // Add a small delay before calling onClose to allow exit animation
        setTimeout(() => {
            onClose();
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className={`snackbar ${type} ${isVisible ? 'show' : ''}`}>
            <div className="snackbar-content">
                <span className="snackbar-message">{message}</span>
                <button
                    className="snackbar-close-btn"
                    onClick={handleClose}
                    aria-label="Close notification"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default Snackbar;

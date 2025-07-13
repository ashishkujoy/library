"use client";
import { useState, useCallback } from "react";

export interface SnackbarState {
    isOpen: boolean;
    message: string;
    type: "success" | "error";
}

export const useSnackbar = () => {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        isOpen: false,
        message: "",
        type: "success"
    });

    const showSuccess = useCallback((message: string) => {
        setSnackbar({
            isOpen: true,
            message,
            type: "success"
        });
    }, []);

    const showError = useCallback((message: string) => {
        setSnackbar({
            isOpen: true,
            message,
            type: "error"
        });
    }, []);

    const close = useCallback(() => {
        setSnackbar(prev => ({
            ...prev,
            isOpen: false
        }));
    }, []);

    return {
        snackbar,
        showSuccess,
        showError,
        close
    };
};

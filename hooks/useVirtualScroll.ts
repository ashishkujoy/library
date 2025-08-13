import { useState, useCallback } from 'react';

interface UseVirtualScrollOptions {
    initialScrollPosition?: number;
}

interface UseVirtualScrollResult {
    lastScrollPosition: number;
    handleScroll: (event: any) => void;
}

/**
 * Custom hook for managing virtual scroll state
 */
export const useVirtualScroll = ({ 
    initialScrollPosition = 0 
}: UseVirtualScrollOptions = {}): UseVirtualScrollResult => {
    const [lastScrollPosition, setLastScrollPosition] = useState(initialScrollPosition);

    const handleScroll = useCallback((event: any) => {
        setLastScrollPosition(event.target.scrollTop);
    }, []);

    return {
        lastScrollPosition,
        handleScroll
    };
};

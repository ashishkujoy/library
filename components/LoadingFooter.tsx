import React from 'react';

interface LoadingFooterProps {
    context: { 
        loadingMore: boolean;
    };
}

/**
 * Footer component for virtual list showing loading state
 */
export const LoadingFooter: React.FC<LoadingFooterProps> = ({ context }) => {
    if (context.loadingMore) {
        return (
            <h6 style={{ textAlign: "center" }}>
                Loading More...
            </h6>
        );
    }

    return null;
};

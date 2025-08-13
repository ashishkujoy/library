import React from 'react';

interface SearchLoadingStateProps {
    isSearching: boolean;
    hasBooks: boolean;
}

/**
 * Component to show loading state during search
 */
export const SearchLoadingState: React.FC<SearchLoadingStateProps> = ({ 
    isSearching, 
    hasBooks 
}) => {
    if (isSearching && !hasBooks) {
        return (
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h6>Searching...</h6>
            </div>
        );
    }

    return null;
};

import React from 'react';
import '../styles/SearchSkeleton.css';

/**
 * Skeleton loader for search results
 * Provides visual feedback while search is in progress
 */
const SearchSkeleton: React.FC = () => {
    return (
        <div className="search-skeleton">
            <div className="search-skeleton-header">
                <div className="skeleton skeleton-search-text" />
                <div className="skeleton skeleton-search-count" />
            </div>
            
            <div className="search-skeleton-results">
                {/* Show 3 skeleton rows for search results */}
                {Array.from({ length: 3 }, (_, index) => (
                    <div key={`search-skeleton-${index}`} className="search-result-skeleton">
                        <div className="skeleton skeleton-result-cover" />
                        <div className="search-result-content">
                            <div className="skeleton skeleton-result-title" />
                            <div className="skeleton skeleton-result-author" />
                            <div className="skeleton skeleton-result-stats" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchSkeleton;

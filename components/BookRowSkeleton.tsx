import React from 'react';
import '../styles/BookRowSkeleton.css';

/**
 * Skeleton loader component that mimics the BookRow layout
 * Provides visual feedback while book data is loading
 */
const BookRowSkeleton: React.FC = () => {
    return (
        <div className="book-row skeleton-container">
            {/* Book cover skeleton */}
            <div className="book-row-cover">
                <div className="skeleton skeleton-cover" />
            </div>
            
            {/* Book details skeleton */}
            <div className="book-row-details">
                {/* Title skeleton - wider block */}
                <div className="skeleton skeleton-title" />
                
                {/* Author skeleton - medium block */}
                <div className="skeleton skeleton-author" />
                
                {/* Stats skeleton */}
                <div className="book-row-stats">
                    <div className="book-stat">
                        <div className="skeleton skeleton-stat-label" />
                        <div className="skeleton skeleton-stat-value" />
                    </div>
                    <div className="book-stat">
                        <div className="skeleton skeleton-stat-label" />
                        <div className="skeleton skeleton-stat-value" />
                    </div>
                    <div className="book-stat">
                        <div className="skeleton skeleton-stat-label" />
                        <div className="skeleton skeleton-stat-value" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookRowSkeleton;

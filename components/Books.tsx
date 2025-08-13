"use client";
import React, { useCallback, Suspense, useMemo } from 'react';
import "../styles/BookRow.css";
import { Book } from '../types/Book';
import Searchbar from './Searchbar';
import { SearchLoadingState } from './SearchLoadingState';
import AsyncSearchResults from './AsyncSearchResults';
import BookListSkeleton from './BookListSkeleton';
import { useBookSearch, useVirtualScroll } from '../hooks';

interface BooksProps {
    books: Book[];
}

/**
 * Main Books component that handles book display, search, and virtualization
 * Optimized with memoization and Suspense boundaries for better performance
 */
const Books: React.FC<BooksProps> = ({ books: initialBooks }) => {
    const {
        books,
        searchQuery,
        isSearching,
        loadingMore,
        setSearchQuery,
        performSearch,
        loadMore
    } = useBookSearch({ 
        initialBooks 
    });

    const { lastScrollPosition, handleScroll } = useVirtualScroll();

    // Memoize expensive callback functions to prevent child re-renders
    const handleSearch = useCallback(() => {
        performSearch(searchQuery, false); // Force fresh search when explicitly requested
    }, [performSearch, searchQuery]);

    const handleEndReached = useCallback(async () => {
        if (books.length > 0) {
            await loadMore(searchQuery, books[books.length - 1].id);
        }
    }, [loadMore, searchQuery, books]);

    // Memoize props object to prevent unnecessary re-renders
    const asyncSearchResultsProps = useMemo(() => ({
        books,
        isSearching,
        searchQuery,
        lastScrollPosition,
        loadingMore,
        onScroll: handleScroll,
        onEndReached: handleEndReached
    }), [
        books,
        isSearching,
        searchQuery,
        lastScrollPosition,
        loadingMore,
        handleScroll,
        handleEndReached
    ]);

    return (
        <div>
            <Searchbar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                onSearch={handleSearch}
                isLoading={isSearching}
            />
            <div className='books-container'>
                <SearchLoadingState 
                    isSearching={isSearching} 
                    hasBooks={books.length > 0} 
                />
                <Suspense fallback={<BookListSkeleton count={8} />}>
                    <AsyncSearchResults {...asyncSearchResultsProps} />
                </Suspense>
            </div>
        </div>
    );
};

export default Books;

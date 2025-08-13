"use client";
import React, { useCallback } from 'react';
import "../styles/BookRow.css";
import { Book } from '../types/Book';
import Searchbar from './Searchbar';
import { SearchLoadingState } from './SearchLoadingState';
import { VirtualizedBookList } from './VirtualizedBookList';
import { useBookSearch, useVirtualScroll } from '../hooks';

interface BooksProps {
    books: Book[];
}

/**
 * Main Books component that handles book display, search, and virtualization
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

    const handleSearch = useCallback(() => {
        performSearch(searchQuery, false); // Force fresh search when explicitly requested
    }, [performSearch, searchQuery]);

    const handleEndReached = useCallback(async () => {
        if (books.length > 0) {
            await loadMore(searchQuery, books[books.length - 1].id);
        }
    }, [loadMore, searchQuery, books]);

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
                {!(isSearching && books.length === 0) && (
                    <VirtualizedBookList
                        books={books}
                        lastScrollPosition={lastScrollPosition}
                        loadingMore={loadingMore}
                        onScroll={handleScroll}
                        onEndReached={handleEndReached}
                    />
                )}
            </div>
        </div>
    );
};

export default Books;

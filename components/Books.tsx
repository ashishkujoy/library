"use client";
import { loadBooksAfter } from '@/app/BooksApi';
import { useState, useCallback, useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';
import "../styles/BookRow.css";
import { Book } from '../types/Book';
import BookRow from './BookRow';
import Searchbar from './Searchbar';

// Debounce hook
const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const LoadingFooter = (props: { context: { loadingMore: boolean } }) => {
    if (props.context.loadingMore)
        return <h6 style={{ textAlign: "center" }}>Loading More...</h6>;

    return <></>;
};

const Books = (props: { books: Book[] }) => {
    const [books, setBooks] = useState<Book[]>(props.books);
    const [searchQuery, setSearchQuery] = useState("");
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchCache, setSearchCache] = useState<Map<string, Book[]>>(new Map());
    
    // Debounce search query to avoid excessive API calls
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // Memoized search function with caching
    const performSearch = useCallback(async (query: string, useCache: boolean = true) => {
        // Check cache first
        if (useCache && searchCache.has(query)) {
            setBooks(searchCache.get(query) || []);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const { success, data } = await loadBooksAfter(query, 0, 20);
        
        if (success && data.length >= 0) {
            setBooks(data);
            // Cache the results
            setSearchCache(prev => new Map(prev.set(query, data)));
        }
        setIsSearching(false);
    }, [searchCache]);

    // Effect for debounced search
    useEffect(() => {
        if (debouncedSearchQuery !== searchQuery) return; // Only search when debounce is complete
        
        performSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, performSearch]);

    const applySearch = async () => {
        performSearch(searchQuery, false); // Force fresh search when explicitly requested
    }

    const loadMore = async (searchQuery: string, lastSeenBookId: number) => {
        const { success, data } = await loadBooksAfter(searchQuery, lastSeenBookId, 20);
        if (success && data.length > 0) {
            setBooks(prevBooks => [...prevBooks, ...data]);
            
            // Update cache for current search query
            if (searchQuery && searchCache.has(searchQuery)) {
                const existing = searchCache.get(searchQuery) || [];
                setSearchCache(prev => new Map(prev.set(searchQuery, [...existing, ...data])));
            }
        }
    };

    return (
        <div>
            <Searchbar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                onSearch={applySearch}
                isLoading={isSearching}
            />
            <div className='books-container'>
                {isSearching && books.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <h6>Searching...</h6>
                    </div>
                ) : (
                    <Virtuoso
                        style={{ height: "100%" }}
                        data={books}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onScroll={(e) => (setLastScrollPosition((e.target as any).scrollTop))}
                        initialScrollTop={lastScrollPosition}
                        endReached={async () => {
                            if (loadingMore || books.length === 0) return;
                            setLoadingMore(true);
                            await loadMore(searchQuery, books[books.length - 1].id);
                            setLoadingMore(false);
                        }}
                        context={{ loadingMore }}
                        components={{ Footer: LoadingFooter }}
                        itemContent={(index: number, book: Book) => {
                            return <BookRow key={book.id} book={book} index={index} />;
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default Books;

import { useState, useCallback, useEffect } from 'react';
import { loadBooksAfter } from '@/app/BooksApi';
import { Book } from '../types/Book';
import { useDebounce } from './useDebounce';

interface UseBookSearchOptions {
    initialBooks: Book[];
    debounceDelay?: number;
}

interface UseBookSearchResult {
    books: Book[];
    searchQuery: string;
    isSearching: boolean;
    loadingMore: boolean;
    setSearchQuery: (query: string) => void;
    performSearch: (query: string, useCache?: boolean) => Promise<void>;
    loadMore: (query: string, lastSeenBookId: number) => Promise<void>;
}

/**
 * Custom hook for managing book search functionality
 */
export const useBookSearch = ({ 
    initialBooks, 
    debounceDelay = 300 
}: UseBookSearchOptions): UseBookSearchResult => {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingMore, setLoadingMore] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchCache, setSearchCache] = useState<Map<string, Book[]>>(new Map());
    
    const debouncedSearchQuery = useDebounce(searchQuery, debounceDelay);

    const performSearch = useCallback(async (query: string, useCache: boolean = true) => {
        // Check cache first
        if (useCache && searchCache.has(query)) {
            setBooks(searchCache.get(query) || []);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        try {
            const { success, data } = await loadBooksAfter(query, 0, 20);
            
            if (success && data.length >= 0) {
                setBooks(data);
                // Cache the results
                setSearchCache(prev => new Map(prev.set(query, data)));
            }
        } catch (error) {
            console.error('Search failed:', error);
            // In case of error, keep the current books
        } finally {
            setIsSearching(false);
        }
    }, [searchCache]);

    const loadMore = useCallback(async (searchQuery: string, lastSeenBookId: number) => {
        if (loadingMore) return;
        
        setLoadingMore(true);
        try {
            const { success, data } = await loadBooksAfter(searchQuery, lastSeenBookId, 20);
            if (success && data.length > 0) {
                setBooks(prevBooks => [...prevBooks, ...data]);
                
                // Update cache for current search query
                if (searchQuery && searchCache.has(searchQuery)) {
                    const existing = searchCache.get(searchQuery) || [];
                    setSearchCache(prev => new Map(prev.set(searchQuery, [...existing, ...data])));
                }
            }
        } catch (error) {
            console.error('Load more failed:', error);
        } finally {
            setLoadingMore(false);
        }
    }, [loadingMore, searchCache]);

    // Effect for debounced search
    useEffect(() => {
        if (debouncedSearchQuery !== searchQuery) return;
        performSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, performSearch]);

    return {
        books,
        searchQuery,
        isSearching,
        loadingMore,
        setSearchQuery,
        performSearch,
        loadMore
    };
};

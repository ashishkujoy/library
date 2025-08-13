import React, { Suspense, memo } from 'react';
import { Book } from '../types/Book';
import { VirtualizedBookList } from './VirtualizedBookList';
import BookListSkeleton from './BookListSkeleton';

interface AsyncBookListProps {
    books: Book[];
    lastScrollPosition: number;
    loadingMore: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onScroll: (event: any) => void;
    onEndReached: () => Promise<void>;
    priorityCount?: number; // Number of books to prioritize for above-the-fold
}

/**
 * Async wrapper for book list with priority loading
 * Implements above-the-fold loading strategy for better perceived performance
 * Memoized for optimal re-render prevention
 */
export const AsyncBookList: React.FC<AsyncBookListProps> = memo(({
    books,
    lastScrollPosition,
    loadingMore,
    onScroll,
    onEndReached,
    priorityCount = 8
}) => {
    return (
        <Suspense fallback={<BookListSkeleton count={priorityCount} />}>
            <VirtualizedBookList
                books={books}
                lastScrollPosition={lastScrollPosition}
                loadingMore={loadingMore}
                onScroll={onScroll}
                onEndReached={onEndReached}
            />
        </Suspense>
    );
});

AsyncBookList.displayName = 'AsyncBookList';

export default AsyncBookList;

"use client";
import { loadBooksAfter } from '@/app/BooksApi';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import "../styles/BookRow.css";
import { Book } from '../types/Book';
import BookRow from './BookRow';

const LoadingFooter = (props: { context: { loadingMore: boolean } }) => {
    if (props.context.loadingMore)
        return <h6 style={{ textAlign: "center" }}>Loading More...</h6>;

    return <></>;
};

const Books = (props: { books: Book[] }) => {
    const [books, setBooks] = useState<Book[]>(props.books);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const loadMore = async (lastSeenBookId: number) => {
        const { success, data } = await loadBooksAfter(lastSeenBookId, 20);
        if (success && data.length > 0) {
            setBooks(prevBooks => [...prevBooks, ...data]);
        }
    };

    return (
        <div className='books-container'>
            <Virtuoso
                style={{ height: "100%" }}
                data={books}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onScroll={(e) => (setLastScrollPosition((e.target as any).scrollTop))}
                initialScrollTop={lastScrollPosition}
                endReached={async () => {
                    setLoadingMore(true);
                    await loadMore(books[books.length - 1].id);
                    setLoadingMore(false);
                }}
                context={{ loadingMore }}
                components={{ Footer: LoadingFooter }}
                itemContent={(index, book) => {
                    return <BookRow key={book.id} book={book} index={index} />;
                }}
            />
        </div>
    )
}

export default Books;

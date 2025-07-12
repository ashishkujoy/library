"use client";
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Book } from '../types/Book';
import BookCover from './BookCover';
import "../styles/BookRow.css";

const LoadingFooter = (props: { context: { loadingMore: boolean } }) => {
    if (props.context.loadingMore)
        return <h6 style={{ textAlign: "center" }}>Loading More...</h6>;

    return <></>;
};

type BookRowProps = {
    book: Book;
    index: number;
};

const BookDetails = ({ book }: { book: Book }) => {
    const availableCount = book.count - book.borrowedCount;

    return (
        <div className="book-row-details">
            <h6 className="book-row-title">
                {book.title}
            </h6>

            <p className="book-row-author">
                by {book.authors}
            </p>

            <div className="book-row-stats">
                <div className="book-stat book-stat-total">
                    <span className="book-stat-label">Total:</span>
                    <span>{book.count}</span>
                </div>

                <div className={`book-stat book-stat-borrowed ${book.borrowedCount === 0 ? 'none' : ''}`}>
                    <span className="book-stat-label">Borrowed:</span>
                    <span>{book.borrowedCount}</span>
                </div>

                <div className={`book-stat book-stat-available ${availableCount === 0 ? 'none' : ''}`}>
                    <span className="book-stat-label">Available:</span>
                    <span>{availableCount}</span>
                </div>
            </div>
        </div>
    )
}

const BookRow = ({ book, index }: BookRowProps) => {

    return (
        <div className="book-row">
            <div className="book-row-cover">
                <BookCover
                    title={book.title}
                    author={book.authors}
                    index={index}
                />
            </div>
            <BookDetails book={book} />

        </div>
    );
};

const Books = () => {
    const [books, setBooks] = useState<Book[] | undefined>();
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const loadMore = async (lastSeenBookId: number) => {
        const response = await fetch(`/api/books?lastSeenId=${lastSeenBookId}&size=20`);
        if (!response.ok) {
            console.error("Failed to fetch books:", response.statusText);
            return;
        }
        const newBooks: Book[] = await response.json();
        if (newBooks.length > 0) {
            setBooks((books || []).concat(newBooks));
            return;
        }
    }

    useEffect(() => {
        if (books === undefined && !loadingMore) {
            setLoadingMore(true);
            loadMore(0)
                .finally(() => setLoadingMore(false))
        }
    }, [books, loadingMore, loadMore]);

    if (books === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ 
            height: 'calc(100vh - 200px)', 
            overflow: 'hidden', 
            boxSizing: 'border-box', 
            padding: 'clamp(8px, 2vw, 16px)',
            maxWidth: '100%',
            marginBottom: 'clamp(60px, 15vw, 80px)'
        }}>
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

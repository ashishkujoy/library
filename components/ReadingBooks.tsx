"use client";
import { useEffect, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { BorrowedBook } from '../types/BorrowedBook';
import BookCover from './BookCover';
import { formatBorrowDate, isOverdue } from '../utils/dateUtils';
import "../styles/BookRow.css";

const LoadingFooter = (props: { context: { loadingMore: boolean } }) => {
    if (props.context.loadingMore)
        return <h6 style={{ textAlign: "center" }}>Loading More...</h6>;

    return <></>;
};

type ReadingBookRowProps = {
    book: BorrowedBook;
    index: number;
};

const ReadingBookDetails = ({ book }: { book: BorrowedBook }) => {
    const overdueStatus = isOverdue(book.dueDate);

    return (
        <div className="reading-book-details">
            <h3 className="reading-book-title">
                {book.title}
            </h3>

            <p className="reading-book-author">
                by {book.authors}
            </p>

            <div className="reading-book-info">
                <div className="reading-info-item">
                    <span className="reading-info-label">Borrowed:</span>
                    <span className="reading-info-value">{formatBorrowDate(book.borrowedDate)}</span>
                </div>

                {book.dueDate && (
                    <div className={`reading-info-item ${overdueStatus ? 'overdue' : ''}`}>
                        <span className="reading-info-label">Due:</span>
                        <span className="reading-info-value">
                            {new Date(book.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                            {overdueStatus && <span className="overdue-badge">Overdue</span>}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

const ReadingBookRow = ({ book, index }: ReadingBookRowProps) => {
    return (
        <div className="book-row">
            <div className="book-row-cover">
                <BookCover
                    title={book.title}
                    author={book.authors}
                    index={index}
                />
            </div>
            <ReadingBookDetails book={book} />
        </div>
    );
};

const ReadingBooks = () => {
    const [books, setBooks] = useState<BorrowedBook[] | undefined>();
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const loadMore = async (lastSeenBookId: number) => {
        const response = await fetch(`/api/reading?lastSeenId=${lastSeenBookId}&size=20`);
        if (!response.ok) {
            console.error("Failed to fetch reading books:", response.statusText);
            return;
        }
        const newBooks: BorrowedBook[] = await response.json();
        if (newBooks.length > 0) {
            setBooks((books || []).concat(newBooks));
            return;
        }
    };

    useEffect(() => {
        if (books === undefined && !loadingMore) {
            setLoadingMore(true);
            loadMore(0)
                .finally(() => setLoadingMore(false));
        }
    }, [books, loadingMore]);

    if (books === undefined) {
        return (
            <div className="reading-loading">
                <div className="loading-spinner"></div>
                <p>Loading your reading list...</p>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="reading-empty">
                <div className="empty-state">
                    <h3>No books currently borrowed</h3>
                    <p>Visit the library to borrow some books and start reading!</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingBottom: '80px' }}>
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
                        return <ReadingBookRow key={book.id} book={book} index={index} />;
                    }}
                />
            </div>
        </div>
    );
};

export default ReadingBooks;

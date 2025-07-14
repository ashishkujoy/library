"use client";
import LoadingView from '@/app/loading';
import "../styles/BookRow.css";
import { BorrowedBook } from '../types/BorrowedBook';
import { formatBorrowDate } from '../utils/dateUtils';
import BookCover from './BookCover';

type ReadingBookRowProps = {
    book: BorrowedBook;
    index: number;
};

const ReadingBookDetails = ({ book }: { book: BorrowedBook }) => {
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

const ReadingBooks = (props: { books?: BorrowedBook[] }) => {
    if (props.books === undefined) {
        return (
            <LoadingView />
        );
    }

    if (props.books.length === 0) {
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
                {props.books.map((book, index) => <ReadingBookRow key={book.id} book={book} index={index} />)}
            </div>
        </div>
    );
};

export default ReadingBooks;

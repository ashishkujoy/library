import { Book } from "@/types/Book";
import BookCover from "./BookCover";

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

export default BookRow;
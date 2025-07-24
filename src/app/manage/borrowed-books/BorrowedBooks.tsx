import { BorrowedBookWithUser } from "@/types/BorrowedBook";
import BookCover from "@/components/BookCover";
import "@/styles/BookRow.css";
import { formatBorrowDate } from "@/utils/dateUtils";

const BookDetails = ({ book }: { book: BorrowedBookWithUser }) => {
    return (
        <div className="book-row-details">
            <div className="book-row-title-author">
                <h6 className="book-row-title">
                    {book.title}
                </h6>

                <p className="book-row-author">
                    by {book.authors}
                </p>
            </div>

            <div className="borrowed-book-details">
                <p>Borrowed by: {book.borrowerName}</p>
                <p>Borrowed on: {formatBorrowDate(book.borrowedDate)}</p>
            </div>
        </div>
    )
}

const BorrowedBookRow = ({ book, index }: { book: BorrowedBookWithUser; index: number }) => {
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



const BorrowedBooks = (props: { borrowedBooks: BorrowedBookWithUser[] }) => {
    return (
        <div className="borrowed-books">
            {props.borrowedBooks.map((book, index) => (
                <BorrowedBookRow key={book.id} book={book} index={index} />
            ))}
        </div>
    );
}

export default BorrowedBooks;
import { getAllBorrowedBooks } from "./action";
import BorrowedBooks from "./BorrowedBooks";

const BorrowedBooksPage = async () => {
    const borrowedBooks = await getAllBorrowedBooks();

    return (
        <div className="page-container">
            <div>
                <h6 className="page-title">Borrowed Book</h6>
            </div>
            <div className="form-container">
                <BorrowedBooks borrowedBooks={borrowedBooks} />
            </div>
        </div>
    )
}

export default BorrowedBooksPage;
import { getBorrowedBooks } from "../../../db/borrowedBooks";
import { getLoggedInUser } from "../../../db/user";

export const loadReadingBooks = async () => {
    const user = await getLoggedInUser();
    if (!user) {
        throw new Error("User not logged in");
    }

    return getBorrowedBooks(user.id);
}
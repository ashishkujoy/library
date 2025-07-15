import Books from "../../components/Books";
import Searchbar from "../../components/Searchbar";
import StickyFooter from "../../components/StickyFooter";
import { getLoggedInUser } from "../../db/user";
import { loadBooks } from "./action";
import BorrowBook from "./BorrowBook";

export default async function Home() {
  const [user, books] = await Promise.all([getLoggedInUser(), loadBooks()]);

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Searchbar />
      <Books books={books} />
      <BorrowBook />
      <StickyFooter activeTab="books" allowManagement={user?.isAdmin || false} />
    </div>
  );
}

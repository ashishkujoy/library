import Books from "../../components/Books";
import Searchbar from "../../components/Searchbar";
import StickyFooter from "../../components/StickyFooter";
import { loadBooks } from "./action";
import BorrowBook from "./BorrowBook";

export default async function Home() {
  const books = await loadBooks();

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Searchbar />
      <Books books={books}/>
      <BorrowBook />
      <StickyFooter activeTab="books" />
    </div>
  );
}

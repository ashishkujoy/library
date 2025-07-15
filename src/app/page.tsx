import Books from "../../components/BookRow";
import Searchbar from "../../components/Searchbar";
import StickyFooter from "../../components/StickyFooter";
import BorrowBook from "./BorrowBook";

export default function Home() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <Searchbar />
      <Books />
      <BorrowBook />
      <StickyFooter activeTab="books" />
    </div>
  );
}

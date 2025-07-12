import Books from "../../components/BookRow";
import Searchbar from "../../components/Searchbar";
import StickyFooter from "../../components/StickyFooter";
import FloatingActionButtons from "../../components/FloatingActionButtons";

export default async function Home() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <Searchbar />
      <Books />
      <FloatingActionButtons />
      <StickyFooter activeTab="books" />
    </div>
  );
}

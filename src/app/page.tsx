import Books from "../../components/BookRow";
import Searchbar from "../../components/Searchbar";
import StickyFooter from "../../components/StickyFooter";

export default async function Home() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <Searchbar />
      <Books />
      <StickyFooter activeTab="books" />
    </div>
  );
}

import ReadingBooks from "@/components/ReadingBooks";
import StickyFooter from "@/components/StickyFooter";
import { loadReadingBooks } from "./action";
import ReturnBook from "./ReturnBook";

export default async function ReadingPage() {
  const books = await loadReadingBooks();

  return (
    <div className='page-container'>
      <ReadingBooks books={books} />
      <ReturnBook />
      <StickyFooter activeTab="reading" />
    </div>
  );
}

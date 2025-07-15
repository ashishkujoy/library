import ReadingBooks from "@/components/ReadingBooks";
import StickyFooter from "@/components/StickyFooter";
import { loadReadingBooks } from "./action";
import ReturnBook from "./ReturnBook";
import { getLoggedInUser } from "../../../db/user";

export default async function ReadingPage() {
  const [user, books] = await Promise.all([getLoggedInUser(), loadReadingBooks()]);

  return (
    <div className='page-container'>
      <ReadingBooks books={books} />
      <ReturnBook />
      <StickyFooter activeTab="reading" allowManagement={user?.isAdmin || false} />
    </div>
  );
}

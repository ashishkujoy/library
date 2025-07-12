import ReadingBooks from "../../../components/ReadingBooks";
import FloatingActionButtons from "../../../components/FloatingActionButtons";
import StickyFooter from "../../../components/StickyFooter";

export default async function ReadingPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <ReadingBooks />
      <FloatingActionButtons />
      <StickyFooter activeTab="reading" />
    </div>
  );
}

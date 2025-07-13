"use client";
import ReadingBooks from "../../../components/ReadingBooks";
import FloatingActionButtons from "../../../components/FloatingActionButtons";
import StickyFooter from "../../../components/StickyFooter";

export default function ReadingPage() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <ReadingBooks />
      <FloatingActionButtons onScanResult={() => { }} onScanError={() => { }} />
      <StickyFooter activeTab="reading" />
    </div>
  );
}

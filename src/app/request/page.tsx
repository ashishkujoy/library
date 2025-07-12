import FloatingActionButtons from "../../../components/FloatingActionButtons";
import StickyFooter from "../../../components/StickyFooter";

export default async function Home() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <FloatingActionButtons />
      <StickyFooter activeTab="request" />
    </div>
  );
}

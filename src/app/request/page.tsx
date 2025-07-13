import FloatingActionButtons from "../../../components/FloatingActionButtons";
import StickyFooter from "../../../components/StickyFooter";

export default function Home() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <FloatingActionButtons onScanResult={() => { }} onScanError={() => { }} />
      <StickyFooter activeTab="request" />
    </div>
  );
}

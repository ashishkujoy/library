import StickyFooter from "../../../components/StickyFooter";

export default function Home() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <StickyFooter activeTab="request" allowManagement={false} />
    </div>
  );
}

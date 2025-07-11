import AppHeader from "../../components/AppHeader";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Home() {
  return (
    <div>
      <AppHeader />
    </div>
  );
}

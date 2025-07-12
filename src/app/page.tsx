import Books from "../../components/BookRow";
import Searchbar from "../../components/Searchbar";

export default async function Home() {
  return (
    <div>
      <Searchbar />
      <Books />
    </div>
  );
}

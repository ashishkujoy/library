import BookCover from "../../components/BookCover";
import Searchbar from "../../components/Searchbar";

export default async function Home() {
  const books = [
    { title: "Atomic Habits", author: "James Clear" },
    { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
    { title: "Educated", author: "Tara Westover" },
    { title: "Becoming", author: "Michelle Obama" },
    { title: "Where the Crawdads Sing", author: "Delia Owens" },
    { title: "The Silent Patient", author: "Alex Michaelides" },
    { title: "The Vanishing Half", author: "Brit Bennett" },
    { title: "The Midnight Library", author: "Matt Haig" },
    { title: "Circe", author: "Madeline Miller" },
    { title: "Daisy Jones & The Six", author: "Taylor Jenkins Reid" },
    { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid" },
    { title: "The Guest List", author: "Lucy Foley" },
    { title: "Anxious People", author: "Fredrik Backman" },
    { title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab" },
    { title: "Project Hail Mary", author: "Andy Weir" },
    { title: "The Song of Achilles", author: "Madeline Miller" },
    { title: "Normal People", author: "Sally Rooney" },
  ];

  return (
    <div>
      <Searchbar />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "16px" }}>
        {books.map((book, index) => (
          <BookCover key={index} title={book.title} author={book.author} index={index} />
        ))}
      </div>
    </div>
  );
}

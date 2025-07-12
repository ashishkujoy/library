const borrowedBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        authors: "F. Scott Fitzgerald",
        isbn10: "0743273567",
        isbn13: "9780743273565",
        borrowedDate: "2023-01-01"
    },
    {
        id: 2,
        title: "1984",
        authors: "George Orwell",
        isbn10: "0451524938",
        isbn13: "9780451524935",
        borrowedDate: "2023-02-01",
        dueDate: "2023-02-15"
    }
]

const getSearchParams = (url: string) => {
    const searchParams = new URLSearchParams(url.split('?')[1] || '');
    const lastSeenId = searchParams.get('lastSeenId') || '0';

    return { lastSeenId: parseInt(lastSeenId) };
}

export const GET = async (request: Request) => {
    const { lastSeenId } = getSearchParams(request.url);
    const books = borrowedBooks.filter(book => book.id > lastSeenId);

    return new Response(JSON.stringify(books), {
        headers: {
            "Content-Type": "application/json",
        },
    });

}

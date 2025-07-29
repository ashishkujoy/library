type IndustryIdentifier = {
    type: string;
    identifier: string;
}

type Author = {
    name: string;
}

const findBookFromGoogleApi = async (barcode: string) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}`);
    const data = await response.json();
    if (data.totalItems === 0) return;
    const book = data.items[0].volumeInfo;

    return {
        title: book.title,
        authors: book.authors ? book.authors.join(", ") : "",
        isbn10: book.industryIdentifiers?.find((id: IndustryIdentifier) => id.type === "ISBN_10")?.identifier || "",
        isbn13: book.industryIdentifiers?.find((id: IndustryIdentifier) => id.type === "ISBN_13")?.identifier || "",
    }
}

const findBookByOpenLibraryApi = async (barcode: string) => {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${barcode}&format=json&jscmd=data`);
    const data = await response.json();
    const bookKey = `ISBN:${barcode}`;
    if (!data[bookKey]) return;
    const book = data[bookKey];
    return {
        title: book.title,
        authors: book.authors ? book.authors.map((author: Author) => author.name).join(",") : "",
        isbn10: book.identifiers?.isbn_10 ? book.identifiers.isbn_10[0] : "",
        isbn13: book.identifiers?.isbn_13 ? book.identifiers.isbn_13[0] : "",
    }
}

export const findBook = async (barcode: string) => {
    const bookFromGoogle = findBookFromGoogleApi(barcode);
    const bookFromOpenLibrary = findBookByOpenLibraryApi(barcode);
    const [googleBook, openLibraryBook] = await Promise.all([bookFromGoogle, bookFromOpenLibrary]);

    return googleBook || openLibraryBook;
}
export type Book = {
    id: number;
    title: string;
    authors: string;
    isbn10?: string;
    isbn13?: string;
    count: number;
    borrowedCount: number;
};

export type BookCopy = {
    id: number;
    bookId: number;
    qrCode: string;
    borrowed: boolean;
};
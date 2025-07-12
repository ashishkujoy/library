export type BorrowedBook = {
    id: number;
    title: string;
    authors: string;
    isbn10?: string;
    isbn13?: string;
    borrowedDate: string; // ISO date string
    dueDate?: string; // ISO date string
    userId?: number;
};

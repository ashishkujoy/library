export type OnboardBookReqBody = {
    title: string;
    authors: string;
    isbn10?: string;
    isbn13?: string;
    copies: string[];
}
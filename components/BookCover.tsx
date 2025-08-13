import React, { memo, useMemo } from 'react';
import "../styles/BookCover.css";

const shorten = (str: string, size: number, suffix: string = '') => {
    return str.length > size ? `${str.slice(0, size)}${suffix}` : str;
};


type BookCoverProps = {
    title: string;
    author: string;
    index: number;
}

const BookCover = memo(({ title, author, index }: BookCoverProps) => {
    // Memoize expensive string operations and class calculations
    const { shortenedTitle, coverClassName } = useMemo(() => ({
        shortenedTitle: shorten(title, 30, '...'),
        coverClassName: `book-cover color${index % 10}`
    }), [title, index]);

    return (
        <div className={coverClassName}>
            <div className="book-spine"></div>
            <div className="book-content">
                <h6 className="book-title">{shortenedTitle}</h6>
                <p className="book-author">{author}</p>
            </div>
        </div>
    );
});

BookCover.displayName = 'BookCover';

export default BookCover;

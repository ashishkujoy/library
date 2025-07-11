import "../styles/BookCover.css";

const shorten = (str: string, size: number, suffix: string = '') => {
    return str.length > size ? `${str.slice(0, size)}${suffix}` : str;
};


type BookCoverProps = {
    title: string;
    author: string;
    index: number;
}

const BookCover = ({ title, author, index }: BookCoverProps) => {
    return (
        <div className={`book-cover color${index % 10}`}>
            <div className="book-spine"></div>
            <div className="book-content">
                <h6 className="book-title">{shorten(title, 30, '...')}</h6>
                <p className="book-author">{author}</p>
            </div>
        </div>
    )
};

export default BookCover;

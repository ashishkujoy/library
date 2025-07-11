const backgrounds = [
    '#7A6F9B',
    '#19323C',
    '#1F487E',
    '#50514F',
    '#8C1C13',
    '#08415C',
    '#432E36',
    '#47624F',
    '#AB5E0D',
    '#594F3B',
    '#776258',
];

const borderRadius = '0px 6px 6px 0px';

const shorten = (str: string, size: number, suffix: string = '') => {
    return str.length > size ? `${str.slice(0, size)}${suffix}` : str;
};


type BookCoverProps = {
    title: string;
    author: string;
    index: number;
}

const BookCover = ({ title, author, index }: BookCoverProps) => {
    const bgColor = backgrounds[index % backgrounds.length];
    return (
        <div style={{ position: "relative" }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: "90px",
                    height: "120px",
                    boxShadow: `3px 3px 6px ${bgColor}`,
                    borderRadius: `${borderRadius}px`
                }}

            >
                <div style={{ width: "20%", backgroundColor: "#272635", borderRight: "1px dotted white" }} />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: "80%",
                        backgroundColor: bgColor,
                        border: "0.5px solid",
                        borderRadius: `${borderRadius}px`,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "16px",
                    }}
                >
                    <h6 style={{
                        fontSize: 10,
                        textAlign: 'center',
                        color: '#ffffff',
                        textShadow: '2px 2px 2px grey',
                    }}>{shorten(title, 30, '...')}</h6>
                    <h6 style={{
                        fontSize: 10,
                        textAlign: 'center',
                        color: '#ffffff',
                        textShadow: '2px 2px 2px grey',
                        position: 'absolute',
                        bottom: 0,
                        margin: 0,
                        width: '80px',
                        background: 'black',
                        borderRadius: '0px 0px 6px 0px',
                    }}>
                        {shorten(author, 15, '...')}
                    </h6>
                </div>
            </div>
        </div >
    );
};

export default BookCover;

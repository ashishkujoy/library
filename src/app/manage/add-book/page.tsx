"use client";
import Note from "../../../../components/Note";
import StickyFooter from "../../../../components/StickyFooter";
import TextInput from "../../../../components/TextInput";

const NewBookForm = () => {
    return (
        <form>
            <TextInput minLength={2} name="title" id="title" required={true} label={"Title"} />
            <TextInput minLength={10} maxLength={10} name="isbn10" id="isbn10" required={false} label={"ISBN 10"} />
            <TextInput minLength={13} maxLength={13} name="isbn13" id="isbn13" required={false} label={"ISBN 13"} />
            <TextInput minLength={2} maxLength={1000} name="author" id="author" required={true} label={"Authors(comma separated)"} />

                <button type="submit"
                    style={{
                        position: "fixed",
                        bottom: "100px",
                        width: "100%",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        lineHeight: "1.75rem",
                        textTransform: "uppercase",
                        borderRadius: "4px",
                        padding: "5px 15px",
                        cursor: "pointer",
                        backgroundColor: "#fff"
                    }}>Add Book</button>

        </form>
    );
}

export default function ManagePage() {
    return (
        <div style={{ paddingBottom: '80px', margin: '16px', }}>
            <div>
                <h6 className="page-title">Add Book</h6>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', padding: "10px" }}>
                <Note message="Please fill the form OR scan code" />
                <NewBookForm />
            </div>

            <StickyFooter activeTab="books" />
        </div>
    );
}

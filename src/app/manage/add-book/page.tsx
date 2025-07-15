import Note from "@/components/Note";
import './page.css';
import NewBookForm from "./NewBookForm";

export default function ManagePage() {
    return (
        <div className="page-container">
            <div>
                <h6 className="page-title">Add Book</h6>
            </div>
            <div className="form-container">
                <Note message="Please fill the form OR scan code" />
                <NewBookForm />
            </div>
        </div>
    );
}

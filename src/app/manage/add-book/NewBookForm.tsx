"use client";
import BarcodeScanner from "@/components/BarcodeScanner";
import LabelStack from "@/components/LabelStack";
import LoaderOverlay from "@/components/LoaderOverlay";
import Note from "@/components/Note";
import Snackbar from "@/components/Snackbar";
import TextInput from "@/components/TextInput";
import { QrCodeIcon } from "lucide-react";
import { useState, FormEvent, useRef } from "react";

type BookDetails = {
    title: string;
    isbn10: string;
    isbn13: string;
    authors: string;
}

const NewBookForm = () => {
    const [showCopyQRReader, setShowCopyQRReader] = useState(false);
    const [showBookQRReader, setShowBookQRReader] = useState(false);
    const [copies, setCopies] = useState<string[]>([]);
    const [validationError, setValidationError] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookDetails, setBookDetails] = useState<BookDetails>({
        title: "",
        authors: "",
        isbn10: "",
        isbn13: "",
    });
    const formRef = useRef<HTMLFormElement>(null);

    const toggleCopyQRReader = () => setShowCopyQRReader(!showCopyQRReader);
    const toggleBookQRReader = () => setShowBookQRReader(!showBookQRReader);
    const handleCopyQRCode = (result: string) => {
        if (!copies.includes(result)) {
            setCopies([...copies, result]);
        }
        toggleCopyQRReader();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const form = event.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());

        // Clear any previous validation errors
        setValidationError("");

        // Validate that at least one ISBN is provided
        const isbn10 = (data.isbn10 as string).trim();
        const isbn13 = (data.isbn13 as string).trim();

        if (!isbn10) delete data.isbn10;
        if (!isbn13) delete data.isbn13;

        if (!isbn10 && !isbn13) {
            setValidationError("Please provide at least one ISBN (ISBN 10 or ISBN 13)");
            return;
        }
        setLoading(true);
        fetch('/api/books/on-board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, copies }),
        })
            .then(res => {
                if (res.ok) {
                    console.log("Book added successfully");
                    setShowSuccess(true);
                    formRef.current?.reset();
                    setBookDetails({
                        title: "",
                        authors: "",
                        isbn10: "",
                        isbn13: "",
                    });
                    setCopies([]);
                    return form.reset();
                }
                setShowError(true);
            })
            .catch((e) => console.log("Error adding book:", e))
            .finally(() => setLoading(false));
    }

    const prefillBookDetails = (barcode: string) => {
        toggleBookQRReader();
        setLoading(true);
        fetch(`/api/book?barcode=${barcode}`)
            .then(res => res.json().then(data => ({ status: res.status, data })))
            .then(({ status, data }) => {
                if (status === 200) {
                    setBookDetails({
                        title: data.title,
                        authors: data.authors,
                        isbn10: data.isbn10 || "",
                        isbn13: data.isbn13 || "",
                    });
                } else {
                    setValidationError("Book not found. Please check the ISBN or add it manually.");
                }
            })
            .finally(() => setLoading(false));
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            {loading && <LoaderOverlay title="Loading" message="Please wait while we process your request..." />}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <TextInput
                    minLength={2}
                    name="title"
                    id="title"
                    required={true}
                    label={"Title"}
                    value={bookDetails.title}
                    onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                />
                <TextInput
                    minLength={2}
                    maxLength={1000}
                    name="authors"
                    id="authors"
                    required={true}
                    label={"Authors(comma separated)"}
                    value={bookDetails.authors}
                    onChange={(e) => setBookDetails({ ...bookDetails, authors: e.target.value })}
                />
                <TextInput
                    minLength={10}
                    maxLength={10}
                    name="isbn10"
                    id="isbn10"
                    required={false}
                    label={"ISBN 10"}
                    value={bookDetails.isbn10}
                    onChange={(e) => setBookDetails({ ...bookDetails, isbn10: e.target.value })}
                />
                <TextInput
                    minLength={13}
                    maxLength={13}
                    name="isbn13"
                    id="isbn13"
                    required={false}
                    label={"ISBN 13"}
                    value={bookDetails.isbn13}
                    onChange={(e) => setBookDetails({ ...bookDetails, isbn13: e.target.value })}
                />
            </div>
            {
                copies.length === 0 && <Note message="You can add copies later or scan QR code to add copies now." />
            }
            <LabelStack
                labels={copies.map((copy, index) => ({ id: index, title: copy }))}
                onRemoveLabel={(id) => setCopies(copies.filter((_, index) => index !== id))}
            />
            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    type="button"
                    title="Scan book copy qrcode"
                    className="scan-copy-qr-button"
                    onClick={toggleCopyQRReader}
                    aria-label="Scan book"
                    style={{ marginTop: "10px", marginBlock: "10px" }}
                >
                    <QrCodeIcon size={22} />
                    <span>Scan Copy QR</span>
                </button>
                <button
                    type="button"
                    title="Scan book barcode"
                    className="scan-copy-qr-button"
                    onClick={toggleBookQRReader}
                    aria-label="Scan book"
                    style={{ marginTop: "10px", marginBlock: "10px" }}
                >
                    <QrCodeIcon size={22} />
                    <span>Scan Book Barcode</span>
                </button>
                <button type="submit"
                    title="Scan book barcode"
                    className="scan-copy-qr-button"
                    aria-label="Scan book"
                    style={{ marginTop: "10px", marginBlock: "10px" }}
                >Add Book</button>
            </div>
            <BarcodeScanner
                onResult={handleCopyQRCode}
                onError={toggleCopyQRReader}
                opened={showCopyQRReader}
                onCancel={toggleCopyQRReader} />
            <BarcodeScanner
                onResult={prefillBookDetails}
                onError={toggleBookQRReader}
                opened={showBookQRReader}
                onCancel={toggleBookQRReader} />
            {validationError && (
                <div style={{
                    color: "#d32f2f",
                    backgroundColor: "#ffebee",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid #ffcdd2",
                    marginTop: "8px",
                    fontSize: "14px"
                }}>
                    {validationError}
                </div>
            )}
            <Snackbar
                message={"Successfully added book!"}
                type={"success"}
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
            />
            <Snackbar
                message={"Failed to add book!"}
                type={"error"}
                isOpen={showError}
                onClose={() => setShowError(false)}
            />
        </form>
    );
}

export default NewBookForm;
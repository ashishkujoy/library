"use client";
import { useEffect, useState } from "react";
import FloatingActionButtons from "../../../components/FloatingActionButtons";
import LoaderOverlay from "../../../components/LoaderOverlay";
import ReadingBooks from "../../../components/ReadingBooks";
import Snackbar from "../../../components/Snackbar";
import StickyFooter from "../../../components/StickyFooter";
import { BorrowedBook } from "../../../types/BorrowedBook";
import { useSnackbar } from "../../../utils/useSnackbar";

export default function ReadingPage() {
  const [books, setBooks] = useState<BorrowedBook[] | undefined>();
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, close } = useSnackbar();

  useEffect(() => {
    if (books === undefined) {
      setLoading(true);
      fetch("/api/reading")
        .then(res => res.json().then(body => ({ body, status: res.status })))
        .then(({ body, status }) => {
          if (status === 200) {
            setBooks(body);
          } else {
            showError(`Failed to load reading list: ${body.message}`);
          }
        })
        .catch(() => {
          showError("Failed to load reading list. Please try again.");
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [books]);

  const returnBook = (result: string) => {
    setLoading(true);
    fetch("/api/reading/return", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ barcode: result }),
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        return status === 200
          ? showSuccess('Book returned successfully')
          : showError(`Failed to return book: ${data.message}`);
      })
      .catch(() => showError("Failed to return book. Please try again."))
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      {loading && <LoaderOverlay title="Loading" message="Please wait while we process your request..." />}
      <ReadingBooks books={books} />
      <FloatingActionButtons onScanResult={returnBook} onScanError={() => showError("Failed to scan qr code try again")} />
      <StickyFooter activeTab="reading" />
      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
        onClose={close}
        duration={4000}
        autoClose={true}
      />
    </div>
  );
}

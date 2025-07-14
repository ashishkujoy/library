"use client";
import ReadingBooks from "../../../components/ReadingBooks";
import FloatingActionButtons from "../../../components/FloatingActionButtons";
import StickyFooter from "../../../components/StickyFooter";
import { useState } from "react";
import { useSnackbar } from "../../../utils/useSnackbar";
import Snackbar from "../../../components/Snackbar";
import LoadingView from "../loading";

export default function ReadingPage() {
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, close } = useSnackbar();

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

  if (loading) {
    return <LoadingView />;
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <ReadingBooks />
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

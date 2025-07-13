"use client";
import { useState } from "react";
import Books from "../../components/BookRow";
import FloatingActionButtons from "../../components/FloatingActionButtons";
import Searchbar from "../../components/Searchbar";
import StickyFooter from "../../components/StickyFooter";
import { useSnackbar } from "../../utils/useSnackbar";
import Snackbar from "../../components/Snackbar";
import LoadingView from "./loading";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, close } = useSnackbar();

  const borrowBook = (result: string) => {
    setLoading(true);
    fetch("/api/books/borrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ barcode: result }),
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        return status === 200
          ? showSuccess('Book borrowed successfully')
          : showError(`Failed to borrow book: ${data.message}`);
      })
      .catch(() => showError("Failed to borrow book. Please try again."))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <div style={{ paddingBottom: '80px' }}>
      <Searchbar />
      <Books />
      <FloatingActionButtons onScanResult={borrowBook} onScanError={showError} />
      <StickyFooter activeTab="books" />
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

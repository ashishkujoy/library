"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Books from "../../components/BookRow";
import FloatingActionButtons from "../../components/FloatingActionButtons";
import LoaderOverlay from "../../components/LoaderOverlay";
import Searchbar from "../../components/Searchbar";
import Snackbar from "../../components/Snackbar";
import StickyFooter from "../../components/StickyFooter";
import { useSnackbar } from "../../utils/useSnackbar";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { snackbar, showSuccess, showError, close } = useSnackbar();
  const { data } = useSession();

  const isAdmin = data?.user?.isAdmin || false;


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

  return (
    <div style={{ paddingBottom: '80px' }}>
      {loading && <LoaderOverlay title="Loading" message="Please wait while we process your request..." />}
      <Searchbar />
      <Books />
      <FloatingActionButtons onScanResult={borrowBook} onScanError={showError} showManage={isAdmin} />
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

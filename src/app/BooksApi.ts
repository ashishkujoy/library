export const borrowBook = async (barcode: string) => {
    try {
        const response = await fetch("/api/books/borrow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ barcode }),
        });

        const body = await response.json();
        return { success: response.ok, data: body };
    } catch (error) {
        console.error("Error borrowing book:", error);
        return { success: false, data: { message: "Failed to borrow book. Please try again." } };
    }
}
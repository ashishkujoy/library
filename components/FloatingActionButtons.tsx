"use client";
import { QrCodeIcon, Settings2Icon } from "lucide-react";
import "../styles/FloatingActionButtons.css";
import BarcodeScanner from "./BarcodeScanner";
import { useState } from "react";
import Link from "next/link";

const FloatingActionButtons = () => {
    const [showScanner, setShowScanner] = useState(false);

    const handleScanClick = () => {
        setShowScanner(true);
    };

    const handleManageClick = () => {
        console.log("Manage button clicked");
    };

    const handleScanResult = (result: string) => {
        console.log("Scanned result:", result);
        setShowScanner(false); // Close scanner after scanning
    };

    return (
        <div>
            <div className="floating-actions">
                <button
                    className="floating-btn floating-btn-scan"
                    onClick={handleScanClick}
                    aria-label="Scan book"
                    title="Scan book barcode"
                >
                    <QrCodeIcon size={22} />
                </button>

                <Link href="/manage" style={{ textDecoration: 'none' }}>
                    <button
                        className="floating-btn floating-btn-manage"
                        onClick={handleManageClick}
                        aria-label="Manage books"
                        title="Manage books"
                    >
                        <Settings2Icon size={22} />
                    </button>
                </Link>
            </div>
            <BarcodeScanner
                onResult={handleScanResult}
                onError={(error) => console.error("Scan error:", error)}
                opened={showScanner} // This should be controlled by state in a real app
                onCancel={() => setShowScanner(false)}
            />
        </div>
    );
};

export default FloatingActionButtons;

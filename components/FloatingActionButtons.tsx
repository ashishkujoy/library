"use client";
import { QrCodeIcon, Settings2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import "../styles/FloatingActionButtons.css";
import BarcodeScanner from "./BarcodeScanner";

type Props = {
    onScanResult: (result: string) => void;
    onScanError: (error: string) => void;
    showManage?: boolean;
}

const FloatingActionButtons = (props: Props) => {
    const [showScanner, setShowScanner] = useState(false);

    const handleScanClick = () => setShowScanner(true);

    const handleScanResult = (result: string) => {
        setShowScanner(false);
        props.onScanResult(result);
    }

    const handleManageClick = () => {
        console.log("Manage button clicked");
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

                {props.showManage && (
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
                )}
            </div>
            <BarcodeScanner
                onResult={handleScanResult}
                onError={(error) => {
                    console.error("Barcode scan error:", error);
                    props.onScanError("Failed to scan barcode. Please try again.");
                }}
                opened={showScanner} // This should be controlled by state in a real app
                onCancel={() => setShowScanner(false)}
            />
        </div>
    );
};

export default FloatingActionButtons;

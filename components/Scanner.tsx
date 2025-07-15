import { QrCodeIcon } from "lucide-react";
import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";

type ScannerProps = {
    onScanResult: (result: string) => void;
    onScanError: (error: string) => void;
    className?: string;
}

const Scanner = ({ onScanResult, onScanError, className = "" }: ScannerProps) => {
    const [showScanner, setShowScanner] = useState(false);
    const toggleShowScanner = () => setShowScanner(!showScanner);

    return (
        <div>
            <div className={className}>
                <button
                    className="floating-btn floating-btn-scan"
                    onClick={toggleShowScanner}
                    aria-label="Scan book"
                    title="Scan book barcode"
                >
                    <QrCodeIcon size={22} />
                </button>
            </div>
            <BarcodeScanner
                onResult={(scanResult) => {
                    toggleShowScanner();
                    onScanResult(scanResult);
                }}
                onError={(error) => {
                    console.error("Barcode scan error:", error);
                    toggleShowScanner();
                    onScanError("Failed to scan barcode. Please try again.");
                }}
                opened={showScanner}
                onCancel={() => setShowScanner(false)}
            />
        </div>
    )
}

export default Scanner;
"use client";
import { QrCodeIcon } from "lucide-react";
import { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import PrimaryButton from "./PrimaryButton";

type ScannerProps = {
    onScanResult: (result: string) => void;
    onScanError: (error: string) => void;
    title?: string;
    className?: string;
}

const Scanner = ({ onScanResult, onScanError, className = "", title = "Scan" }: ScannerProps) => {
    const [showScanner, setShowScanner] = useState(false);
    const toggleShowScanner = () => setShowScanner(!showScanner);

    return (
        <div>
            <div className={className}>
                <PrimaryButton onClick={toggleShowScanner} title={title}>
                    <QrCodeIcon size={22} />
                </PrimaryButton>
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
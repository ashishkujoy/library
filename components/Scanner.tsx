"use client";
import { QrCodeIcon } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import PrimaryButton from "./PrimaryButton";
import LoadingSpinner from "./LoadingSpinner";

// Dynamic import for BarcodeScanner to reduce initial bundle size
const BarcodeScanner = dynamic(() => import("./BarcodeScanner"), {
    loading: () => <LoadingSpinner size="medium" message="Loading scanner..." />,
    ssr: false
});

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
"use client";
import { QrCodeIcon, Settings2Icon } from "lucide-react";
import "../styles/FloatingActionButtons.css";

const FloatingActionButtons = () => {
    const onScanClick = () => {
        console.log("Scan button clicked");
    };
    const onManageClick = () => {
        console.log("Manage button clicked");
    };

    const handleScanClick = () => {
        console.log("Scan button clicked");
        onScanClick?.();
    };

    const handleManageClick = () => {
        console.log("Manage button clicked");
        onManageClick?.();
    };

    return (
        <div className="floating-actions">
            <button 
                className="floating-btn floating-btn-scan"
                onClick={handleScanClick}
                aria-label="Scan book"
                title="Scan book barcode"
            >
                <QrCodeIcon size={22} />
            </button>
            
            <button 
                className="floating-btn floating-btn-manage"
                onClick={handleManageClick}
                aria-label="Manage books"
                title="Manage books"
            >
                <Settings2Icon size={22} />
            </button>
        </div>
    );
};

export default FloatingActionButtons;

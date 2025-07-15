"use client";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import QRCodes from "@/components/QRCodes";

export default function GenerateQRCodePage() {
    const [qrCount, setQrCount] = useState("0");
    const [qrCodes, setQrCodes] = useState<string[]>([]);

    const generateQRCodes = () => {
        const count = parseInt(qrCount);
        if (isNaN(count) || count <= 0) {
            alert("Please enter a valid number of QR codes.");
            return;
        }
        const time = Date.now();
        const newQRCodes = new Array(count).fill(0).map(() => `${time}-${uuidv4()}`);
        setQrCodes(newQRCodes);
    };

    return (
        <div className="page-container">
            <div>
                <h6 className="page-title">Generate QR Code</h6>
            </div>
            <div className="form-container">
                <TextInput
                    label="Number of QR Codes"
                    type="number"
                    value={qrCount}
                    onChange={(e) => setQrCount(e.target.value)}
                    id={"qrCount"}
                    name={"qrCount"}
                />
                <PrimaryButton onClick={generateQRCodes} title={"Generate"} />
            </div>
            <QRCodes codes={qrCodes} />
        </div>
    );
}

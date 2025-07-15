import QRCodeCard from "./QRCode"
import "@/styles/QRCodes.css";

const QRCodes = ({ codes }: { codes: string[] }) => {
    return (
        <div className="qr-codes-container">
            {codes.map((code, index) => (
                <div key={index} className="qr-code-item">
                    <QRCodeCard title={code} />
                </div>
            ))}
        </div>
    )
}

export default QRCodes;
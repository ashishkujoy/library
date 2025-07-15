import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import '@/styles/QRCode.css';

const QRCodeCard = ({ title }: { title: string }) => {
    const canvasRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        (async () => {
            const uri = await QRCode.toDataURL(title);
            const canvas = canvasRef.current;
            if (canvas) canvas.src = uri;
        })();
    }, []);

    return (
        <figure className="qr-code-container">
            <img ref={canvasRef} style={{ width: 190 }} />
        </figure>
    );
}

export default QRCodeCard;

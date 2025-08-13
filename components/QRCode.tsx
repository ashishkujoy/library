import '@/styles/QRCode.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const QRCodeCard = ({ title }: { title: string }) => {
    const [uri, setUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                setIsLoading(true);
                // Dynamic import of qrcode library
                const QRCode = await import('qrcode');
                const dataUrl = await QRCode.default.toDataURL(title);
                setUri(dataUrl);
            } catch (error) {
                console.error('Failed to generate QR code:', error);
            } finally {
                setIsLoading(false);
            }
        };

        generateQRCode();
    }, [title]);

    if (isLoading) {
        return (
            <div style={{ width: 190, height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingSpinner size="medium" />
            </div>
        );
    }

    return (
        <figure className="qr-code-container">
            <Image src={uri as string} alt={title} width={190} height={190} />
        </figure>
    );
}

export default QRCodeCard;

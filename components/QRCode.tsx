import '@/styles/QRCode.css';
import Image from 'next/image';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

const QRCodeCard = ({ title }: { title: string }) => {
    const [uri, setUri] = useState<string | null>(null);

    useEffect(() => {
        (async () => setUri(await QRCode.toDataURL(title)))();
    }, [title]);

    if (!uri) {
        <div style={{ width: 190, height: 190 }}>
            loading...
        </div>
    }

    return (
        <figure className="qr-code-container">
            <Image src={uri as string} alt={title} width={190} height={190} />
        </figure>
    );
}

export default QRCodeCard;

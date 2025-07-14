import { NextRequest, NextResponse } from 'next/server';
import { borrowBook, checkBookCopyAvailability } from '../../../../db/borrowedBooks';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return NextResponse.json(
                { success: false, message: 'Authentication required' },
                { status: 401 }
            );
        }

        const { qrCode } = await request.json();

        if (!qrCode) {
            return NextResponse.json(
                { success: false, message: 'QR code is required' },
                { status: 400 }
            );
        }

        // For now, we'll use a mock user ID. In a real app, you'd get this from the session
        // and have a proper users table with email->id mapping
        const userId = 1; // This should be derived from session.user.email

        const result = await borrowBook(userId, qrCode);

        if (result.success) {
            return NextResponse.json(result, { status: 200 });
        } else {
            return NextResponse.json(result, { status: 400 });
        }

    } catch (error) {
        console.error('Error in borrow API:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const qrCode = searchParams.get('qrCode');

        if (!qrCode) {
            return NextResponse.json(
                { success: false, message: 'QR code is required' },
                { status: 400 }
            );
        }

        const result = await checkBookCopyAvailability(qrCode);
        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error('Error checking availability:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

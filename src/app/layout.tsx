import { Roboto } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import AppHeader from '../../components/AppHeader';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Library",
  manifest: "/manifest.json",
  icons: { apple: "/icon.png" },
};

export const viewport = {
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <div className='app-container'>
          <AppHeader />
          <div className='app-child'>{children}</div>

        </div>
      </body>
    </html>
  );
}

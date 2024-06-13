import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';

const nunito = Nunito({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'O(1) Software Network',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Providers>
          <div className="mx-5">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
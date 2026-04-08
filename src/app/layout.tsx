import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday Manohar 🎉",
  description: "A magical birthday surprise for the best brother!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-magical-gradient overflow-x-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}

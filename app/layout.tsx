import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scripta",
  description: "Scripta – Where Ideas Take Shape",
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >

        <div className="flex flex-col">

          <div className="sticky z-50 top-0">
            <Header />
          </div>

          <div className="flex flex-1">
            <div className="md:w-[10.5rem] overflow-y-auto">
              <Sidebar />
            </div>

            <div className="flex-1">
              {children}
            </div>
          </div>

        </div>
      </body>
    </html>
  );
}

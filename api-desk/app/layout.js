// import LanguageParagraph from "@/components/features/LanguageParagraph/LanguageParagraph";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { Metadata } from "next";

export const metadata = {
  title: "My Fullstack App",
  description: "Mini full stack app with Next.js + MongoDB",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
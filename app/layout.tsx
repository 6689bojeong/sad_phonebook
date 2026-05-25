import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sad Phonebook",
  description: "심플한 웹 기반 전화번호 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen antialiased">{children}</body>
    </html>
  );
}

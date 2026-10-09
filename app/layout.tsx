import { AuthProvider } from "@/components/provider/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";

import { Figtree } from 'next/font/google';

const figtree = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Orbit",
  description: "AI Agent Workspace Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }} className={figtree.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
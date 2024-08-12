import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { QueryProvider } from "@/providers/query-client-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { QueryDevToolsProvider } from "@/providers/query-devtools-provider";

export const metadata: Metadata = {
  title: "Fullstack Todo App",
  description: "Fullstack Todo Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <ToasterProvider />
          {children}
          <QueryDevToolsProvider />
        </body>
      </html>
    </QueryProvider>
  );
}

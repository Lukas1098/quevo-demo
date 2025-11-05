import type { Metadata } from "next";
import { Aldrich } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "./providers/client-provider";

const aldrich = Aldrich({
  variable: "--font-sans",
  weight: "400"
})

export const metadata: Metadata = {
  title: "Quevo Demo",
  description: "Quevo Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${aldrich.variable} antialiased bg-background`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <div className="">
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}

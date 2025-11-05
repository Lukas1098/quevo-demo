import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "./providers/client-provider";

const geist = Geist({
  variable: "--font-sans",
  weight: "400"
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  weight: "400"
})

const georgia = Noto_Serif_Georgian({
  variable: "--font-serif",
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
        className={`${geist.variable} ${geistMono.variable} ${georgia.variable} antialiased bg-background`}
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

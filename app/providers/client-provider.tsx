"use client"

import { Header } from "@/components/Header"

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <Header />
            {children}
        </main>
    )
}
"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { useIsDesktop } from "@/hooks/useIsDesktop";

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    const isDesktop = useIsDesktop();

    return (
        <main className="min-h-screen max-h-dvh bg-gradient-to-br from-background via-background-hover to-background text-foreground p-4 flex flex-col items-center justify-center">
            <div>
                <div className="text-center mb-6 flex flex-col items-center">
                    {isDesktop && (
                        <div className="text-blue-accent shadow-sm bg-blue-transparent/80 rounded-2xl border-border border-1">
                            <Image
                                src="/logo.svg"
                                alt="VectorChat logo"
                                width={120}
                                height={120}
                                priority
                            />
                        </div>
                    )}
                    <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        {title}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {subtitle}
                    </p>
                </div>

                <div className="rounded-2xl border border-border bg-card backdrop-blur-md p-6 shadow-xl">
                    {children}
                </div>
            </div>
        </main>
    );
}

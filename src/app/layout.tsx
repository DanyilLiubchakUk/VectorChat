import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsButton } from "@/components/settings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "VectorChat - AI-powered data chat platform",
    description:
        "AI-powered data chat platform that allows users to upload company data files and have intelligent conversations with an AI assistant",
    keywords: ["AI", "chat", "data", "vector", "pinecone", "firebase"],
    authors: [{ name: "VectorChat Team" }],
    applicationName: "VectorChat",
    category: "technology",
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
    ),
    alternates: { canonical: "/" },
    openGraph: {
        title: "VectorChat - AI-powered data chat platform",
        description:
            "AI-powered data chat platform for intelligent conversations with company data",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "VectorChat - AI-powered data chat platform",
        description:
            "AI-powered data chat platform for intelligent conversations with company data",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-blue-accent focus:text-white focus:px-3 focus:py-2 focus:shadow-lg"
                >
                    Skip to content
                </a>
                <ThemeProvider>
                    <SettingsButton />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

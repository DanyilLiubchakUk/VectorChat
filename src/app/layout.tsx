import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsButton } from "@/components/settings";
import { Toaster } from "@/components/ui/sonner";

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
        images: [
            { url: "/og.png", width: 1200, height: 630, alt: "VectorChat" },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "VectorChat - AI-powered data chat platform",
        description:
            "AI-powered data chat platform for intelligent conversations with company data",
        images: ["/og.png"],
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
    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon.svg", type: "image/svg+xml" },
        ],
        apple: "/apple-touch-icon.png",
        other: [{ rel: "mask-icon", url: "/favicon.svg", color: "#3B82F6" }],
    },
    manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
    colorScheme: "dark",
    themeColor: "#3B82F6",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
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
                <Toaster richColors />
            </body>
        </html>
    );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VectorChat - AI-powered data chat platform",
    description:
        "AI-powered data chat platform that allows users to upload company data files and have intelligent conversations with an AI assistant",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}

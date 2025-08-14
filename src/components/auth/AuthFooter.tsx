"use client";

import Link from "next/link";

interface AuthFooterProps {
    question: string;
    linkText: string;
    linkHref: string;
}

export function AuthFooter({ question, linkText, linkHref }: AuthFooterProps) {
    return (
        <p className="mt-4 text-center text-sm text-muted-foreground">
            {question}{" "}
            <Link href={linkHref} className="text-blue-accent hover:underline">
                {linkText}
            </Link>
        </p>
    );
}

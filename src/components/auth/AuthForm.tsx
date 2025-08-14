"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
    children: ReactNode;
    onSubmit: (e: React.FormEvent) => void;
    submitText: string;
    loading: boolean;
    loadingText: string;
}

export function AuthForm({
    children,
    onSubmit,
    submitText,
    loading,
    loadingText,
}: AuthFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            {children}

            <Button
                type="submit"
                className="w-full rounded-xl bg-blue-accent hover:bg-blue-accent/90 focus-visible:bg-blue-accent/90 shadow-md"
                disabled={loading}
            >
                {loading ? loadingText : submitText}
            </Button>
        </form>
    );
}

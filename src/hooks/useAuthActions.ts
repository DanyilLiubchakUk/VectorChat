"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { getFirebaseAuthErrorMessage } from "@/lib/utils/firebaseErrors";

export function useAuthActions() {
    const router = useRouter();
    const search = useSearchParams();
    const { showError } = useToast();
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState("/");

    // Safely get the next URL parameter after component mounts
    useEffect(() => {
        if (search) {
            const next = search.get("next");
            if (next) {
                setNextUrl(next);
            }
        }
    }, [search]);

    const handleAuthSuccess = async (idToken: string) => {
        try {
            await fetch("/api/login", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            router.push(nextUrl);
        } catch {
            showError(
                "Authentication successful but session creation failed. Please try again."
            );
        }
    };

    const handleAuthError = (error: Error) => {
        const userMessage = getFirebaseAuthErrorMessage(error.message);
        showError(userMessage);
    };

    return {
        loading,
        setLoading,
        handleAuthSuccess,
        handleAuthError,
        nextUrl,
    };
}

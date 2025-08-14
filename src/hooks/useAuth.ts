"use client";

import { useEffect, useMemo, useState } from "react";
import {
    onAuthStateChanged,
    signOut as firebaseSignOut,
    type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

type UseAuthResult = {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
};

export function useAuth(): UseAuthResult {
    const [clientUser, setClientUser] = useState<User | null>(null);
    const [serverAuthenticated, setServerAuthenticated] = useState<
        boolean | null
    >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        // Check server session via cookie
        (async () => {
            try {
                const res = await fetch("/api/auth/status", {
                    cache: "no-store",
                });
                if (res.ok) {
                    const data = await res.json();
                    setServerAuthenticated(Boolean(data?.authenticated));
                } else {
                    setServerAuthenticated(false);
                }
            } catch {
                setServerAuthenticated(false);
            }
        })();

        // Observe client auth state when available
        const auth = getFirebaseAuth();
        if (auth) {
            unsubscribe = onAuthStateChanged(auth, (user) => {
                setClientUser(user);
            });
        }

        setLoading(false);

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const isAuthenticated = useMemo(() => {
        return Boolean(clientUser) || serverAuthenticated === true;
    }, [clientUser, serverAuthenticated]);

    async function signOut() {
        try {
            await fetch("/api/logout", { method: "POST" });
        } catch {}

        try {
            const auth = getFirebaseAuth();
            if (auth) {
                await firebaseSignOut(auth);
            }
        } catch (error) {
            console.error("Error signing out from Firebase:", error);
        }

        if (typeof window !== "undefined") {
            window.location.href = "/signin";
        }
    }

    return { isAuthenticated, user: clientUser, loading, signOut };
}

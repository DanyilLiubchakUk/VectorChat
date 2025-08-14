"use client";

import { useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import {
    AuthLayout,
    AuthForm,
    AuthField,
    GoogleAuthButton,
    AuthDivider,
    AuthFooter,
} from "@/components/auth";
import { useAuthActions } from "@/hooks/useAuthActions";

export default function SignInClient() {
    const { loading, setLoading, handleAuthSuccess, handleAuthError } =
        useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleEmailPasswordSignIn(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const auth = getFirebaseAuth();
            if (!auth) {
                throw new Error("auth/firebase-not-initialized");
            }

            const credential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const idToken = await credential.user.getIdToken();

            await handleAuthSuccess(idToken);
        } catch (err) {
            handleAuthError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    async function handleGoogleSignIn() {
        setLoading(true);
        try {
            const auth = getFirebaseAuth();
            if (!auth) {
                throw new Error("auth/firebase-not-initialized");
            }

            const provider = new GoogleAuthProvider();
            const credential = await signInWithPopup(auth, provider);
            const idToken = await credential.user.getIdToken();

            await handleAuthSuccess(idToken);
        } catch (err) {
            handleAuthError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to continue to VectorChat"
        >
            <h2 className="sr-only">Sign in form</h2>

            <AuthForm
                onSubmit={handleEmailPasswordSignIn}
                submitText="Sign in"
                loading={loading}
                loadingText="Signing in..."
            >
                <AuthField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                />

                <AuthField
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                />
            </AuthForm>

            <AuthDivider />

            <GoogleAuthButton onClick={handleGoogleSignIn} disabled={loading} />

            <AuthFooter
                question="Don't have an account?"
                linkText="Sign up"
                linkHref="/signup"
            />
        </AuthLayout>
    );
}

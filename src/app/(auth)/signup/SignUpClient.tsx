"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/useToast";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { AuthLayout, AuthForm, AuthField, AuthFooter } from "@/components/auth";
import { useAuthActions } from "@/hooks/useAuthActions";

export default function SignUpClient() {
    const { showError } = useToast();
    const { loading, setLoading, handleAuthSuccess, handleAuthError } =
        useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (password !== confirmation) {
            showError("Passwords don't match. Please try again.");
            return;
        }

        if (password.length < 6) {
            showError("Password must be at least 6 characters long.");
            return;
        }

        if (!email.includes("@")) {
            showError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const auth = getFirebaseAuth();
            if (!auth) {
                throw new Error("auth/firebase-not-initialized");
            }

            const cred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const idToken = await cred.user.getIdToken();

            await handleAuthSuccess(idToken);
        } catch (err) {
            handleAuthError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Sign up to get started with VectorChat"
        >
            <h2 className="sr-only">Sign up form</h2>

            <AuthForm
                onSubmit={handleSubmit}
                submitText="Create account"
                loading={loading}
                loadingText="Creating account..."
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
                    autoComplete="new-password"
                />

                <AuthField
                    id="confirm"
                    label="Confirm password"
                    type="password"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                />
            </AuthForm>

            <AuthFooter
                question="Already have an account?"
                linkText="Sign in"
                linkHref="/signin"
            />
        </AuthLayout>
    );
}

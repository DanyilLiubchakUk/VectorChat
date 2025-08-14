"use client";

import { Button } from "@/components/ui/button";

interface GoogleAuthButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export function GoogleAuthButton({ onClick, disabled }: GoogleAuthButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl border-border"
            onClick={onClick}
            disabled={disabled}
        >
            Continue with Google
        </Button>
    );
}

"use client";

import { Input } from "@/components/ui/input";

interface AuthFieldProps {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    autoComplete: string;
    required?: boolean;
}

export function AuthField({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    autoComplete,
    required = true,
}: AuthFieldProps) {
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-sm">
                {label}
            </label>
            <Input
                id={id}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
            />
        </div>
    );
}

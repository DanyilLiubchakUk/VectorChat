"use client";

import {
    Monitor,
    Palette,
    Settings,
    Sun,
    Moon,
    LogIn,
    LogOut,
    UserPlus,
} from "lucide-react";
import { useRef } from "react";
import { useOnClickOutside } from "reshaped";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type ThemeKind = "light" | "dark" | "system";

export function MobileSettingsTrigger({
    onTrigger,
    open,
}: {
    onTrigger: () => void;
    open: boolean;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className="flex sm:hidden fixed top-4 right-6 z-50 bg-card/90 backdrop-blur-md border border-border/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-transparent-hover hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-accent/50 focus-visible:ring-offset-2"
            aria-label="Open settings menu"
            title="Settings"
            onClick={onTrigger}
            aria-expanded={open}
            aria-controls="mobile-settings-panel"
        >
            <Settings className="h-5 w-5 text-foreground" />
            <span className="sr-only">Settings</span>
        </Button>
    );
}

export function MobileSettingsPanel({
    id = "mobile-settings-panel",
    open,
    onClose,
    theme,
    resolvedTheme,
    setTheme,
    isAuthenticated,
    onSignOut,
}: {
    id?: string;
    open: boolean;
    onClose: () => void;
    theme: ThemeKind;
    resolvedTheme: "light" | "dark";
    setTheme: (t: ThemeKind) => void;
    isAuthenticated: boolean;
    onSignOut: () => void;
}) {
    const menuRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(
        [menuRef],
        () => {
            if (open) onClose();
        },
        { disabled: !open }
    );

    return (
        <div
            id={id}
            ref={menuRef}
            className={`sm:hidden fixed top-15 right-6 p-1 w-56 bg-sidebar backdrop-blur-md border border-border/60 shadow-xl rounded-xl z-[1] transition-transform duration-500 ease-in-out ${
                open ? "translate-x-0" : "translate-x-65"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
        >
            {!isAuthenticated ? (
                <div className="flex flex-col gap-1.5 pb-2">
                    <Button
                        asChild
                        tabIndex={open ? 0 : -1}
                        className="bg-background hover:bg-green-transparent transition-colors duration-200 focus-visible:bg-green-transparent focus-visible:ring-2 focus-visible:ring-green-accent/50"
                    >
                        <Link
                            href="/signin"
                            className="flex items-center w-full"
                            onClick={onClose}
                        >
                            <LogIn className="mr-3 h-4 w-4 text-green-accent" />
                            <span className="font-medium mr-auto text-foreground">
                                Sign in
                            </span>
                        </Link>
                    </Button>
                    <Button
                        asChild
                        tabIndex={open ? 0 : -1}
                        className="bg-background hover:bg-yellow-transparent transition-colors duration-200 focus-visible:bg-yellow-transparent focus-visible:ring-2 focus-visible:ring-yellow-accent/50"
                    >
                        <Link
                            href="/signup"
                            className="flex items-center w-full"
                            onClick={onClose}
                        >
                            <UserPlus className="mr-3 h-4 w-4 text-yellow-accent" />
                            <span className="font-medium mr-auto text-foreground">
                                Sign up
                            </span>
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-1.5 pb-2">
                    <Button
                        tabIndex={open ? 0 : -1}
                        onClick={() => {
                            onSignOut();
                            onClose();
                        }}
                        className="bg-background hover:bg-red-transparent transition-colors duration-200 focus-visible:bg-red-transparent focus-visible:ring-2 focus-visible:ring-red-accent/50"
                    >
                        <LogOut className="mr-3 h-4 w-4 text-red-accent" />
                        <span className="font-medium mr-auto text-foreground">
                            Sign out
                        </span>
                    </Button>
                </div>
            )}
            <div className="flex items-center px-2 py-1.5">
                <Palette
                    className="mr-3 h-4 w-4 text-purple-accent"
                    aria-hidden
                />
                <span
                    id={`${id}-title`}
                    className="font-medium text-foreground"
                >
                    Theme
                </span>
            </div>
            <div className="flex flex-col gap-1.5 pl-7">
                <Button
                    tabIndex={open ? 0 : -1}
                    onClick={() => {
                        setTheme("light");
                        onClose();
                    }}
                    className={`bg-background hover:bg-yellow-transparent-hover transition-colors duration-200 cursor-pointer focus-visible:bg-yellow-transparent-hover focus-visible:ring-2 focus-visible:ring-yellow-accent/50 ${
                        theme === "system" && resolvedTheme === "light"
                            ? "bg-yellow-transparent border border-yellow-accent/30"
                            : ""
                    }`}
                    aria-label="Switch to light theme"
                >
                    <Sun
                        className="mr-3 h-4 w-4 text-yellow-accent"
                        aria-hidden
                    />
                    <span className="font-medium mr-auto text-foreground">
                        Light
                    </span>
                    <span
                        aria-hidden
                        className={`ml-2 h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                            theme === "light"
                                ? "bg-foreground border-border/60"
                                : theme === "system" &&
                                  resolvedTheme === "light"
                                ? "bg-muted-foreground/60 border-border/60"
                                : "border-border/60"
                        }`}
                    />
                    <span className="sr-only">
                        {theme === "light"
                            ? "Light theme active"
                            : theme === "system" && resolvedTheme === "light"
                            ? "System theme selected, light is currently applied"
                            : ""}
                    </span>
                </Button>
                <Button
                    tabIndex={open ? 0 : -1}
                    onClick={() => {
                        setTheme("dark");
                        onClose();
                    }}
                    className={`bg-background hover:bg-blue-transparent-hover transition-colors duration-200 cursor-pointer focus-visible:bg-blue-transparent-hover focus-visible:ring-2 focus-visible:ring-blue-accent/50 ${
                        theme === "system" && resolvedTheme === "dark"
                            ? "bg-blue-transparent border border-blue-accent/30"
                            : ""
                    }`}
                    aria-label="Switch to dark theme"
                >
                    <Moon
                        className="mr-3 h-4 w-4 text-blue-accent"
                        aria-hidden
                    />
                    <span className="font-medium mr-auto text-foreground">
                        Dark
                    </span>
                    <span
                        aria-hidden
                        className={`ml-2 h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                            theme === "dark"
                                ? "bg-foreground border-border/60"
                                : theme === "system" && resolvedTheme === "dark"
                                ? "bg-muted-foreground/60 border-border/60"
                                : "border-border/60"
                        }`}
                    />
                    <span className="sr-only">
                        {theme === "dark"
                            ? "Dark theme active"
                            : theme === "system" && resolvedTheme === "dark"
                            ? "System theme selected, dark is currently applied"
                            : ""}
                    </span>
                </Button>
                <Button
                    tabIndex={open ? 0 : -1}
                    onClick={() => {
                        setTheme("system");
                        onClose();
                    }}
                    className="bg-background hover:bg-green-transparent-hover transition-colors duration-200 cursor-pointer focus-visible:bg-green-transparent-hover focus-visible:ring-2 focus-visible:ring-green-accent/50"
                    aria-label="Switch to system theme"
                >
                    <Monitor
                        className="mr-3 h-4 w-4 text-green-accent"
                        aria-hidden
                    />
                    <span className="font-medium mr-auto text-foreground">
                        System
                    </span>
                    <span
                        aria-hidden
                        className={`ml-2 h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                            theme === "system"
                                ? "bg-green-accent border-green-accent"
                                : "border-border/60"
                        }`}
                    />
                    <span className="sr-only">
                        {theme === "system" ? "System theme active" : ""}
                    </span>
                </Button>
            </div>
        </div>
    );
}

"use client";

import {
    Moon,
    Sun,
    Monitor,
    Settings,
    Palette,
    LogIn,
    UserPlus,
    LogOut,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type ThemeKind = "light" | "dark" | "system";

export function DesktopSettings({
    open,
    onOpenChange,
    onTrigger,
    getCurrentThemeText,
    setTheme,
    theme,
    resolvedTheme,
    isAuthenticated,
    onSignOut,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTrigger: () => void;
    getCurrentThemeText: () => string;
    setTheme: (t: ThemeKind) => void;
    theme: ThemeKind;
    resolvedTheme: "light" | "dark";
    isAuthenticated: boolean;
    onSignOut: () => void;
}) {
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="fixed top-4 right-6 z-50 bg-sidebar backdrop-blur-md border border-border/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-transparent-hover focus-visible:ring-2 focus-visible:ring-blue-transparent focus-visible:ring-offset-2"
                    aria-label="Open settings menu"
                    title="Settings"
                    onClick={onTrigger}
                >
                    <Settings className="h-5 w-5 text-foreground" />
                    <span className="sr-only">Settings</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-56 bg-sidebar backdrop-blur-md border border-border/60 shadow-xl rounded-xl z-[60]"
                >
                    {!isAuthenticated ? (
                        <>
                            <DropdownMenuItem
                                className="hover:bg-green-transparent transition-colors duration-200 focus-visible:bg-green-transparent focus-visible:ring-2 focus-visible:ring-green-accent/50 cursor-pointer"
                                onClick={() => onOpenChange(false)}
                            >
                                <Link
                                    href="/signin"
                                    className="flex items-center w-full"
                                >
                                    <LogIn className="mr-3 h-4 w-4 text-green-accent" />
                                    <span className="font-medium text-foreground">
                                        Sign in
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="hover:bg-yellow-transparent transition-colors duration-200 focus-visible:bg-yellow-transparent focus-visible:ring-2 focus-visible:ring-yellow-accent/50 cursor-pointer"
                                onClick={() => onOpenChange(false)}
                            >
                                <Link
                                    href="/signup"
                                    className="flex items-center w-full"
                                >
                                    <UserPlus className="mr-3 h-4 w-4 text-yellow-accent" />
                                    <span className="font-medium text-foreground">
                                        Sign up
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <DropdownMenuItem
                            onClick={() => {
                                onSignOut();
                                onOpenChange(false);
                            }}
                            className="hover:bg-red-transparent transition-colors duration-200 focus-visible:bg-red-transparent focus-visible:ring-2 focus-visible:ring-red-accent/50 cursor-pointer"
                        >
                            <LogOut className="mr-3 h-4 w-4 text-red-accent" />
                            <span className="font-medium text-foreground">
                                Sign out
                            </span>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="hover:bg-background-hover transition-colors duration-200 focus-visible:bg-background-hover focus-visible:ring-2 focus-visible:ring-blue-accent/50">
                            <Palette className="mr-3 h-4 w-4 text-purple-accent" />
                            <span className="font-medium text-foreground">
                                Theme
                            </span>
                            <span className="ml-auto text-xs text-muted-foreground">
                                {getCurrentThemeText()}
                            </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent
                                sideOffset={8}
                                className="w-48 bg-sidebar backdrop-blur-md border border-border/60 shadow-xl rounded-xl z-[70]"
                            >
                                <DropdownMenuItem
                                    onClick={() => setTheme("light")}
                                    className={`hover:bg-yellow-transparent-hover transition-colors duration-200 cursor-pointer focus-visible:bg-yellow-transparent-hover focus-visible:ring-2 focus-visible:ring-yellow-accent/50 ${
                                        theme === "system" &&
                                        resolvedTheme === "light"
                                            ? "bg-yellow-transparent border border-yellow-accent/30"
                                            : ""
                                    }`}
                                    aria-label="Switch to light theme"
                                >
                                    <Sun className="mr-3 h-4 w-4 text-yellow-accent" />
                                    <span className="font-medium text-foreground">
                                        Light
                                    </span>
                                    <span
                                        aria-hidden
                                        className={`ml-auto h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
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
                                            : theme === "system" &&
                                              resolvedTheme === "light"
                                            ? "System theme selected, light is currently applied"
                                            : ""}
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("dark")}
                                    className={`hover:bg-blue-transparent-hover transition-colors duration-200 cursor-pointer focus-visible:bg-blue-transparent-hover focus-visible:ring-2 focus-visible:ring-blue-accent/50 ${
                                        theme === "system" &&
                                        resolvedTheme === "dark"
                                            ? "bg-blue-transparent border border-blue-accent/30"
                                            : ""
                                    }`}
                                    aria-label="Switch to dark theme"
                                >
                                    <Moon className="mr-3 h-4 w-4 text-blue-accent" />
                                    <span className="font-medium text-foreground">
                                        Dark
                                    </span>
                                    <span
                                        aria-hidden
                                        className={`ml-auto h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                                            theme === "dark"
                                                ? "bg-foreground border-border/60"
                                                : theme === "system" &&
                                                  resolvedTheme === "dark"
                                                ? "bg-muted-foreground/60 border-border/60"
                                                : "border-border/60"
                                        }`}
                                    />
                                    <span className="sr-only">
                                        {theme === "dark"
                                            ? "Dark theme active"
                                            : theme === "system" &&
                                              resolvedTheme === "dark"
                                            ? "System theme selected, dark is currently applied"
                                            : ""}
                                    </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("system")}
                                    className="hover:bg-green-transparent-hover transition-colors duration-200 cursor-pointer focus-visible:bg-green-transparent-hover focus-visible:ring-2 focus-visible:ring-green-accent/50"
                                    aria-label="Switch to system theme"
                                >
                                    <Monitor className="mr-3 h-4 w-4 text-green-accent" />
                                    <span className="font-medium text-foreground">
                                        System
                                    </span>
                                    <span
                                        aria-hidden
                                        className={`ml-auto h-2.5 w-2.5 rounded-full border transition-colors duration-200 ${
                                            theme === "system"
                                                ? "bg-green-accent border-green-accent"
                                                : "border-border/60"
                                        }`}
                                    />
                                    <span className="sr-only">
                                        {theme === "system"
                                            ? "System theme active"
                                            : ""}
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
}

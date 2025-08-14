"use client";

import { useEffect, useState } from "react";
import { useSettingsWindow } from "@/store/settingsWindowStore";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { DesktopSettings } from "@/components/settings/DesktopSettings";
import {
    MobileSettingsPanel,
    MobileSettingsTrigger,
} from "@/components/settings/MobileSettings";
import { useAuth } from "@/hooks/useAuth";

export function SettingsButton() {
    const [mounted, setMounted] = useState(false);
    const isDesktop = useIsDesktop();
    const {
        openWindow: isMobileOpen,
        openDesktopWindow: isDesktopOpen,
        setMobileOpenWindow: setMobileOpen,
        setDesktopOpenWindow: setDesktopOpen,
        toggleMobileOpenWindow: toggleMobileOpen,
        toggleDesktopOpenWindow: toggleDesktopOpen,
        theme,
        resolvedTheme,
        setTheme,
        getCurrentThemeText,
    } = useSettingsWindow();
    const { isAuthenticated, signOut } = useAuth();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        setTheme(theme);
    }, [mounted, setTheme, theme]);

    useEffect(() => {
        if (!mounted) return;
        if (isDesktop) {
            if (isMobileOpen && !isDesktopOpen) setDesktopOpen(true);
            if (isMobileOpen) setMobileOpen(false);
        } else {
            if (isDesktopOpen && !isMobileOpen) setMobileOpen(true);
            if (isDesktopOpen) setDesktopOpen(false);
        }
    }, [
        mounted,
        isDesktop,
        isMobileOpen,
        isDesktopOpen,
        setMobileOpen,
        setDesktopOpen,
    ]);

    // Hydration-safe placeholder
    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 right-6 z-50 bg-card/90 backdrop-blur-md border border-border/60 shadow-lg"
                aria-label="Open settings menu"
                title="Settings"
            >
                <Settings className="h-5 w-5 text-foreground" />
                <span className="sr-only">Settings</span>
            </Button>
        );
    }

    return isDesktop ? (
        <DesktopSettings
            open={isDesktopOpen}
            onOpenChange={setDesktopOpen}
            onTrigger={() => toggleDesktopOpen()}
            getCurrentThemeText={getCurrentThemeText}
            setTheme={setTheme}
            theme={theme}
            resolvedTheme={resolvedTheme}
            isAuthenticated={isAuthenticated}
            onSignOut={signOut}
        />
    ) : (
        <>
            <MobileSettingsTrigger
                onTrigger={() => toggleMobileOpen()}
                open={isMobileOpen}
            />
            <MobileSettingsPanel
                open={isMobileOpen}
                onClose={() => setMobileOpen(false)}
                theme={theme}
                resolvedTheme={resolvedTheme}
                setTheme={setTheme}
                isAuthenticated={isAuthenticated}
                onSignOut={signOut}
            />
        </>
    );
}

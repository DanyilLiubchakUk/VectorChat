"use client";

import { useSettingsWindow } from "@/store/settingsWindowStore";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useSettingsWindow();

    useEffect(() => {
        setTheme(theme);

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                setTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme, setTheme]);

    return <>{children}</>;
}

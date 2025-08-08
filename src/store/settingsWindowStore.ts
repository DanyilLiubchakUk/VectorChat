import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeMode, ResolvedTheme } from "@/types/theme";

interface SettingsStore {
    openWindow: boolean;
    openDesktopWindow: boolean;
    toggleOpenWindow: (open?: boolean) => void;
    setMobileOpenWindow: (open: boolean) => void;
    setDesktopOpenWindow: (open: boolean) => void;
    toggleMobileOpenWindow: () => void;
    toggleDesktopOpenWindow: () => void;
    theme: ThemeMode;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: ThemeMode) => void;
    setResolvedTheme: (theme: ResolvedTheme) => void;
    toggleTheme: () => void;
    getCurrentThemeIcon: () => string;
    getCurrentThemeText: () => string;
}

export const useSettingsWindow = create<SettingsStore>()(
    persist(
        (set, get) => ({
            openWindow: false,
            openDesktopWindow: false,

            toggleOpenWindow: (open) => {
                if (open !== undefined) {
                    set({ openWindow: open, openDesktopWindow: open });
                } else {
                    set({
                        openWindow: !get().openWindow,
                        openDesktopWindow: !get().openDesktopWindow,
                    });
                }
            },

            setMobileOpenWindow: (open: boolean) => set({ openWindow: open }),
            setDesktopOpenWindow: (open: boolean) =>
                set({ openDesktopWindow: open }),
            toggleMobileOpenWindow: () =>
                set({ openWindow: !get().openWindow }),
            toggleDesktopOpenWindow: () =>
                set({ openDesktopWindow: !get().openDesktopWindow }),

            theme: "system",
            resolvedTheme: "light",

            setTheme: (theme: ThemeMode) => {
                set({ theme });
                if (typeof window === "undefined") return;

                if (theme === "dark") {
                    document.documentElement.classList.add("dark");
                    set({ resolvedTheme: "dark" });
                } else if (theme === "light") {
                    document.documentElement.classList.remove("dark");
                    set({ resolvedTheme: "light" });
                } else {
                    const isDark = window.matchMedia(
                        "(prefers-color-scheme: dark)"
                    ).matches;
                    if (isDark) {
                        document.documentElement.classList.add("dark");
                        set({ resolvedTheme: "dark" });
                    } else {
                        document.documentElement.classList.remove("dark");
                        set({ resolvedTheme: "light" });
                    }
                }
            },

            setResolvedTheme: (resolvedTheme: ResolvedTheme) => {
                set({ resolvedTheme });
            },

            toggleTheme: () => {
                const { theme } = get();
                const nextTheme: ThemeMode =
                    theme === "light" ? "dark" : "light";
                get().setTheme(nextTheme);
            },

            getCurrentThemeIcon: () => {
                const { theme, resolvedTheme } = get();
                if (theme === "system") return "monitor";
                if (resolvedTheme === "dark") return "moon";
                return "sun";
            },

            getCurrentThemeText: () => {
                const { theme } = get();
                if (theme === "system") return "System";
                if (theme === "dark") return "Dark";
                return "Light";
            },
        }),
        {
            name: "vectorchat-settingWindow",
            partialize: (state) => ({ theme: state.theme }),
        }
    )
);

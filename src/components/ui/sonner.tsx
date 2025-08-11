"use client";

import { useSettingsWindow } from "@/store/settingsWindowStore";
import { Toaster as SonnerToaster, ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
    const { resolvedTheme } = useSettingsWindow();

    return <SonnerToaster {...props} theme={resolvedTheme} />;
}

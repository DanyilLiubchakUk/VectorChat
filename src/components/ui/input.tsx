import * as React from "react";

import { cn } from "@/lib/utils/index";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "flex h-9 w-full min-w-0 rounded-md border px-3 py-2 text-sm text-foreground shadow-sm transition-all duration-200 outline-none",
                "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
                "selection:bg-blue-accent/20 selection:text-primary-foreground",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                "focus-visible:ring-2 focus-visible:ring-blue-accent/50 focus-visible:ring-offset-2",
                "aria-invalid:border-red-accent aria-invalid:ring-red-accent/20",
                "hover:border-blue-accent/50",
                "bg-white border-blue-accent/30 placeholder:text-blue-accent/60 focus-visible:border-blue-accent hover:bg-blue-accent/5",
                "dark:bg-card dark:border-border dark:placeholder:text-muted-foreground dark:hover:bg-accent/5 dark:hover:border-border/80 dark:focus-visible:border-border dark:focus-visible:ring-border/50",
                "[&:-webkit-autofill]:![-webkit-text-fill-color:var(--color-foreground)] [&:-webkit-autofill]:![-webkit-box-shadow:0_0_0px_1000px_var(--color-card)_inset]",

                className
            )}
            {...props}
        />
    );
}

export { Input };

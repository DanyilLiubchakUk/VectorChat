export function AuthDivider() {
    return (
        <div className="my-2 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
        </div>
    );
}

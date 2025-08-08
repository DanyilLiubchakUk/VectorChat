"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import AdminPanel from "@/components/dashboard/AdminPanel";
import ClientPanel from "@/components/dashboard/ClientPanel";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function DashboardPanel({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`h-full transition-all duration-500 bg-background ${className}`}
        >
            {children}
        </div>
    );
}

export default function DashboardPage() {
    const [mobileView, setMobileView] = useState<"admin" | "chat">("admin");

    return (
        <main
            id="main-content"
            className={"h-screen w-full transition-all duration-500"}
        >
            <div className="block md:hidden h-full relative">
                <div className="h-[calc(100vh-48px)] relative overflow-hidden">
                    <div
                        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                            mobileView === "admin"
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }`}
                        style={{ width: "100%" }}
                    >
                        <DashboardPanel>
                            <AdminPanel />
                        </DashboardPanel>
                    </div>

                    <div
                        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                            mobileView === "chat"
                                ? "translate-x-0"
                                : "translate-x-full"
                        }`}
                        style={{ width: "100%" }}
                    >
                        <DashboardPanel>
                            <ClientPanel />
                        </DashboardPanel>
                    </div>
                </div>

                <div
                    className={`h-12 flex gap-4 py-1 px-2 transition-all duration-500 absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border/40`}
                >
                    <Button
                        onClick={() => setMobileView("admin")}
                        className={`flex-1 rounded-xl font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-purple-accent/50 focus-visible:ring-offset-2 ${
                            mobileView === "admin"
                                ? "bg-purple-accent text-white shadow-lg hover:bg-purple-accent/90"
                                : "bg-purple-transparent text-purple-accent hover:bg-purple-transparent-hover border border-purple-accent/30"
                        }`}
                    >
                        Admin Dashboard
                    </Button>
                    <Button
                        onClick={() => setMobileView("chat")}
                        className={`flex-1 rounded-xl font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-green-accent/50 focus-visible:ring-offset-2 ${
                            mobileView === "chat"
                                ? "bg-green-accent text-white shadow-lg hover:bg-green-accent/90"
                                : "bg-green-transparent text-green-accent hover:bg-green-transparent-hover border border-green-accent/30"
                        }`}
                    >
                        Users Chat
                    </Button>
                </div>
            </div>

            <div className="hidden md:block h-full">
                <PanelGroup direction="horizontal" className="h-full">
                    <Panel defaultSize={40} minSize={40} maxSize={60}>
                        <DashboardPanel className="border-r border-border/40">
                            <AdminPanel />
                        </DashboardPanel>
                    </Panel>

                    <PanelResizeHandle
                        className={`w-1 transition-all duration-500 bg-border/50 hover:bg-border cursor-col-resize group`}
                    >
                        <div className="w-full h-full flex items-center justify-center">
                            <div
                                className={`w-0.5 h-8 rounded-full transition-all duration-500 bg-muted-foreground/30 group-hover:bg-muted-foreground/50`}
                            ></div>
                        </div>
                    </PanelResizeHandle>

                    <Panel defaultSize={60} minSize={40} maxSize={60}>
                        <DashboardPanel>
                            <ClientPanel />
                        </DashboardPanel>
                    </Panel>
                </PanelGroup>
            </div>
        </main>
    );
}

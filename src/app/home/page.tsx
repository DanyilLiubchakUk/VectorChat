"use client";

export default function HomePage() {
    return (
        <div
            className={`min-h-screen transition-all duration-500 bg-gradient-to-br from-background via-card/50 to-background`}
        >
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1
                        className={`text-5xl font-bold mb-4 transition-all duration-500 bg-gradient-to-r from-foreground to-blue-accent bg-clip-text text-transparent`}
                    >
                        VectorChat
                    </h1>
                    <p
                        className={`text-xl max-w-2xl mx-auto transition-all duration-500 text-muted-foreground`}
                    >
                        AI-powered data chat platform for intelligent
                        conversations with your company data
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    <div
                        className={`group p-8 rounded-2xl border border-border/40 transition-all duration-500 hover:scale-105 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-border/60`}
                    >
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 bg-blue-transparent group-hover:bg-blue-transparent-hover`}
                        >
                            <svg
                                className="w-6 h-6 text-blue-accent"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <h3
                            className={`text-xl font-semibold mb-3 transition-all duration-500 text-foreground`}
                        >
                            AI Chat Interface
                        </h3>
                        <p
                            className={`leading-relaxed transition-all duration-500 text-muted-foreground`}
                        >
                            Have intelligent conversations with your company
                            data using advanced AI technology
                        </p>
                    </div>

                    <div
                        className={`group p-8 rounded-2xl border border-border/40 transition-all duration-500 hover:scale-105 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-border/60`}
                    >
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 bg-green-transparent group-hover:bg-green-transparent-hover`}
                        >
                            <svg
                                className="w-6 h-6 text-green-accent"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        </div>
                        <h3
                            className={`text-xl font-semibold mb-3 transition-all duration-500 text-foreground`}
                        >
                            Data Management
                        </h3>
                        <p
                            className={`leading-relaxed transition-all duration-500 text-muted-foreground`}
                        >
                            Upload and manage your company documents securely
                            with advanced file processing
                        </p>
                    </div>

                    <div
                        className={`group p-8 rounded-2xl border border-border/40 transition-all duration-500 hover:scale-105 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-border/60`}
                    >
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 bg-purple-transparent group-hover:bg-purple-transparent-hover`}
                        >
                            <svg
                                className="w-6 h-6 text-purple-accent"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <h3
                            className={`text-xl font-semibold mb-3 transition-all duration-500 text-foreground`}
                        >
                            Vector Search
                        </h3>
                        <p
                            className={`leading-relaxed transition-all duration-500 text-muted-foreground`}
                        >
                            Advanced semantic search powered by Pinecone for
                            accurate information retrieval
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

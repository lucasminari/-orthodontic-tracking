import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OrthoDontic - Sistema de Acompanhamento",
  description: "Sistema de acompanhamento para clínicas OrthoDontic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-900 text-white">
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦷</span>
              <h1 className="text-xl font-bold">OrthoDontic Tracking</h1>
            </div>
            <nav className="flex gap-6">
              <a href="/" className="hover:text-blue-400 transition">Home</a>
              <a href="/dashboard" className="hover:text-blue-400 transition">Dashboard</a>
              <a href="/attention" className="hover:text-blue-400 transition">Central de Atenção</a>
              <a href="/leads" className="hover:text-blue-400 transition">Leads</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-slate-800 border-t border-slate-700 px-6 py-4 text-center text-slate-400 text-sm">
          © 2026 OrthoDontic - Central do Sorriso
        </footer>
      </body>
    </html>
  );
}

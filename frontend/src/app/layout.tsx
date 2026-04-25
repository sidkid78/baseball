import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/navbar";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Dugout Treasures — Curated Baseball Cards",
  description: "A curated collection of rare and classic baseball cards for discerning collectors. Mint conditions, legendary players, authenticated provenance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className="flex flex-col min-h-full bg-background text-foreground font-sans antialiased">
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-3 focus:left-4 focus:top-4 focus:bg-[#c9a84c] focus:text-black focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <NavBar />
            <main
              id="main-content"
              className="flex-1 w-full"
            >
              {children}
            </main>

            {/* ── FOOTER ─────────────────────────────────────────── */}
            <footer className="relative w-full border-t border-[rgba(201,168,76,0.2)] bg-[#0a0906]">
              {/* Gold top rule */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-60" />

              <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Brand */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚾</span>
                  <div>
                    <p className="font-serif text-[#c9a84c] font-semibold text-base leading-tight">Dugout Treasures</p>
                    <p className="text-xs text-[#7a6e58] mt-0.5">Curated Baseball Card Collection</p>
                  </div>
                </div>

                {/* Center note */}
                <p className="text-xs text-[#5a5040] text-center">
                  All cards sold as described. Inquire for authentication details.<br />
                  Prices subject to change without notice.
                </p>

                {/* Copyright */}
                <p className="text-xs text-[#5a5040]">
                  © {new Date().getFullYear()} Dugout Treasures. All rights reserved.
                </p>
              </div>
            </footer>
          </NuqsAdapter>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

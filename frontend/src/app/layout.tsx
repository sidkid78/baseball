import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google"; // Assuming default Tailwind sans-serif font for now as per instructions.md typical setup.
import "./globals.css";
// import "next-usequerystate/app"; // Import for nuqs App Router adapter - REMOVED
import { NavBar } from "@/components/navbar"; // Import NavBar
import { NuqsAdapter } from 'nuqs/adapters/next/app'; // Import NuqsAdapter
import { ThemeProvider } from "next-themes"; // Import ThemeProvider

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Heritage Cardboard", // Updated metadata
  description: "Curated baseball card collection for sale and inquiry.", // Updated metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <body className="flex flex-col min-h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-3 focus:left-4 focus:top-4 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <NavBar />
            <main
              id="main-content"
              className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              {children}
            </main>
            <footer className="w-full border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                &copy; {new Date().getFullYear()} Heritage Cardboard. All rights reserved.
              </p>
            </footer>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}

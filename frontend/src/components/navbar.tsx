"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, useEffect } from "react";

const navLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/cards", label: "The Vault" },
  { href: "/contact", label: "Inquire" },
  { href: "/about", label: "About" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[rgba(10,9,6,0.92)] backdrop-blur-md border-b border-[rgba(201,168,76,0.2)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* Gold top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-40" />

      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 h-16"
        aria-label="Main navigation"
      >
        {/* ── Logo ─────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Dugout Treasures — Home"
        >
          <span
            className="text-2xl transition-transform duration-300 group-hover:scale-110"
            role="img"
            aria-label="Baseball"
          >
            ⚾
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[#c9a84c] font-semibold text-base tracking-wide">
              Dugout
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#7a6e58] font-medium">
              Treasures
            </span>
          </div>
        </Link>

        {/* ── Desktop nav ──────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 nav-underline",
                  isActive
                    ? "text-[#c9a84c] active"
                    : "text-[#9a8e72] hover:text-[#e0d9c4]"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* CTA button */}
          <Link
            href="/contact"
            className="ml-4 px-4 py-2 text-sm font-semibold rounded border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all duration-200 tracking-wide"
          >
            Make Offer
          </Link>
        </div>

        {/* ── Mobile menu ──────────────────────────────── */}
        <div className="md:hidden">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button
                aria-label="Open mobile menu"
                className="p-2 rounded text-[#9a8e72] hover:text-[#c9a84c] hover:bg-[rgba(201,168,76,0.1)] transition-colors"
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content
              align="end"
              sideOffset={12}
              className="min-w-[200px] bg-[#141210] border border-[rgba(201,168,76,0.25)] rounded-lg shadow-2xl z-50 py-2 overflow-hidden"
            >
              {/* Gold top accent */}
              <div className="h-px mx-4 mb-2 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent opacity-50" />

              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <DropdownMenu.Item key={link.href} asChild>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "text-[#c9a84c] bg-[rgba(201,168,76,0.1)]"
                          : "text-[#9a8e72] hover:text-[#e0d9c4] hover:bg-[rgba(255,255,255,0.04)]"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-[#c9a84c]" />
                      )}
                      {link.label}
                    </Link>
                  </DropdownMenu.Item>
                );
              })}

              <div className="h-px mx-4 mt-2 mb-1 bg-[rgba(201,168,76,0.15)]" />
              <DropdownMenu.Item asChild>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center mx-3 my-1 px-4 py-2.5 text-sm font-semibold rounded border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all"
                >
                  Make an Offer
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </nav>
    </header>
  );
}

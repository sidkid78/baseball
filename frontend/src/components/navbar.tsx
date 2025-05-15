"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

// You might have this util already via shadcn
function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-blue-400",
        isActive
          ? "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900"
          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/cards", label: "Browse Cards" },
    { href: "/contact", label: "Contact / Buy" },
    { href: "/about", label: "About" }, // Added the About link
  ];

  return (
    <header className="w-full sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16"
        aria-label="Main navigation"
      >
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center font-extrabold text-lg text-blue-700 dark:text-blue-300 tracking-wide pr-2">
          {/* You can put a logo img/svg instead */}
          <span aria-label="Baseball Icon" className="mr-2 text-xl" role="img">
            ⚾
          </span>
          {/* Replace with your name/brand */}
          <span>Dugout Treasures</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-2 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              isActive={
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href)
              }
            >
              {link.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Open mobile menu"
                className="focus-visible:ring-2 ml-2"
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="min-w-[180px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg z-50 py-1"
            >
              {navLinks.map((link) => (
                <DropdownMenu.Item key={link.href} asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-blue-400",
                      (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                        ? "text-blue-700 bg-blue-100 dark:text-blue-300 dark:bg-blue-900"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                    )}
                    aria-current={
                      (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                        ? "page"
                        : undefined
                    }
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </nav>
    </header>
  );
}

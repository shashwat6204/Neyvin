"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

interface MobileNavItemProps {
  href: string;
  children: React.ReactNode;
}

const MobileNavItem = ({ href, children }: MobileNavItemProps) => (
  <li>
    <Link
      href={href}
      className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
    >
      {children}
    </Link>
  </li>
);

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-md"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[300px] flex-col justify-between sm:w-[400px] overflow-y-auto"
        >
          <div>
            <SheetHeader className="mb-4">
              <SheetTitle className="text-center">Menu</SheetTitle>
            </SheetHeader>
            <nav className="space-y-1" aria-label="Mobile menu">
              <ul>
                <MobileNavItem href="/">Home</MobileNavItem>
                <MobileNavItem href="/services">Services</MobileNavItem>
                <MobileNavItem href="/careers">Careers</MobileNavItem>
                <MobileNavItem href="/about">About</MobileNavItem>
                <MobileNavItem href="/contact">Contact</MobileNavItem>
              </ul>
            </nav>
          </div>
          <div className="space-y-4 pb-6">
            {mounted && (
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                <span>Theme</span>
                {theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <MoonStar className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

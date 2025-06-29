"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#recetas", label: "Recetas" },
  { href: "#contacto", label: "Contacto" },
];

const Logo = () => (

  <Link href="/" className="hover:opacity-75 transition-opacity text-brand-foreground flex items-center gap-2">
    <div className="flex-shrink-0">
      {/* SVG Hoja verde */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 7 4 7 12C7 16 9 18 12 18C15 18 17 16 17 12C17 4 12 2 12 2Z" fill="#7A8751" />
        <path d="M12 18C12 18 8 16 8 12" stroke="#5C4A3B" strokeWidth="1" fill="none" />
      </svg>
    </div>
    <h1 className="text-2xl font-bold text-brand-foreground">
      Sabor nativo
    </h1>
  </Link>
);


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-brand-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-75 transition-opacity text-brand-foreground">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side icons & Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button asChild variant="ghost" size="icon" className="text-brand-green hover:bg-brand-green/10">
              <Link href="/cart"><ShoppingCart className="hover:opacity-75 transition-opacity text-brand-foreground" /></Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="text-brand-green hover:bg-brand-green/10">
              <Link href="/login"><User className="hover:opacity-75 transition-opacity text-brand-foreground" /></Link>
            </Button>
            <Button
              variant="ghost" size="icon" className="md:hidden text-brand-green"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-brand-border">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:opacity-75 transition-opacity text-brand-foreground" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
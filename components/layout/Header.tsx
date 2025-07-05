"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, ShoppingCart, User, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#recetas", label: "Recetas" },
  { href: "#contacto", label: "Contacto" },
]

const Logo = () => (
  <Link href="/" className="hover:opacity-75 transition-opacity flex items-center gap-2">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 7 4 7 12C7 16 9 18 12 18C15 18 17 16 17 12C17 4 12 2 12 2Z" fill="#7A8751" />
      <path d="M12 18C12 18 8 16 8 12" stroke="#5C4A3B" strokeWidth="1" fill="none" />
    </svg>
    <h1 className="text-2xl font-bold">Sabor Nativo</h1>
  </Link>
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCart()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-75 transition-opacity">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated && user ? (
              <>
                <span className="text-sm italic text-brand-foreground mr-2">
                  Hola, {user.nombre}
                </span>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Cerrar sesión">
                  <LogOut className="h-4 w-4 text-brand-foreground" />
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost" size="icon" className="hover:bg-brand-green/10">
                <Link href="/login"><User /></Link>
              </Button>
            )}
            
            <Button asChild variant="ghost" size="icon" className="hover:bg-brand-green/10 relative">
              <Link href="/cart">
                <ShoppingCart />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:opacity-75">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular autenticación
    setTimeout(() => {
      console.log("Login attempt:", { email, password })
      setIsLoading(false)
      // Redirigir a la página principal después del login
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F6F1EB" }}>
      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center mb-8 hover:opacity-75 transition-opacity"
          style={{ color: "#7A8751" }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="font-medium">Volver a la página principal</span>
        </Link>

        <Card className="shadow-xl border-0" style={{ backgroundColor: "white" }}>
          <CardHeader className="text-center pb-8">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <div className="mr-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C12 2 7 4 7 12C7 16 9 18 12 18C15 18 17 16 17 12C17 4 12 2 12 2Z" fill="#7A8751" />
                    <path d="M12 18C12 18 8 16 8 12" stroke="#5C4A3B" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold" style={{ color: "#5C4A3B" }}>
                    Sabor nativo
                  </CardTitle>
                </div>
              </div>
            </div>

            <CardDescription className="text-base" style={{ color: "#5C4A3B" }}>
              Inicia sesión para acceder a tu cuenta
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium" style={{ color: "#5C4A3B" }}>
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 border-2 rounded-lg focus:ring-2 transition-all"
                  style={{ borderColor: "#DAD5CE" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium" style={{ color: "#5C4A3B" }}>
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-2 rounded-lg focus:ring-2 transition-all pr-12"
                    style={{ borderColor: "#DAD5CE" }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: "#7A8751" }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-white font-semibold rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#7A8751" }}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm hover:underline transition-all" style={{ color: "#7A8751" }}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div className="mt-6 text-center">
              <span className="text-sm" style={{ color: "#5C4A3B" }}>
                ¿No tienes cuenta?{" "}
                <a href="/admin" className="font-semibold hover:underline transition-all" style={{ color: "#7A8751" }}>
                  Regístrate aquí
                </a>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Texto adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: "#5C4A3B" }}>
            Al iniciar sesión, aceptas nuestros{" "}
            <a href="#" className="underline" style={{ color: "#7A8751" }}>
              términos y condiciones
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebaseConfig"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const usersRef = collection(db, "Users")
      const q = query(usersRef, where("correo", "==", email), where("contraseña", "==", password))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data()
        localStorage.setItem("user", JSON.stringify(userData))
        alert("Inicio de sesión exitoso")
        router.push("/")
      } else {
        alert("Credenciales incorrectas")
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      alert("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F6F1EB" }}>
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center mb-8 hover:opacity-75 transition-opacity" style={{ color: "#7A8751" }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="font-medium">Volver a la página principal</span>
        </Link>

        <Card className="shadow-xl border-0" style={{ backgroundColor: "white" }}>
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <div className="mr-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C12 2 7 4 7 12C7 16 9 18 12 18C15 18 17 16 17 12C17 4 12 2 12 2Z" fill="#7A8751" />
                    <path d="M12 18C12 18 8 16 8 12" stroke="#5C4A3B" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold" style={{ color: "#5C4A3B" }}>Sabor nativo</CardTitle>
              </div>
            </div>
            <CardDescription className="text-base" style={{ color: "#5C4A3B" }}>
              Inicia sesión para acceder a tu cuenta
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: "#5C4A3B" }}>Correo electrónico</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" style={{ color: "#5C4A3B" }}>Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-12"
                  />
                  <Button type="button" variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)} style={{ color: "#7A8751" }}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-12 text-white font-semibold rounded-lg" style={{ backgroundColor: "#7A8751" }}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-sm" style={{ color: "#5C4A3B" }}>
                ¿No tienes cuenta?{" "}
                <a href="/createUser" className="font-semibold hover:underline" style={{ color: "#7A8751" }}>
                  Regístrate aquí
                </a>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

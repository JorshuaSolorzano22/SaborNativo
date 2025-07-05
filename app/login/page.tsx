"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  authenticateUserFromFirestore,
  createUserInFirestore,
} from "../admin/data"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  /* ----------------------- Estados ----------------------- */
  // Login
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Registro
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")

  // Comunes
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  /* ----------------------- Auth & Router ----------------------- */
  const { isAuthenticated, user, login } = useAuth()
  const router = useRouter()

  /* Redirección automática si ya está autenticado */
  useEffect(() => {
    if (isAuthenticated && user) {
      const email = (user.correo || "").toLowerCase()
      if (email.endsWith("@admin")) {
        router.push("/admin")
      } else {
        router.push("/")
      }
    }
  }, [isAuthenticated, user, router])

  /* ----------------------- Handlers ----------------------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await authenticateUserFromFirestore(
        loginEmail.trim().toLowerCase(),
        loginPassword
      )

      if (result.success && result.user) {
        login(result.user) // guarda usuario en contexto

        // Redirige según el correo
        if (result.user.correo.toLowerCase().endsWith("@admin")) {
          router.push("/admin")
        } else {
          router.push("/")
        }
      } else {
        setError(result.error || "Error de autenticación")
      }
    } catch (err) {
      console.error("❌ Error en login:", err)
      setError("Error de conexión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccessMessage("")

    // Validaciones
    if (!nombre.trim() || !apellidos.trim() || !correo.trim() || !contrasena.trim()) {
      setError("Todos los campos obligatorios deben completarse")
      setIsLoading(false)
      return
    }
    if (contrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      setError("Ingresa un email válido")
      setIsLoading(false)
      return
    }

    try {
      const result = await createUserInFirestore({
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        correo: correo.trim().toLowerCase(),
        telefono: telefono.trim(),
        contraseña: contrasena,
      })

      if (result.success) {
        setSuccessMessage(
          "✅ Usuario creado exitosamente. Ya puedes iniciar sesión."
        )
        // Limpiar formulario
        setNombre("")
        setApellidos("")
        setTelefono("")
        setCorreo("")
        setContrasena("")
      } else {
        setError(result.error || "Error al crear usuario")
      }
    } catch (err: any) {
      console.error("❌ Error en registro:", err)
      if (err.code === "permission-denied") {
        setError("No tienes permisos para crear usuarios.")
      } else if (err.code === "network-request-failed") {
        setError("Error de conexión. Verifica tu internet.")
      } else if (err.message) {
        setError(`Error: ${err.message}`)
      } else {
        setError("Error desconocido al crear usuario")
      }
    } finally {
      setIsLoading(false)
    }
  }

  /* ----------------------- UI ----------------------- */
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F6F1EB" }}
    >
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center mb-8 hover:opacity-75 transition-opacity"
          style={{ color: "#7A8751" }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="font-medium">Volver a la página principal</span>
        </Link>

        <Card className="shadow-xl border-0" style={{ backgroundColor: "white" }}>
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <div className="mr-3">
                  {/* Logo simplificado */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C12 2 7 4 7 12C7 16 9 18 12 18C15 18 17 16 17 12C17 4 12 2 12 2Z"
                      fill="#7A8751"
                    />
                    <path
                      d="M12 18C12 18 8 16 8 12"
                      stroke="#5C4A3B"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
                <CardTitle
                  className="text-2xl font-bold"
                  style={{ color: "#5C4A3B" }}
                >
                  Sabor nativo
                </CardTitle>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>

              {/* ----------- LOGIN ----------- */}
              <TabsContent value="login" className="space-y-4">
                <CardDescription
                  className="text-center text-base"
                  style={{ color: "#5C4A3B" }}
                >
                  Inicia sesión para acceder a tu cuenta
                </CardDescription>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-600 text-sm">{successMessage}</p>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" style={{ color: "#5C4A3B" }}>
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" style={{ color: "#5C4A3B" }}>
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        style={{ color: "#7A8751" }}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-white font-semibold rounded-lg"
                    style={{ backgroundColor: "#7A8751" }}
                  >
                    {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>
              </TabsContent>

              {/* ----------- REGISTRO ----------- */}
              <TabsContent value="register" className="space-y-4">
                <CardDescription
                  className="text-center text-base"
                  style={{ color: "#5C4A3B" }}
                >
                  Crea una nueva cuenta para realizar pedidos
                </CardDescription>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-600 text-sm">{successMessage}</p>
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" style={{ color: "#5C4A3B" }}>
                      Nombre
                    </Label>
                    <Input
                      id="nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellidos" style={{ color: "#5C4A3B" }}>
                      Apellidos
                    </Label>
                    <Input
                      id="apellidos"
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono" style={{ color: "#5C4A3B" }}>
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="8888-8888"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correo" style={{ color: "#5C4A3B" }}>
                      Correo electrónico
                    </Label>
                    <Input
                      id="correo"
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contrasena" style={{ color: "#5C4A3B" }}>
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="contrasena"
                        type={showPassword ? "text" : "password"}
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pr-12"
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        style={{ color: "#7A8751" }}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-white font-semibold rounded-lg"
                    style={{ backgroundColor: "#7A8751" }}
                  >
                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AuthCard from "./AuthCard"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { useAuthForms } from "./useAuthForms"
import { authenticateUserFromFirestore, createUserInFirestore } from "../admin/data"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const f = useAuthForms()
  const { isAuthenticated, login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirige si ya está autenticado (pero espera a saber si es admin o no)
    if (isAuthenticated && user?.correo) {
      if (user.correo.endsWith("@admin.com")) {
        router.push("/admin")
      } else {
        router.push("/")
      }
    }
  }, [isAuthenticated, user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    f.setIsLoading(true)
    f.setError("")
    const r = await authenticateUserFromFirestore(f.loginEmail, f.loginPassword)

    if (r.success && r.user) {
      login(r.user)

      // Redirigir dependiendo del correo
      if (r.user.correo?.endsWith("@admin.com")) {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } else {
      f.setError(r.error || "Error de autenticación")
    }
    f.setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const errMsg = f.validateRegister()
    if (errMsg) {
      f.setError(errMsg)
      return
    }

    f.setIsLoading(true)
    const r = await createUserInFirestore({
      nombre: f.nombre.trim(),
      apellidos: f.apellidos.trim(),
      correo: f.correo.trim().toLowerCase(),
      telefono: f.telefono.trim(),
      contraseña: f.contrasena,
    })

    if (r.success) {
      f.setSuccessMessage("✅ Cuenta creada. Inicia sesión.")
      f.setNombre(""); f.setApellidos(""); f.setTelefono(""); f.setCorreo(""); f.setContrasena("")
      f.setError("")
    } else {
      f.setError(r.error || "Error al crear usuario")
      f.setSuccessMessage("")
    }
    f.setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#F6F1EB" }}>
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center mb-6" style={{ color: "#7A8751" }}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Link>

        <AuthCard
          header={<h2 className="text-2xl font-bold" style={{ color: "#5C4A3B" }}>Sabor nativo</h2>}
        >
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {f.error && <p className="text-red-600 text-sm mb-2">{f.error}</p>}
              {f.successMessage && <p className="text-green-600 text-sm mb-2">{f.successMessage}</p>}
              <LoginForm
                email={f.loginEmail} setEmail={f.setLoginEmail}
                password={f.loginPassword} setPassword={f.setLoginPassword}
                show={f.showPassword} toggleShow={() => f.setShowPassword(!f.showPassword)}
                isLoading={f.isLoading}
                onSubmit={handleLogin}
              />
            </TabsContent>

            <TabsContent value="register">
              {f.error && <p className="text-red-600 text-sm mb-2">{f.error}</p>}
              {f.successMessage && <p className="text-green-600 text-sm mb-2">{f.successMessage}</p>}
              <RegisterForm
                nombre={f.nombre} setNombre={f.setNombre}
                apellidos={f.apellidos} setApellidos={f.setApellidos}
                telefono={f.telefono} setTelefono={f.setTelefono}
                correo={f.correo} setCorreo={f.setCorreo}
                contrasena={f.contrasena} setContrasena={f.setContrasena}
                show={f.showPassword} toggleShow={() => f.setShowPassword(!f.showPassword)}
                isLoading={f.isLoading}
                onSubmit={handleRegister}
              />
            </TabsContent>
          </Tabs>
        </AuthCard>
      </div>
    </div>
  )
}

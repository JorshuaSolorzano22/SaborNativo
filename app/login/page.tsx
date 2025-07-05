"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AuthCard from "./AuthCard"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { useAuthForms } from "./useAuthForms"
import { authenticateUserFromFirestore, createUserInFirestore, isAdminUser } from "../admin/data"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const f = useAuthForms()
  const { isAuthenticated, login, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirige si ya está autenticado
    if (isAuthenticated && user?.correo) {
      const isAdmin = isAdminUser(user.correo)
      console.log("🔍 Usuario autenticado detectado:", user.correo, isAdmin ? "(ADMIN)" : "(USER)")
      
      if (isAdmin) {
        console.log("🔄 Redirigiendo a admin...")
        router.push("/admin")
      } else {
        console.log("🔄 Redirigiendo a página principal...")
        router.push("/")
      }
    }
  }, [isAuthenticated, user, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    f.setIsLoading(true)
    f.setError("")
    
    console.log("🔍 Intentando login con:", f.loginEmail)
    const r = await authenticateUserFromFirestore(f.loginEmail, f.loginPassword)

    if (r.success && r.user) {
      console.log("✅ Login exitoso para:", r.user.correo)
      login(r.user)

      // Redirigir dependiendo del tipo de usuario
      const isAdmin = isAdminUser(r.user.correo)
      if (isAdmin) {
        console.log("🔄 Usuario admin detectado, redirigiendo a /admin")
        router.push("/admin")
      } else {
        console.log("🔄 Usuario normal detectado, redirigiendo a /")
        router.push("/")
      }
    } else {
      console.log("❌ Login fallido:", r.error)
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

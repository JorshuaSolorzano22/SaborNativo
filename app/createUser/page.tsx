"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig";


export default function CreateUserPage() {
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await addDoc(collection(db, "Users"), {
        nombre,
        apellidos,
        telefono,
        correo,
        contraseña: contrasena,
      })
      alert("Usuario creado correctamente")
      router.push("/login")
    } catch (error) {
      console.error("Error al crear el usuario:", error)
      alert("Error al crear el usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#F6F1EB" }}>
      <div className="w-full max-w-md">
        {/* Botón volver */}
        <Link href="/login" className="inline-flex items-center mb-8 hover:opacity-75 transition-opacity" style={{ color: "#7A8751" }}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="font-medium">Volver al login</span>
        </Link>

        <Card className="shadow-xl border-0" style={{ backgroundColor: "white" }}>
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold" style={{ color: "#5C4A3B" }}>
              Crear cuenta
            </CardTitle>
            <CardDescription className="text-base" style={{ color: "#5C4A3B" }}>
              Llena los siguientes campos
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre" style={{ color: "#5C4A3B" }}>Escribe tu nombre</Label>
                <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="h-12 border-2 rounded-lg" style={{ borderColor: "#DAD5CE" }} />
              </div>
              <div>
                <Label htmlFor="apellidos" style={{ color: "#5C4A3B" }}>Escribe tus apellidos</Label>
                <Input id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required className="h-12 border-2 rounded-lg" style={{ borderColor: "#DAD5CE" }} />
              </div>
              <div>
                <Label htmlFor="telefono" style={{ color: "#5C4A3B" }}>Escribe tu teléfono</Label>
                <Input id="telefono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required className="h-12 border-2 rounded-lg" style={{ borderColor: "#DAD5CE" }} />
              </div>
              <div>
                <Label htmlFor="correo" style={{ color: "#5C4A3B" }}>Escribe tu correo</Label>
                <Input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required className="h-12 border-2 rounded-lg" style={{ borderColor: "#DAD5CE" }} />
              </div>
              <div>
                <Label htmlFor="contrasena" style={{ color: "#5C4A3B" }}>Escribe tu contraseña</Label>
                <Input id="contrasena" type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required className="h-12 border-2 rounded-lg" style={{ borderColor: "#DAD5CE" }} />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-12 text-white font-semibold rounded-lg transition-all" style={{ backgroundColor: "#7A8751" }}>
                {isLoading ? "Guardando..." : "Guardar usuario"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

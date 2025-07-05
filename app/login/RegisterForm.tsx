import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

type Props = {
  nombre: string
  setNombre: (v: string) => void
  apellidos: string
  setApellidos: (v: string) => void
  telefono: string
  setTelefono: (v: string) => void
  correo: string
  setCorreo: (v: string) => void
  contrasena: string
  setContrasena: (v: string) => void
  show: boolean
  toggleShow: () => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent) => void
}

export default function RegisterForm({
  nombre, setNombre,
  apellidos, setApellidos,
  telefono, setTelefono,
  correo, setCorreo,
  contrasena, setContrasena,
  show, toggleShow,
  isLoading,
  onSubmit
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apellidos">Apellidos</Label>
        <Input id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Teléfono</Label>
        <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="correo">Correo electrónico</Label>
        <Input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required disabled={isLoading} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contrasena">Contraseña</Label>
        <div className="relative">
          <Input
            id="contrasena"
            type={show ? "text" : "password"}
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
            onClick={toggleShow}
            disabled={isLoading}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 text-white"
        style={{ backgroundColor: "#7A8751" }}
      >
        {isLoading ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
    </form>
  )
}

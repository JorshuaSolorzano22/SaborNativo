import { useState } from "react"

export function useAuthForms() {
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const validateRegister = () => {
    if (!nombre.trim() || !apellidos.trim() || !correo.trim() || !contrasena.trim())
      return "Todos los campos obligatorios deben completarse"
    if (contrasena.length < 6) return "La contraseña debe tener al menos 6 caracteres"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) return "Ingresa un email válido"
    return ""
  }

  return {
    loginEmail, setLoginEmail,
    loginPassword, setLoginPassword,
    nombre, setNombre,
    apellidos, setApellidos,
    telefono, setTelefono,
    correo, setCorreo,
    contrasena, setContrasena,
    showPassword, setShowPassword,
    isLoading, setIsLoading,
    error, setError,
    successMessage, setSuccessMessage,
    validateRegister,
  }
}

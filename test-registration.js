// Archivo de prueba para debuggear el registro de usuarios
import { createUserInFirestore } from "./app/admin/data"

// Función para probar el registro
export const testUserRegistration = async () => {
  console.log("🧪 Iniciando prueba de registro de usuario...")
  
  const testUser = {
    nombre: "Juan",
    apellidos: "Pérez",
    correo: "juan.test@example.com",
    telefono: "8888-8888",
    contraseña: "123456"
  }
  
  try {
    const result = await createUserInFirestore(testUser)
    console.log("🧪 Resultado de la prueba:", result)
    return result
  } catch (error) {
    console.error("🧪 Error en la prueba:", error)
    return { success: false, error: error.message }
  }
}

// Para ejecutar desde consola del navegador:
// import { testUserRegistration } from './test-registration.js'
// testUserRegistration().then(console.log)

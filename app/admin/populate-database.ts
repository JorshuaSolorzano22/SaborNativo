// Este es un script de ejemplo para poblar tu base de datos de Firebase
// Puedes ejecutarlo una vez para crear datos de prueba

import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebaseConfig"

// Datos de ejemplo para probar el sistema
const sampleOrders = [
  {
    cliente: "María González",
    estadoPedido: "Pendiente de realizar",
    estadoFacturacion: "Pendiente de pago",
    fecha: serverTimestamp(),
    notasEntrega: "Entregar antes de las 2 PM",
    totalPedido: 48000,
    productos: [
      {
        idProducto: "prod_001",
        nombre: "Empanadas de carne",
        cantidad: 12,
        precioUnitario: 2500
      },
      {
        idProducto: "prod_002", 
        nombre: "Tamales",
        cantidad: 6,
        precioUnitario: 3000
      }
    ]
  },
  {
    cliente: "Carlos Rodríguez",
    estadoPedido: "Completado",
    estadoFacturacion: "Pagado",
    fecha: serverTimestamp(),
    notasEntrega: "Cliente prefiere entrega en la mañana",
    totalPedido: 19000,
    productos: [
      {
        idProducto: "prod_003",
        nombre: "Arepas rellenas",
        cantidad: 8,
        precioUnitario: 2000
      },
      {
        idProducto: "prod_004",
        nombre: "Chicha morada",
        cantidad: 2,
        precioUnitario: 1500
      }
    ]
  },
  {
    cliente: "Ana Martínez",
    estadoPedido: "Entregado",
    estadoFacturacion: "Pagado",
    fecha: serverTimestamp(),
    notasEntrega: "Entregar en oficina, piso 3",
    totalPedido: 22500,
    productos: [
      {
        idProducto: "prod_005",
        nombre: "Sancocho",
        cantidad: 1,
        precioUnitario: 15000
      },
      {
        idProducto: "prod_006",
        nombre: "Yuca frita",
        cantidad: 3,
        precioUnitario: 2500
      }
    ]
  }
]

// Función para poblar la base de datos
export const populateDatabase = async () => {
  try {
    console.log("Iniciando poblado de base de datos...")
    
    const ordersCollection = collection(db, "pedido")
    
    for (const order of sampleOrders) {
      const docRef = await addDoc(ordersCollection, order)
      console.log("Pedido creado con ID:", docRef.id)
    }
    
    console.log("✅ Base de datos poblada exitosamente!")
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error)
  }
}

// Para ejecutar: Descomenta la línea siguiente y ejecuta el script una vez
// populateDatabase()

// INSTRUCCIONES:
// 1. Asegúrate de que tu configuración de Firebase esté correcta
// 2. Descomenta la línea de arriba (populateDatabase())
// 3. Ejecuta este archivo una vez para crear los datos de ejemplo
// 4. Comenta la línea nuevamente para evitar duplicados
// 5. Verifica en tu consola de Firebase que los datos se crearon correctamente

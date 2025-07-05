import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, query, where } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { Order, ProductIngredients, Ingredient } from "./types"

// Función auxiliar para formatear fechas de Firebase
export const formatFirebaseDate = (timestamp: any): string => {
  if (!timestamp) return "Sin fecha"
  
  try {
    let date: Date
    
    if (timestamp.toDate) {
      // Es un Timestamp de Firebase
      date = timestamp.toDate()
    } else if (timestamp.seconds) {
      // Es un objeto con segundos
      date = new Date(timestamp.seconds * 1000)
    } else {
      // Es una fecha normal
      date = new Date(timestamp)
    }
    
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Fecha inválida"
  }
}

// Función para cargar pedidos desde Firebase
export const loadOrdersFromFirebase = async (): Promise<Order[]> => {
  try {
    const ordersCollection = collection(db, "pedido")
    const ordersSnapshot = await getDocs(ordersCollection)
    
    const orders: Order[] = ordersSnapshot.docs.map(doc => {
      const data = doc.data()
      
      // Transformar los productos de Firebase al formato esperado
      const products = data.productos?.map((producto: any) => ({
        name: producto.nombre,
        quantity: producto.cantidad,
        price: producto.precioUnitario
      })) || []
      
      // Calcular el total si no está disponible
      const total = data.totalPedido || products.reduce((sum: number, product: any) => 
        sum + (product.price * product.quantity), 0
      )
      
      return {
        id: doc.id,
        client: data.cliente,
        status: data.estadoPedido,
        paymentStatus: data.estadoFacturacion,
        products: products,
        deliveryNotes: data.notasEntrega || "",
        total: total,
        fecha: data.fecha
      }
    })
    
    // Ordenar por fecha más reciente primero
    return orders.sort((a, b) => {
      if (!a.fecha && !b.fecha) return 0
      if (!a.fecha) return 1
      if (!b.fecha) return -1
      
      try {
        const dateA = a.fecha.toDate ? a.fecha.toDate() : new Date(a.fecha)
        const dateB = b.fecha.toDate ? b.fecha.toDate() : new Date(b.fecha)
        return dateB.getTime() - dateA.getTime()
      } catch {
        return 0
      }
    })
  } catch (error) {
    console.error("Error al cargar pedidos desde Firebase:", error)
    return []
  }
}

// Función para actualizar un pedido en Firebase
export const updateOrderInFirebase = async (orderId: string, updateData: Partial<any>) => {
  try {
    const orderRef = doc(db, "pedido", orderId)
    await updateDoc(orderRef, updateData)
    return true
  } catch (error) {
    console.error("Error al actualizar pedido:", error)
    return false
  }
}

// Función para actualizar los productos de un pedido en Firebase
export const updateOrderProductsInFirebase = async (orderId: string, products: any[], newTotal: number) => {
  try {
    const orderRef = doc(db, "pedido", orderId)
    
    // Transformar productos al formato de Firebase
    const firebaseProducts = products.map(product => ({
      idProducto: product.id || '',
      nombre: product.name,
      cantidad: product.quantity,
      precioUnitario: product.price
    }))
    
    await updateDoc(orderRef, {
      productos: firebaseProducts,
      totalPedido: newTotal
    })
    
    return true
  } catch (error) {
    console.error("Error al actualizar productos del pedido:", error)
    return false
  }
}

// Función para eliminar un pedido de Firebase
export const deleteOrderFromFirebase = async (orderId: string) => {
  try {
    const orderRef = doc(db, "pedido", orderId)
    await deleteDoc(orderRef)
    return true
  } catch (error) {
    console.error("Error al eliminar pedido:", error)
    return false
  }
}

// Función para cargar todos los ingredientes desde Firebase
export const loadIngredientsFromFirebase = async (): Promise<Ingredient[]> => {
  try {
    const ingredientsCollection = collection(db, "ingrediente")
    const ingredientsSnapshot = await getDocs(ingredientsCollection)
    
    const ingredients: Ingredient[] = ingredientsSnapshot.docs.map(doc => {
      const data = doc.data()
      
      return {
        name: data.nombre,
        quantity: 0, // Cantidad inicial en 0 para entrada manual
        unit: data.medida,
        cost: data.precio
      }
    })
    
    // Ordenar alfabéticamente por nombre
    return ingredients.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error("Error al cargar ingredientes desde Firebase:", error)
    return []
  }
}

// Función para crear un nuevo pedido en Firebase
export const createOrderInFirebase = async (orderData: {
  cliente: string;
  productos: Array<{
    idProducto: string;
    nombre: string;
    cantidad: number;
    precioUnitario: number;
  }>;
  totalPedido: number;
  estadoPedido: string;
  estadoFacturacion: string;
  notasEntrega: string;
  metodoPago: string;
}) => {
  try {
    const ordersCollection = collection(db, "pedido")
    
    const newOrder = {
      ...orderData,
      fecha: new Date(), // Timestamp actual
    }
    
    const docRef = await addDoc(ordersCollection, newOrder)
    console.log("Pedido creado con ID:", docRef.id)
    return { success: true, orderId: docRef.id }
  } catch (error) {
    console.error("Error al crear pedido:", error)
    return { success: false, error: error }
  }
}

// Función para autenticar usuario desde la colección Users
export const authenticateUserFromFirestore = async (email: string, password: string) => {
  try {
    console.log("🔍 Intentando autenticar usuario:", email)
    const usersCollection = collection(db, "Users")
    const usersSnapshot = await getDocs(usersCollection)
    console.log("📊 Documentos encontrados:", usersSnapshot.docs.length)
    
    // Buscar usuario por email y contraseña
    const userDoc = usersSnapshot.docs.find(doc => {
      const data = doc.data()
      console.log("🔍 Verificando usuario:", data.correo, "contraseña:", data.contraseña ? "✓" : "✗")
      return data.correo === email && data.contraseña === password
    })
    
    if (userDoc) {
      const userData = userDoc.data()
      console.log("✅ Usuario encontrado:", userData.nombre, userData.apellidos)
      return {
        success: true,
        user: {
          id: userDoc.id,
          nombre: userData.nombre,
          apellidos: userData.apellidos,
          correo: userData.correo,
          telefono: userData.telefono || "",
          fullName: `${userData.nombre} ${userData.apellidos}`
        }
      }
    } else {
      console.log("❌ Usuario no encontrado con esas credenciales")
      return { success: false, error: "Credenciales incorrectas" }
    }
  } catch (error) {
    console.error("❌ Error al autenticar usuario:", error)
    return { success: false, error: "Error de conexión" }
  }
}

// Función para crear usuario en Firestore
export const createUserInFirestore = async (userData: {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono: string;
  contraseña: string;
}) => {
  try {
    console.log("🔍 Creando usuario:", userData.correo)
    
    // Validaciones básicas
    if (!userData.nombre || !userData.apellidos || !userData.correo || !userData.contraseña) {
      console.log("❌ Faltan campos obligatorios")
      return { success: false, error: "Todos los campos obligatorios deben estar completos" }
    }
    
    const usersCollection = collection(db, "Users")
    console.log("🔍 Obteniendo colección Users...")
    
    // Verificar si el email ya existe usando query
    const q = query(usersCollection, where("correo", "==", userData.correo))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      console.log("❌ El email ya existe en la base de datos")
      return { success: false, error: "El email ya está registrado" }
    }
    
    console.log("✅ Email disponible, creando usuario...")
    
    const newUserData = {
      nombre: userData.nombre.trim(),
      apellidos: userData.apellidos.trim(),
      correo: userData.correo.trim().toLowerCase(),
      telefono: userData.telefono.trim() || "",
      contraseña: userData.contraseña,
      fechaCreacion: new Date(),
      activo: true
    }
    
    const docRef = await addDoc(usersCollection, newUserData)
    
    console.log("✅ Usuario creado exitosamente con ID:", docRef.id)
    return { 
      success: true, 
      userId: docRef.id,
      message: "Usuario creado exitosamente"
    }
  } catch (error: any) {
    console.error("❌ Error detallado al crear usuario:", {
      message: error.message,
      code: error.code,
      details: error
    })
    
    // Retornar error más específico
    if (error.code === 'permission-denied') {
      return { success: false, error: "No tienes permisos para crear usuarios" }
    } else if (error.code === 'network-request-failed') {
      return { success: false, error: "Error de conexión a la base de datos" }
    } else {
      return { success: false, error: `Error al crear usuario: ${error.message}` }
    }
  }
}

export const statusColors = {
  Entregado: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Pendiente de realizar": "bg-amber-100 text-amber-800 border-amber-200",
  Cancelado: "bg-red-100 text-red-800 border-red-200",
  Completado: "bg-blue-100 text-blue-800 border-blue-200",
}

export const paymentColors = {
  Pagado: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Pendiente de pago": "bg-orange-100 text-orange-800 border-orange-200",
}

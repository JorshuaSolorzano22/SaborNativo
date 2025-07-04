import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"
import { Order, ProductIngredients } from "./types"

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


export const productIngredients: ProductIngredients = {
  "Empanadas de carne": [
    { name: "Harina de maíz", quantity: 500, unit: "g", cost: 2000 },
    { name: "Carne molida", quantity: 300, unit: "g", cost: 8000 },
    { name: "Cebolla", quantity: 1, unit: "unidad", cost: 500 },
    { name: "Aceite", quantity: 100, unit: "ml", cost: 800 },
  ],
  Tamales: [
    { name: "Masa de maíz", quantity: 400, unit: "g", cost: 3000 },
    { name: "Cerdo", quantity: 250, unit: "g", cost: 7000 },
    { name: "Hojas de plátano", quantity: 12, unit: "unidades", cost: 1500 },
    { name: "Sal", quantity: 10, unit: "g", cost: 100 },
  ],
  "Arepas rellenas": [
    { name: "Harina precocida", quantity: 300, unit: "g", cost: 1800 },
    { name: "Queso", quantity: 150, unit: "g", cost: 4000 },
    { name: "Pollo", quantity: 200, unit: "g", cost: 5000 },
    { name: "Aguacate", quantity: 1, unit: "unidad", cost: 2000 },
  ],
  "Chicha morada": [
    { name: "Maíz morado", quantity: 200, unit: "g", cost: 3000 },
    { name: "Piña", quantity: 100, unit: "g", cost: 1000 },
    { name: "Canela", quantity: 5, unit: "g", cost: 500 },
    { name: "Azúcar", quantity: 50, unit: "g", cost: 300 },
  ],
  Sancocho: [
    { name: "Carne de res", quantity: 400, unit: "g", cost: 12000 },
    { name: "Yuca", quantity: 300, unit: "g", cost: 2000 },
    { name: "Plátano verde", quantity: 2, unit: "unidades", cost: 1500 },
    { name: "Cilantro", quantity: 20, unit: "g", cost: 500 },
  ],
  "Yuca frita": [
    { name: "Yuca", quantity: 500, unit: "g", cost: 3000 },
    { name: "Aceite", quantity: 200, unit: "ml", cost: 1600 },
    { name: "Sal", quantity: 5, unit: "g", cost: 50 },
  ],
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

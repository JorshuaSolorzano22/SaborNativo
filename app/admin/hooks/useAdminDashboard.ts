import { useState, useEffect } from "react"
import { Order, OrderStatus, PaymentStatus, Ingredient } from "../types"
import { loadOrdersFromFirebase, updateOrderInFirebase, deleteOrderFromFirebase, updateOrderProductsInFirebase, loadIngredientsFromFirebase } from "../data"

export function useAdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [showIngredientsModal, setShowIngredientsModal] = useState(false)
  const [selectedOrderIngredients, setSelectedOrderIngredients] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  // Cargar pedidos e ingredientes al inicializar
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError("")
      try {
        const [firebaseOrders, firebaseIngredients] = await Promise.all([
          loadOrdersFromFirebase(),
          loadIngredientsFromFirebase()
        ])
        setOrders(firebaseOrders)
        setIngredients(firebaseIngredients)
      } catch (err) {
        setError("Error al cargar los datos")
        console.error("Error loading data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const toggleExpanded = (orderId: string) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    // Actualizar en Firebase
    const success = await updateOrderInFirebase(orderId, { estadoPedido: newStatus })
    
    if (success) {
      // Actualizar estado local
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    } else {
      setError("Error al actualizar el estado del pedido")
    }
  }

  const updatePaymentStatus = async (orderId: string, newStatus: PaymentStatus) => {
    // Actualizar en Firebase
    const success = await updateOrderInFirebase(orderId, { estadoFacturacion: newStatus })
    
    if (success) {
      // Actualizar estado local
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, paymentStatus: newStatus } : order)))
    } else {
      setError("Error al actualizar el estado de facturación")
    }
  }

  const finishOrder = async (orderId: string) => {
    // Eliminar de Firebase
    const success = await deleteOrderFromFirebase(orderId)
    
    if (success) {
      // Actualizar estado local
      setOrders(orders.filter((order) => order.id !== orderId))
    } else {
      setError("Error al finalizar el pedido")
    }
  }

  const updateProductQuantity = async (orderId: string, productIndex: number, newQuantity: number) => {
    if (newQuantity <= 0) return

    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedProducts = [...order.products]
        updatedProducts[productIndex] = { ...updatedProducts[productIndex], quantity: newQuantity }
        const newTotal = updatedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
        
        // Actualizar en Firebase
        updateOrderProductsInFirebase(orderId, updatedProducts, newTotal)
          .catch(err => {
            console.error("Error updating products in Firebase:", err)
            setError("Error al actualizar la cantidad del producto")
          })
        
        return { ...order, products: updatedProducts, total: newTotal }
      }
      return order
    })

    setOrders(updatedOrders)
  }

  const removeProduct = async (orderId: string, productIndex: number) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        const updatedProducts = order.products.filter((_, index: number) => index !== productIndex)
        const newTotal = updatedProducts.reduce((sum: number, product) => sum + product.price * product.quantity, 0)
        
        // Actualizar en Firebase
        updateOrderProductsInFirebase(orderId, updatedProducts, newTotal)
          .catch(err => {
            console.error("Error updating products in Firebase:", err)
            setError("Error al eliminar el producto")
          })
        
        return { ...order, products: updatedProducts, total: newTotal }
      }
      return order
    })

    setOrders(updatedOrders)
  }

  const refreshOrders = async () => {
    setIsLoading(true)
    setError("")
    try {
      const [firebaseOrders, firebaseIngredients] = await Promise.all([
        loadOrdersFromFirebase(),
        loadIngredientsFromFirebase()
      ])
      setOrders(firebaseOrders)
      setIngredients(firebaseIngredients)
    } catch (err) {
      setError("Error al cargar los datos")
      console.error("Error loading data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "pending") return order.status === "Pendiente de realizar"
    if (selectedFilter === "completed") return order.status === "Completado"
    if (selectedFilter === "delivered") return order.status === "Entregado"
    if (selectedFilter === "cancelled") return order.status === "Cancelado"
    if (selectedFilter === "unpaid") return order.paymentStatus === "Pendiente de pago"
    return true
  })

  return {
    orders: filteredOrders,
    ingredients,
    expandedOrders,
    editingOrder,
    showIngredientsModal,
    selectedOrderIngredients,
    isLoading,
    error,
    selectedFilter,
    setEditingOrder,
    setShowIngredientsModal,
    setSelectedOrderIngredients,
    setSelectedFilter,
    toggleExpanded,
    updateOrderStatus,
    updatePaymentStatus,
    finishOrder,
    updateProductQuantity,
    removeProduct,
    refreshOrders,
  }
}

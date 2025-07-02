import { useState } from "react"
import { Order, OrderStatus, PaymentStatus } from "../types"
import { mockOrders } from "../data"

export function useAdminDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [showIngredientsModal, setShowIngredientsModal] = useState(false)
  const [selectedOrderIngredients, setSelectedOrderIngredients] = useState<Order | null>(null)

  const toggleExpanded = (orderId: string) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const updatePaymentStatus = (orderId: string, newStatus: PaymentStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, paymentStatus: newStatus } : order)))
  }

  const finishOrder = (orderId: string) => {
    setOrders(orders.filter((order) => order.id !== orderId))
  }

  const updateProductQuantity = (orderId: string, productIndex: number, newQuantity: number) => {
    if (newQuantity <= 0) return

    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          const updatedProducts = [...order.products]
          updatedProducts[productIndex] = { ...updatedProducts[productIndex], quantity: newQuantity }
          const newTotal = updatedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
          return { ...order, products: updatedProducts, total: newTotal }
        }
        return order
      }),
    )
  }

  const removeProduct = (orderId: string, productIndex: number) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          const updatedProducts = order.products.filter((_, index: number) => index !== productIndex)
          const newTotal = updatedProducts.reduce((sum: number, product) => sum + product.price * product.quantity, 0)
          return { ...order, products: updatedProducts, total: newTotal }
        }
        return order
      }),
    )
  }

  return {
    orders,
    expandedOrders,
    editingOrder,
    showIngredientsModal,
    selectedOrderIngredients,
    setEditingOrder,
    setShowIngredientsModal,
    setSelectedOrderIngredients,
    toggleExpanded,
    updateOrderStatus,
    updatePaymentStatus,
    finishOrder,
    updateProductQuantity,
    removeProduct,
  }
}

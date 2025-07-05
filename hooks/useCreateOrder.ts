import { useState } from 'react'
import { createOrderInFirebase } from '../app/admin/data'
import { CartItem } from './useCart'

interface CreateOrderData {
  cliente: string
  productos: CartItem[]
  totalPedido: number
  notasEntrega: string
  metodoPago: string
}

export function useCreateOrder() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createOrder = async (orderData: CreateOrderData) => {
    try {
      setLoading(true)
      setError(null)

      // Transformar productos del carrito al formato de Firebase
      const firebaseProducts = orderData.productos.map(item => ({
        idProducto: item.id,
        nombre: item.nombre,
        cantidad: item.quantity,
        precioUnitario: item.precio
      }))

      // Mapear método de pago a formato legible
      const paymentMethodMap: { [key: string]: string } = {
        sinpe: 'SINPE móvil',
        transfer: 'Transferencia bancaria',
        cash: 'Efectivo'
      }

      const firebaseOrderData = {
        cliente: orderData.cliente,
        productos: firebaseProducts,
        totalPedido: orderData.totalPedido,
        estadoPedido: 'Pendiente de realizar',
        estadoFacturacion: 'Pendiente de pago',
        notasEntrega: orderData.notasEntrega,
        metodoPago: paymentMethodMap[orderData.metodoPago] || orderData.metodoPago
      }

      const result = await createOrderInFirebase(firebaseOrderData)

      if (result.success) {
        return { success: true, orderId: result.orderId }
      } else {
        throw new Error('Error al crear el pedido')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      setError(errorMessage)
      console.error('Error al crear pedido:', err)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    createOrder,
    loading,
    error,
    clearError: () => setError(null)
  }
}

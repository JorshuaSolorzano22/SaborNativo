export type OrderStatus = "Entregado" | "Pendiente de realizar" | "Cancelado" | "Completado"
export type PaymentStatus = "Pagado" | "Pendiente de pago"

export interface Product {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  client: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  products: Product[]
  deliveryNotes: string
  total: number
}

export interface Ingredient {
  name: string
  quantity: number
  unit: string
  cost: number
}

export interface ProductIngredients {
  [productName: string]: Ingredient[]
}

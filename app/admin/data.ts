import { Order, ProductIngredients } from "./types"

export const mockOrders: Order[] = [
  {
    id: "001",
    client: "María González",
    status: "Pendiente de realizar",
    paymentStatus: "Pendiente de pago",
    products: [
      { name: "Empanadas de carne", quantity: 12, price: 2500 },
      { name: "Tamales", quantity: 6, price: 3000 },
    ],
    deliveryNotes: "Entregar antes de las 2 PM",
    total: 48000,
  },
  {
    id: "002",
    client: "Carlos Rodríguez",
    status: "Completado",
    paymentStatus: "Pagado",
    products: [
      { name: "Arepas rellenas", quantity: 8, price: 2000 },
      { name: "Chicha morada", quantity: 2, price: 1500 },
    ],
    deliveryNotes: "Cliente prefiere entrega en la mañana",
    total: 19000,
  },
  {
    id: "003",
    client: "Ana Martínez",
    status: "Entregado",
    paymentStatus: "Pagado",
    products: [
      { name: "Sancocho", quantity: 1, price: 15000 },
      { name: "Yuca frita", quantity: 3, price: 2500 },
    ],
    deliveryNotes: "Entregar en oficina, piso 3",
    total: 22500,
  },
]

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

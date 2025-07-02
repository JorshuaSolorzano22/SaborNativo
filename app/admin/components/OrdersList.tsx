import OrderCard from "./OrderCard"
import { Order, OrderStatus, PaymentStatus } from "../types"

interface OrdersListProps {
  orders: Order[]
  expandedOrders: Set<string>
  onToggleExpanded: (orderId: string) => void
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void
  onUpdatePaymentStatus: (orderId: string, newStatus: PaymentStatus) => void
  onFinishOrder: (orderId: string) => void
  onUpdateProductQuantity: (orderId: string, productIndex: number, newQuantity: number) => void
  onRemoveProduct: (orderId: string, productIndex: number) => void
  onSetEditingOrder: (order: Order) => void
  onSetSelectedOrderIngredients: (order: Order) => void
  productIngredients: any
  showIngredientsModal: boolean
  onSetShowIngredientsModal: (show: boolean) => void
  selectedOrderIngredients: Order | null
}

export default function OrdersList({
  orders,
  expandedOrders,
  onToggleExpanded,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onFinishOrder,
  onUpdateProductQuantity,
  onRemoveProduct,
  onSetEditingOrder,
  onSetSelectedOrderIngredients,
  productIngredients,
  showIngredientsModal,
  onSetShowIngredientsModal,
  selectedOrderIngredients,
}: OrdersListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          isExpanded={expandedOrders.has(order.id)}
          onToggleExpanded={onToggleExpanded}
          onUpdateOrderStatus={onUpdateOrderStatus}
          onUpdatePaymentStatus={onUpdatePaymentStatus}
          onFinishOrder={onFinishOrder}
          onUpdateProductQuantity={onUpdateProductQuantity}
          onRemoveProduct={onRemoveProduct}
          onSetEditingOrder={onSetEditingOrder}
          onSetSelectedOrderIngredients={onSetSelectedOrderIngredients}
          productIngredients={productIngredients}
          showIngredientsModal={showIngredientsModal}
          onSetShowIngredientsModal={onSetShowIngredientsModal}
          selectedOrderIngredients={selectedOrderIngredients}
        />
      ))}
    </div>
  )
}

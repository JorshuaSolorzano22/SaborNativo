"use client"

import AdminHeader from "./components/AdminHeader"
import AdminFooter from "./components/AdminFooter"
import OrdersList from "./components/OrdersList"
import { productIngredients } from "./data"
import { useAdminDashboard } from "./hooks/useAdminDashboard"

export default function AdminDashboard() {
  const {
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
  } = useAdminDashboard()

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-stone-800 mb-2">Pedidos Actuales</h2>
          <p className="text-stone-600">Gestiona y supervisa todos los pedidos pendientes</p>
        </div>

        <OrdersList
          orders={orders}
          expandedOrders={expandedOrders}
          onToggleExpanded={toggleExpanded}
          onUpdateOrderStatus={updateOrderStatus}
          onUpdatePaymentStatus={updatePaymentStatus}
          onFinishOrder={finishOrder}
          onUpdateProductQuantity={updateProductQuantity}
          onRemoveProduct={removeProduct}
          onSetEditingOrder={setEditingOrder}
          onSetSelectedOrderIngredients={setSelectedOrderIngredients}
          productIngredients={productIngredients}
          showIngredientsModal={showIngredientsModal}
          onSetShowIngredientsModal={setShowIngredientsModal}
          selectedOrderIngredients={selectedOrderIngredients}
        />
      </main>

      <AdminFooter />
    </div>
  )
}

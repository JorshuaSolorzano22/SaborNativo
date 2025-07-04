"use client"

import AdminHeader from "./components/AdminHeader"
import AdminFooter from "./components/AdminFooter"
import OrdersList from "./components/OrdersList"
import { useAdminDashboard } from "./hooks/useAdminDashboard"

export default function AdminDashboard() {
  const {
    orders,
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
  } = useAdminDashboard()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-stone-600">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-stone-800 mb-2">Pedidos Actuales</h2>
            <p className="text-stone-600">Gestiona y supervisa todos los pedidos pendientes</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">Todos los pedidos</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completados</option>
              <option value="delivered">Entregados</option>
              <option value="cancelled">Cancelados</option>
              <option value="unpaid">Sin pagar</option>
            </select>
            <button
              onClick={refreshOrders}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              🔄 Actualizar
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

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
          allIngredients={ingredients}
          showIngredientsModal={showIngredientsModal}
          onSetShowIngredientsModal={setShowIngredientsModal}
          selectedOrderIngredients={selectedOrderIngredients}
        />
      </main>

      <AdminFooter />
    </div>
  )
}

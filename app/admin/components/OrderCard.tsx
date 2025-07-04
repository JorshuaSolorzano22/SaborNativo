import { ChevronDown, Edit, Calculator, Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Order, OrderStatus, PaymentStatus } from "../types"
import { statusColors, paymentColors, formatFirebaseDate } from "../data"
import EditOrderModal from "./EditOrderModal"
import IngredientsModal from "./IngredientsModal"

interface OrderCardProps {
  order: Order
  isExpanded: boolean
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

export default function OrderCard({
  order,
  isExpanded,
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
}: OrderCardProps) {
  return (
    <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow">
      <Collapsible open={isExpanded} onOpenChange={() => onToggleExpanded(order.id)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <div>
                <h3 className="font-medium text-stone-800">Pedido #{order.id}</h3>
                <p className="text-sm text-stone-600">{order.client}</p>
                {order.fecha && (
                  <div className="flex items-center space-x-1 text-xs text-stone-500 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatFirebaseDate(order.fecha)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={statusColors[order.status]}>{order.status}</Badge>
              <Badge className={paymentColors[order.paymentStatus]}>{order.paymentStatus}</Badge>
              <span className="font-semibold text-stone-800">${order.total.toLocaleString()}</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-stone-400 hover:text-stone-600"
                    onClick={() => onSetEditingOrder(order)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <EditOrderModal
                  order={order}
                  onUpdateProductQuantity={onUpdateProductQuantity}
                  onRemoveProduct={onRemoveProduct}
                />
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Estados editables */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-stone-700 mb-2 block">Estado del pedido</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        {order.status}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem onClick={() => onUpdateOrderStatus(order.id, "Entregado")}>
                        Entregado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateOrderStatus(order.id, "Pendiente de realizar")}>
                        Pendiente de realizar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateOrderStatus(order.id, "Cancelado")}>
                        Cancelado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdateOrderStatus(order.id, "Completado")}>
                        Completado
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <label className="text-sm font-medium text-stone-700 mb-2 block">Estado de facturación</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between bg-transparent">
                        {order.paymentStatus}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem onClick={() => onUpdatePaymentStatus(order.id, "Pagado")}>
                        Pagado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onUpdatePaymentStatus(order.id, "Pendiente de pago")}>
                        Pendiente de pago
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Productos y detalles */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-2">Productos solicitados</h4>
                  <div className="space-y-2">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-stone-600">
                          {product.name} x{product.quantity}
                        </span>
                        <span className="font-medium text-stone-800">
                          ${(product.price * product.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center font-medium">
                      <span>Total</span>
                      <span>${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-stone-700 mb-2">Notas de entrega</h4>
                  <p className="text-sm text-stone-600 bg-stone-50 p-3 rounded-md">{order.deliveryNotes}</p>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-stone-200">
              <Dialog open={showIngredientsModal} onOpenChange={onSetShowIngredientsModal}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-olive-200 text-olive-700 hover:bg-olive-50 bg-transparent"
                    onClick={() => onSetSelectedOrderIngredients(order)}
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    Agregar gastos
                  </Button>
                </DialogTrigger>
                <IngredientsModal order={selectedOrderIngredients} productIngredients={productIngredients} />
              </Dialog>
              <Button onClick={() => onFinishOrder(order.id)} className="bg-olive-600 hover:bg-olive-700 text-white">
                <Check className="h-4 w-4 mr-2" />
                Finalizar pedido
              </Button>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}

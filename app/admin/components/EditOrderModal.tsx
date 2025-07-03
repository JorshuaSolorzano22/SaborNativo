import { Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Order } from "../types"

interface EditOrderModalProps {
  order: Order
  onUpdateProductQuantity: (orderId: string, productIndex: number, newQuantity: number) => void
  onRemoveProduct: (orderId: string, productIndex: number) => void
}

export default function EditOrderModal({ order, onUpdateProductQuantity, onRemoveProduct }: EditOrderModalProps) {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-stone-800">Editar Pedido #{order.id}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="text-sm text-stone-600 mb-4">
          Cliente: <span className="font-medium text-stone-800">{order.client}</span>
        </div>

        <div className="space-y-3">
          <Label className="text-stone-700 font-medium">Productos del pedido</Label>
          {order.products.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-stone-800">{product.name}</p>
                <p className="text-sm text-stone-600">${product.price.toLocaleString()} c/u</p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateProductQuantity(order.id, index, product.quantity - 1)}
                    disabled={product.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <Input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      onUpdateProductQuantity(order.id, index, Number.parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center"
                    min="1"
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateProductQuantity(order.id, index, product.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="font-medium text-stone-800">
                    ${(product.price * product.quantity).toLocaleString()}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onRemoveProduct(order.id, index)}
                  disabled={order.products.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-stone-700">Total del pedido:</span>
            <span className="text-xl font-bold text-stone-800">${order.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

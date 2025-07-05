import { useState } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { Order, Ingredient, ProductIngredients } from "../types"

interface IngredientsModalProps {
  order: Order | null
  productIngredients: ProductIngredients
}

export default function IngredientsModal({ order, productIngredients }: IngredientsModalProps) {
  if (!order) return null

  // Estado para manejar las cantidades editables de ingredientes
  const [ingredientQuantities, setIngredientQuantities] = useState<{ [key: string]: number }>(() => {
    const initialQuantities: { [key: string]: number } = {}
    
    // Inicializar con las cantidades calculadas automáticamente
    order.products.forEach((product) => {
      const productIngs = productIngredients[product.name] || []
      productIngs.forEach((ingredient) => {
        const key = ingredient.name
        const totalQuantityNeeded = ingredient.quantity * product.quantity
        
        if (initialQuantities[key]) {
          initialQuantities[key] += totalQuantityNeeded
        } else {
          initialQuantities[key] = totalQuantityNeeded
        }
      })
    })
    
    return initialQuantities
  })

  const getOrderIngredients = () => {
    const ingredientsMap: { [key: string]: Ingredient & { totalQuantity: number; totalCost: number } } = {}

    order.products.forEach((product) => {
      const productIngs = productIngredients[product.name] || []
      productIngs.forEach((ingredient) => {
        const key = ingredient.name
        
        if (!ingredientsMap[key]) {
          ingredientsMap[key] = {
            ...ingredient,
            totalQuantity: ingredientQuantities[key] || 0,
            totalCost: (ingredientQuantities[key] || 0) * ingredient.cost,
          }
        }
      })
    })

    return Object.values(ingredientsMap)
  }

  const updateIngredientQuantity = (ingredientName: string, newQuantity: number) => {
    if (newQuantity < 0) return
    
    setIngredientQuantities(prev => ({
      ...prev,
      [ingredientName]: newQuantity
    }))
  }

  const orderIngredients = getOrderIngredients()

  return (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-stone-800">Ingredientes - Pedido #{order.id}</DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        <div className="text-sm text-stone-600">
          Cliente: <span className="font-medium text-stone-800">{order.client}</span>
        </div>

        <div className="space-y-4">
          <Label className="text-stone-700 font-medium">Ingredientes necesarios</Label>

          <div className="grid gap-3">
            {orderIngredients.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-stone-800">{ingredient.name}</p>
                  <p className="text-xs text-stone-500">
                    Precio unitario: ${ingredient.cost.toLocaleString()}/{ingredient.unit}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateIngredientQuantity(ingredient.name, ingredient.totalQuantity - 1)}
                      disabled={ingredient.totalQuantity <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <div className="flex flex-col items-center">
                      <Input
                        type="number"
                        value={ingredient.totalQuantity}
                        onChange={(e) =>
                          updateIngredientQuantity(ingredient.name, Number.parseInt(e.target.value) || 0)
                        }
                        className="w-20 text-center h-8"
                        min="0"
                      />
                      <span className="text-xs text-stone-500 mt-1">{ingredient.unit}</span>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateIngredientQuantity(ingredient.name, ingredient.totalQuantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <p className="font-medium text-stone-800">${ingredient.totalCost.toLocaleString()}</p>
                    <p className="text-xs text-stone-500">Total</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-stone-700">Costo total de ingredientes:</span>
              <span className="text-xl font-bold text-olive-600">
                ${orderIngredients.reduce((sum, ing) => sum + ing.totalCost, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-stone-600">Precio de venta:</span>
              <span className="font-medium text-stone-800">${order.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-sm">
              <span className="text-stone-600">Ganancia estimada:</span>
              <span
                className={`font-medium ${
                  order.total - orderIngredients.reduce((sum, ing) => sum + ing.totalCost, 0) > 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                $
                {(order.total - orderIngredients.reduce((sum, ing) => sum + ing.totalCost, 0)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

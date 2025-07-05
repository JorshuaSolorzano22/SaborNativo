import { useState } from "react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { Order, Ingredient } from "../types"

interface IngredientsModalProps {
  order: Order | null
  allIngredients: Ingredient[]
}

export default function IngredientsModal({ order, allIngredients }: IngredientsModalProps) {
  if (!order) return null

  // Estado para manejar las cantidades editables de ingredientes
  const [ingredientQuantities, setIngredientQuantities] = useState<{ [key: string]: number }>(() => {
    const initialQuantities: { [key: string]: number } = {}
    
    // Inicializar todas las cantidades en 0 para entrada manual
    allIngredients.forEach((ingredient) => {
      initialQuantities[ingredient.name] = 0
    })
    
    return initialQuantities
  })

  const updateIngredientQuantity = (ingredientName: string, newQuantity: number) => {
    if (newQuantity < 0) return
    
    setIngredientQuantities(prev => ({
      ...prev,
      [ingredientName]: newQuantity
    }))
  }

  // Calcular subtotales y total
  const getIngredientsWithTotals = () => {
    return allIngredients.map(ingredient => ({
      ...ingredient,
      totalQuantity: ingredientQuantities[ingredient.name] || 0,
      totalCost: (ingredientQuantities[ingredient.name] || 0) * ingredient.cost
    }))
  }

  const ingredientsWithTotals = getIngredientsWithTotals()
  const totalExpenses = ingredientsWithTotals.reduce((sum, ing) => sum + ing.totalCost, 0)
  const profit = order.total - totalExpenses
  const profitMargin = order.total > 0 ? ((profit / order.total) * 100) : 0

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
          <Label className="text-stone-700 font-medium">Ingredientes disponibles</Label>
          <p className="text-sm text-stone-600">
            Ingrese manualmente las cantidades de ingredientes utilizados para este pedido
          </p>

          <div className="grid gap-3">
            {ingredientsWithTotals.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-stone-800">{ingredient.name}</p>
                  <p className="text-xs text-stone-500">
                    Precio unitario: ${(ingredient.cost ?? 0).toLocaleString()}/{ingredient.unit}
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
                    <p className="text-xs text-stone-500">Subtotal</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 bg-stone-100 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-stone-700">Costo total de ingredientes:</span>
                <span className="text-xl font-bold text-red-600">
                  ${totalExpenses.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-600">Precio de venta:</span>
                <span className="font-medium text-stone-800">${order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-600">Ganancia estimada:</span>
                <span
                  className={`font-medium ${
                    profit > 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  ${profit.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-600">Margen de ganancia:</span>
                <span
                  className={`font-medium ${
                    profitMargin > 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  )
}

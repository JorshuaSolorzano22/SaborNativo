import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem, useCart } from "@/hooks/useCart";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <Card className="bg-white">
      <CardContent className="p-4 flex items-center space-x-4">
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image src={item.image || "/placeholder.jpg"} alt={item.nombre} fill className="object-cover rounded" />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-lg text-brand-foreground">{item.nombre}</h3>
          <p className="text-lg font-bold text-brand-primary">₡{item.precio.toLocaleString()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold w-8 text-center text-brand-foreground">{item.quantity}</span>
          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardContent>
      <div className="border-t p-3 text-right">
        <p className="font-semibold text-brand-foreground">Subtotal: ₡{(item.precio * item.quantity).toLocaleString()}</p>
      </div>
    </Card>
  );
}
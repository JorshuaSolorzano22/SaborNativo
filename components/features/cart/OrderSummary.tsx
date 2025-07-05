"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";

export function OrderSummary() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("sinpe");

  const handleOrder = () => {
    const orderDetails = cartItems
      .map((item) => `${item.name} x${item.quantity} - ₡${(item.price * item.quantity).toLocaleString()}`)
      .join("\n");

    const paymentMethodText = {
      sinpe: "SINPE móvil",
      transfer: "Transferencia bancaria",
      cash: "Efectivo",
    }[paymentMethod] || "No especificado";

    const message = `¡Hola Sabor Nativo! Me gustaría realizar el siguiente pedido:\n\n${orderDetails}\n\n*Total: ₡${totalPrice.toLocaleString()}*\n\nMétodo de pago: ${paymentMethodText}\n${deliveryNotes ? `Notas de entrega: ${deliveryNotes}` : ""}\n\n¡Gracias!`;

    // Reemplaza con tu número de WhatsApp real
    const whatsappUrl = `https://wa.me/50612345678?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Opcional: limpiar el carrito después de enviar el pedido
    clearCart(); 
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-brand-foreground">Resumen del pedido</h3>
          <div className="space-y-2 mb-4 border-b border-brand-border pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-brand-foreground">
                <span>{item.name} x{item.quantity}</span>
                <span>₡{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span className="text-brand-foreground">Total:</span>
            <span className="text-brand-primary">₡{totalPrice.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6">
          <Label htmlFor="delivery-notes" className="text-lg font-semibold text-brand-foreground">Notas de entrega</Label>
          <Textarea
            id="delivery-notes"
            placeholder="Ej. Entregar en portón negro, casa de dos pisos..."
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
            className="mt-2 border-brand-border focus:ring-brand-primary"
          />
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6">
          <Label className="text-lg font-semibold text-brand-foreground">Método de pago</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-3 space-y-2">
            <div className="flex items-center space-x-2"><RadioGroupItem value="sinpe" id="sinpe" /><Label htmlFor="sinpe">SINPE móvil</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="transfer" id="transfer" /><Label htmlFor="transfer">Transferencia bancaria</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="cash" id="cash" /><Label htmlFor="cash">Efectivo</Label></div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button onClick={handleOrder} size="lg" className="w-full text-white font-semibold py-4 bg-brand-primary hover:bg-brand-primary/90">
        Realizar pedido por WhatsApp
      </Button>
    </div>
  );
}
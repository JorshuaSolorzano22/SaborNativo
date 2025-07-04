"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export function OrderSummary() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { createOrder, loading, error } = useCreateOrder();
  const { user, isAuthenticated } = useAuth();
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("sinpe");
  const [successMessage, setSuccessMessage] = useState("");

  // Debug logging
  console.log("🔍 OrderSummary - Auth state:", { 
    user: user ? { 
      id: user.id,
      nombre: user.nombre,
      apellidos: user.apellidos,
      correo: user.correo,
      fullName: user.fullName
    } : null, 
    isAuthenticated 
  });

  const handleOrder = async () => {
    // Validar que el usuario esté autenticado
    if (!isAuthenticated || !user) {
      return;
    }

    try {
      // Usar el nombre del usuario autenticado
      const customerName = user.fullName || user.nombre || "Usuario";
      
      // Crear el pedido en Firebase
      const result = await createOrder({
        cliente: customerName,
        productos: cartItems,
        totalPedido: totalPrice,
        notasEntrega: deliveryNotes,
        metodoPago: paymentMethod
      })

      if (result.success) {
        // Generar mensaje de WhatsApp
        const orderDetails = cartItems
          .map((item) => `${item.nombre} x${item.quantity} - ₡${(item.precio * item.quantity).toLocaleString()}`)
          .join("\n");

        const paymentMethodText = {
          sinpe: "SINPE móvil",
          transfer: "Transferencia bancaria",
          cash: "Efectivo",
        }[paymentMethod] || "No especificado";

        const message = `¡Hola Sabor Nativo! Me gustaría realizar el siguiente pedido:\n\n*Cliente:* ${customerName}\n*Pedido ID:* ${result.orderId}\n\n${orderDetails}\n\n*Total: ₡${totalPrice.toLocaleString()}*\n\nMétodo de pago: ${paymentMethodText}\n${deliveryNotes ? `Notas de entrega: ${deliveryNotes}` : ""}\n\n¡Gracias!`;

        // Enviar mensaje por WhatsApp
        const whatsappUrl = `https://wa.me/50687462555?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, "_blank");

        // Limpiar el carrito después de enviar el pedido exitosamente
        clearCart();
        
        // Mostrar mensaje de éxito
        setSuccessMessage(`¡Pedido creado exitosamente! ID: ${result.orderId}. Se ha enviado el mensaje por WhatsApp.`)
        
        // Limpiar formulario
        setDeliveryNotes("")
      }
    } catch (err) {
      console.error("Error al procesar pedido:", err)
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-brand-foreground">Resumen del pedido</h3>
          <div className="space-y-2 mb-4 border-b border-brand-border pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-brand-foreground">
                <span>{item.nombre} x{item.quantity}</span>
                <span>₡{(item.precio * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xl font-bold">
            <span className="text-brand-foreground">Total:</span>
            <span className="text-brand-primary">₡{totalPrice.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {!isAuthenticated ? (
        <Card style={{ backgroundColor: "#F6F1EB", borderColor: "#D4C4A8" }}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#5C4A3B" }}>Necesitas iniciar sesión</h3>
            <p className="mb-4" style={{ color: "#7A6B5D" }}>
              Para realizar un pedido debes tener una cuenta registrada. 
              Esto nos ayuda a gestionar mejor tu pedido y mantener un historial de tus compras.
            </p>
            <Link href="/login">
              <Button style={{ backgroundColor: "#7A8751" }} className="hover:opacity-90 text-white">
                Iniciar sesión / Registrarse
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card style={{ backgroundColor: "#F0F4E8", borderColor: "#C5D4B0" }}>
            <CardContent className="p-4">
              <p className="text-sm" style={{ color: "#5C6B47" }}>
                ✓ Sesión iniciada como: <strong>{user?.fullName || user?.nombre}</strong>
              </p>
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
        </>
      )}

      {error && (
        <Card style={{ backgroundColor: "#F4E8E8", borderColor: "#D4A8A8" }}>
          <CardContent className="p-4">
            <p className="text-sm" style={{ color: "#8B4A4A" }}>Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {successMessage && (
        <Card style={{ backgroundColor: "#F0F4E8", borderColor: "#C5D4B0" }}>
          <CardContent className="p-4">
            <p className="text-sm" style={{ color: "#5C6B47" }}>{successMessage}</p>
          </CardContent>
        </Card>
      )}

      <Button 
        onClick={handleOrder} 
        size="lg" 
        className="w-full text-white font-semibold py-4 bg-brand-primary hover:bg-brand-primary/90"
        disabled={loading || !isAuthenticated}
      >
        {loading ? "Procesando pedido..." : 
         !isAuthenticated ? "Inicia sesión para realizar pedido" : 
         "Realizar pedido por WhatsApp"}
      </Button>
    </div>
  );
}
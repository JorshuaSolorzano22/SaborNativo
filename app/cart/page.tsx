"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartItemCard } from "@/components/features/cart/CartItemCard";
import { OrderSummary } from "@/components/features/cart/OrderSummary";
import { Button } from "@/components/ui/button";

const CartHeader = () => (
  <header className="bg-white shadow-sm border-b border-brand-border sticky top-0 z-40">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Button asChild variant="ghost" className="text-brand-primary">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-semibold">Volver</span>
          </Link>
        </Button>
        <h1 className="text-xl font-bold text-brand-foreground">Carrito de compras</h1>
        <div className="w-24" /> {}
      </div>
    </div>
  </header>
);

const EmptyCart = () => (
  <div className="bg-brand-background min-h-screen">
    <CartHeader />
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-2xl font-bold mb-4 text-brand-foreground">Tu carrito está vacío</h2>
      <p className="text-lg mb-8 text-brand-foreground/80">
        Agrega algunos productos deliciosos para comenzar tu pedido.
      </p>
      <Button asChild size="lg" className="bg-brand-primary text-white hover:bg-brand-primary/90">
        <Link href="/">Explorar productos</Link>
      </Button>
    </main>
  </div>
);

export default function CartPage() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-brand-background min-h-screen">
      <CartHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-brand-foreground">Productos en tu carrito</h2>
            {cartItems.map((item) => <CartItemCard key={item.id} item={item} />)}
          </div>
          <div className="lg:sticky lg:top-24">
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, notFound } from "next/navigation"
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProductCard } from "@/components/features/product/ProductCard" 
import { products } from "@/lib/data" 

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)

  const product = products.find((p) => p.id === productId)

  const [quantity, setQuantity] = useState(1)

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    console.log(`Agregando ${quantity} unidades de ${product.name} al carrito`)
    setQuantity(1)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (loading) {
    return (
      <div className="bg-brand-background min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary"></div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="bg-brand-background min-h-screen">
      <header className="bg-white shadow-sm border-b border-brand-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button asChild variant="ghost" className="text-brand-primary hover:text-brand-primary/90">
              <Link href="/" className="flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-semibold">Volver</span>
              </Link>
            </Button>
            <Link href="/" className="flex items-center">
              <h1 className="text-lg font-bold text-brand-foreground">Sabor Nativo</h1>
            </Link>
            <Button asChild variant="ghost" size="icon" className="text-brand-primary">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square relative">
            <Image
              src="/placeholder.jpg"
              alt={product.nombre}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brand-foreground">
                {product.nombre}
              </h1>
              <p className="text-4xl font-bold mb-6 text-brand-primary">
                ₡{product.precio.toLocaleString()}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-brand-foreground">Descripción</h2>
              <p className="text-lg leading-relaxed text-brand-foreground">
                {product.descripcion}
              </p>
            </div>

            <div className="pt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full md:w-auto px-8 py-4 text-lg font-semibold bg-brand-primary text-white hover:bg-brand-primary/90">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Agregar al carrito
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-brand-foreground">Agregar al carrito</DialogTitle>
                    <DialogDescription className="text-brand-foreground/80">
                      Selecciona la cantidad de {product.nombre} que deseas agregar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-center space-x-4">
                      <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1} className="border-brand-primary text-brand-primary">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-semibold w-12 text-center text-brand-foreground">
                        {quantity}
                      </span>
                      <Button variant="outline" size="icon" onClick={incrementQuantity} className="border-brand-primary text-brand-primary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-brand-foreground">
                        Total: ₡{(product.precio * quantity).toLocaleString()}
                      </p>
                    </div>
                    <DialogTrigger asChild>
                      <Button onClick={handleAddToCart} className="w-full bg-brand-primary text-white hover:bg-brand-primary/90">
                        Confirmar y agregar
                      </Button>
                    </DialogTrigger>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <section className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <FirebaseProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
        
      </main>
    </div>
  );
}

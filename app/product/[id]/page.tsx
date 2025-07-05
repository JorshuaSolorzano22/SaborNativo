"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, notFound } from "next/navigation"
import { ArrowLeft, ShoppingCart, Plus, Minus } from "lucide-react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebaseConfig"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FirebaseProductCard } from "@/components/features/product/FirebaseProductCard" 
import { useProducts, FirebaseProduct } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart" 

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const { products } = useProducts()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<FirebaseProduct | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const productDoc = await getDoc(doc(db, "producto", productId))
        
        if (productDoc.exists()) {
          const productData = productDoc.data()
          setProduct({
            id: productDoc.id,
            nombre: productData.nombre || '',
            descripcion: productData.descripcion || '',
            precio: productData.precio || 0
          })
        } else {
          notFound()
        }
      } catch (error) {
        console.error("Error al cargar producto:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      loadProduct()
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      console.log(`Agregando ${quantity} unidades de ${product.nombre} al carrito`)
      setQuantity(1)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 3)

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
      {}
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

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {}
          <div className="aspect-square relative">
            <Image
              src="/placeholder.jpg"
              alt={product.nombre}
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {}
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
              <h2 className="text-xl font-semibold mb-3 text-brand-foreground">
                Descripción
              </h2>
              <p className="text-lg leading-relaxed text-brand-foreground">
                {product.descripcion}
              </p>
            </div>

            <div className="pt-6">
              {}
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

        {/* Related Products */}
        <section className="mt-16 md:mt-24">
          <h2 className="text-2xl font-semibold mb-6 text-brand-foreground">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <FirebaseProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
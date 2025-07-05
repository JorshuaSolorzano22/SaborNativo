"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { ProductCard } from "@/components/features/product/ProductCard";
import { Product, products } from "@/lib/data";

export function FeaturedProductsSection() {
  const { products, loading, error } = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  useEffect(() => {
    getProductosConImagenes().then(setProducts);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const getVisibleProducts = () => {
    const start = currentSlide * itemsPerSlide;
    return products.slice(start, start + itemsPerSlide);
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-24">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-24">
        <div className="text-center">
          <p className="text-red-600">Error al cargar productos: {error}</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16 sm:py-24">
        <div className="text-center">
          <p className="text-gray-600">No hay productos disponibles</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-foreground">Nuestros productos</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={prevSlide} className="border-2 border-primary text-primary">←</Button>
          <Button variant="outline" size="sm" onClick={nextSlide} className="border-2 border-primary text-primary">→</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getVisibleProducts().map((product) => (
          <FirebaseProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors bg-primary ${currentSlide === index ? "opacity-100" : "opacity-50"}`}
          />
        ))}
      </div>
    </section>
  );
}

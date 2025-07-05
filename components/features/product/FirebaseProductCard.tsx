import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FirebaseProduct } from "@/hooks/useProducts";

interface FirebaseProductCardProps {
  product: FirebaseProduct;
  showDescription?: boolean;
}

export function FirebaseProductCard({ product, showDescription = false }: FirebaseProductCardProps) {
  // Imagen por defecto si no hay imagen específica
  const defaultImage = "/placeholder.jpg";
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardContent className="p-0">
        <div className="relative w-full h-64">
          <Image
            src={defaultImage}
            alt={product.nombre}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-lg mb-2 text-brand-foreground">{product.nombre}</h4>
          <p className="text-2xl font-bold mb-3 text-brand-primary">
            ₡{product.precio.toLocaleString()}
          </p>
          <Link href={`/product/${product.id}`}>
            <Button className="w-full bg-brand-primary text-white hover:bg-brand-primary/90">
              Ver detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
}

export function ProductCard({ product, showDescription = false }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-lg mb-2 text-brand-foreground">{product.name}</h4>
          {showDescription && (
            <p className="text-sm mb-3 text-brand-foreground h-12">{product.description}</p>
          )}
          <p className="text-2xl font-bold mb-3 text-brand-primary">
            ₡{product.price.toLocaleString()}
          </p>
          <Link href={`/product/${product.id}`}>
            <Button className="w-full bg-brand-primary text-white hover:bg-brand-primary/90">
              {showDescription ? "Ver detalles" : "Ver más"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
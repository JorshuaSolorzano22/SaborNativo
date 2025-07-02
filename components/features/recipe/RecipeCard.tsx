import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recipe } from "@/lib/data";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardContent className="p-0">
        <div className="aspect-video relative">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h4 className="text-xl font-semibold mb-3 text-brand-foreground">
            {recipe.title}
          </h4>
          <p className="mb-4 text-brand-foreground">{recipe.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-brand-secondary text-brand-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <Button className="w-full bg-brand-primary text-white hover:bg-brand-primary/90">
            Ver receta completa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { RecipeCard } from "@/components/features/recipe/RecipeCard";
import { Button } from "@/components/ui/button";
import { recipes } from "@/lib/data";

export function RecipesSection() {
  return (
    <section id="recetas" className="py-16 sm:py-24">
      <SectionHeader
        title="Recetas"
        subtitle="Inspírate con nuestras recetas tradicionales usando nuestros productos artesanales"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.title} recipe={recipe} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Button
          size="lg"
          className="bg-brand-green text-foreground hover:bg-brand-green/90"
        >
          Ver todas las recetas
        </Button>
      </div>
    </section>
  );
}

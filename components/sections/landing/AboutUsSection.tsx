import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { valuePropositions, ValueProposition } from "@/lib/data";

const ValueCard = ({ item }: { item: ValueProposition }) => (
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-brand-green">
      {item.icon}
    </div>
    <h4 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h4>
    <p className="text-foreground">{item.description}</p>
  </div>
);

export function AboutUsSection() {
  return (
    <section id="nosotros" className="py-16 sm:py-24">
      <SectionHeader
        title="Nosotros"
        subtitle="Somos una empresa familiar costarricense dedicada a la elaboración de productos gourmet artesanales desde hace más de 15 años. Nuestra pasión por los sabores auténticos nos ha llevado a crear una línea de productos únicos que rescatan las tradiciones culinarias de nuestro país."
      />
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {valuePropositions.map((item) => <ValueCard key={item.title} item={item} />)}
        </div>
      </div>
    </section>
  );
}
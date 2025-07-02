import { SectionHeader } from "@/components/sections/shared/SectionHeader";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { contactInfo, ContactInfoItem } from "@/lib/data";

const ContactInfoCard = ({ item }: { item: ContactInfoItem }) => (
  <div className="flex items-start space-x-4">
    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-brand-primary">
      <div className="text-white text-xl">{item.icon}</div>
    </div>
    <div>
      <h4 className="text-lg font-semibold mb-2 text-brand-foreground">{item.title}</h4>
      <p className="text-brand-foreground">
        {item.lines.map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  </div>
);

export function ContactSection() {
  return (
    <section id="contacto" className="py-16 sm:py-24">
      <SectionHeader
        title="Contacto"
        subtitle="¿Tienes alguna pregunta o quieres hacer un pedido especial? ¡Contáctanos!"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {contactInfo.map((item) => (
            <ContactInfoCard key={item.title} item={item} />
          ))}
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

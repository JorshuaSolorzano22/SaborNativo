"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Usamos el componente de shadcn
import { Textarea } from "@/components/ui/textarea"; // Usamos el componente de shadcn

export function ContactForm() {
    // Aquí podrías añadir la lógica del formulario (useState, react-hook-form, etc.)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulario enviado");
        // Lógica para enviar el email...
    }

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h4 className="text-xl font-semibold mb-6 text-brand-brown">Envíanos un mensaje</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-brand-brown">Nombre</label>
              <Input type="text" placeholder="Tu nombre" className="border-brand-border focus:ring-brand-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-brand-brown">Email</label>
              <Input type="email" placeholder="tu@email.com" className="border-brand-border focus:ring-brand-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-brand-brown">Teléfono</label>
            <Input type="tel" placeholder="+506 1234-5678" className="border-brand-border focus:ring-brand-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-brand-brown">Mensaje</label>
            <Textarea rows={4} placeholder="Cuéntanos en qué podemos ayudarte..." className="border-brand-border focus:ring-brand-green" />
          </div>
          <Button type="submit" className="w-full bg-brand-green text-white hover:bg-brand-green/90">
            Enviar mensaje
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
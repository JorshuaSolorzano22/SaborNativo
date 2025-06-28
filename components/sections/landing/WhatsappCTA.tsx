import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react"; // O un icono de WhatsApp si lo tienes

export function WhatsappCTA() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="text-center">
        <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 rounded-lg bg-brand-brown-light">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-brand-whatsapp">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-semibold mb-1 text-brand-brown">¿Prefieres WhatsApp?</h4>
            <p className="mb-3 text-brand-brown">Chatea con nosotros directamente para pedidos rápidos</p>
            <a href="https://wa.me/50687462555" target="_blank" rel="noopener noreferrer">
              <Button className="bg-brand-whatsapp text-white hover:bg-brand-whatsapp/90">
                Abrir WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
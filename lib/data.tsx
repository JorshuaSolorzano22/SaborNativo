import { CreditCard, Layers, Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";

// Tipos para nuestros datos
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Recipe {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ValueProposition {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}

// Datos de Productos
export const products: Product[] = [
  { id: 1, name: "Miel de abeja pura", price: 8500, image: "/images/miel.jpg", description: "Miel artesanal 100% pura, extraída de colmenas locales en las montañas de Costa Rica." },
  { id: 2, name: "Café gourmet tostado", price: 12000, image: "/images/cafe.jpg", description: "Café de altura, tostado artesanalmente con notas a chocolate y frutos secos." },
  { id: 3, name: "Queso artesanal", price: 6500, image: "/images/queso.jpg", description: "Queso fresco elaborado con leche de vacas alimentadas con pasto natural." },
  { id: 4, name: "Mermelada de mora", price: 4200, image: "/images/mermelada.jpg", description: "Mermelada casera de mora silvestre, sin conservantes artificiales." },
  { id: 5, name: "Pan integral artesanal", price: 3800, image: "/images/pan.jpg", description: "Pan horneado diariamente con harinas integrales y semillas naturales." },
  { id: 6, name: "Aceite de oliva extra", price: 15000, image: "/images/aceite.jpg", description: "Aceite de oliva extra virgen, prensado en frío para conservar sus propiedades." },
];

// Datos de Recetas (ejemplo)
export const recipes: Recipe[] = [
    { title: "Pan tostado con miel y queso", description: "Un desayuno perfecto combinando nuestro pan integral, miel pura y queso artesanal.", image: "/images/receta-pan.jpg", tags: ["15 min", "Fácil"] },
    { title: "Pasta con chimichurri artesanal", description: "Una fusión deliciosa de pasta italiana con nuestro chimichurri estilo argentino.", image: "/images/receta-pasta.jpg", tags: ["25 min", "Intermedio"] },
    { title: "Tostadas gourmet con mermelada", description: "Disfruta de nuestro pan integral tostado con mermelada casera de mora.", image: "/images/receta-tostadas.jpg", tags: ["10 min", "Muy fácil"] }
];

// Datos de "Nosotros"
export const valuePropositions: ValueProposition[] = [
  { icon: <CreditCard className="w-8 h-8 text-white" />, title: "Calidad premium", description: "Ingredientes seleccionados de la más alta calidad" },
  { icon: <Leaf className="w-8 h-8 text-white" />, title: "Proceso artesanal", description: "Elaborados con técnicas tradicionales y amor" },
  { icon: <Layers className="w-8 h-8 text-white" />, title: "Origen local", description: "Apoyamos a productores locales costarricenses" },
];

// Datos de Contacto
export const contactInfo: ContactInfoItem[] = [
  { icon: <MapPin className="w-6 h-6 text-white" />, title: "Ubicación", lines: ["Puntarenas, Costa Rica", "Zona sur, Rio Claro", "200m sur de la Iglesia Central"] },
  { icon: <Phone className="w-6 h-6 text-white" />, title: "Teléfono", lines: ["+506 8746-2555", "WhatsApp: +506 8746-2555"] },
  { icon: <Mail className="w-6 h-6 text-white" />, title: "Email", lines: ["info@sabornativo.cr", "pedidos@sabornativo.cr"] },
  { icon: <Clock className="w-6 h-6 text-white" />, title: "Horarios", lines: ["Lunes a Viernes: 8:00 AM - 6:00 PM", "Sábados: 8:00 AM - 4:00 PM", "Domingos: Cerrado"] },
]

// Nota: He reemplazado los SVGs por iconos de lucide-react para mayor consistencia y facilidad. También he cambiado las rutas de las imágenes a un directorio `/images` en la carpeta `public`.
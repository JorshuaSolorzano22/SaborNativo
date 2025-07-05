import { CreditCard, Layers, Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";

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


export interface Imagen {
  nombre: string;
  url: string;
  tipo: string;
}

export const products: Product[] = [
  { id: 1, name: "Miel de Abeja", price: 7500, image: "/miel.jpg", description: "Miel artesanal 100% pura, recolectada de colmenas locales en Costa Rica." },
  { id: 2, name: "Chimichurri Argentino", price: 5000, image: "/chimichurri.webp", description: "Receta tradicional argentina con hierbas frescas y especias auténticas." },
  { id: 3, name: "Pesto", price: 6200, image: "/pesto.jpg", description: "Pesto casero preparado con albahaca fresca, nueces y aceite de oliva." },
  { id: 4, name: "Mermelada de Mora", price: 4200, image: "/mermelada.jpg", description: "Mermelada artesanal hecha con moras silvestres, sin conservantes." },
  { id: 5, name: "Mantequilla Saborizada", price: 3800, image: "/mantequilla.jpg", description: "Mantequilla cremosa infusionada con hierbas y especias naturales." },
  { id: 6, name: "Pasta de Ajo", price: 2500, image: "/pastaAjo.jpg", description: "Pasta de ajo artesanal, perfecta para untar o cocinar." },
];

export const recipes: Recipe[] = [
  { title: "Pasta con pesto y pollo", description: "Una receta cremosa y sabrosa donde la pasta se mezcla con pollo salteado y pesto de albahaca, creando un platillo rápido, aromático y lleno de sabor mediterráneo.", image: "/images/pasta.avif", tags: ["15 min", "Fácil"] },
  { title: "Maíz asado con mantequilla de hierbas", description: "Mazorcas calientes y asadas, untadas con mantequilla aromática. Una delicia para disfrutar como acompañamiento o en reuniones informales.", image: "/images/maiz.jpeg", tags: ["25 min", "Intermedio"] },
  { title: "Tostadas gourmet con mermelada", description: "Disfruta de nuestro pan integral tostado con mermelada casera de mora.", image: "/images/tostada.jpg", tags: ["10 min", "Muy fácil"] },
];

async function getImagenesPorTipo(tipo: string): Promise<Imagen[]> {
  const q = query(collection(db, "Images"), where("tipo", "==", tipo));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as Imagen);
}

export async function getProductosConImagenes(): Promise<Product[]> {
  const imagenes = await getImagenesPorTipo("producto");
  return products.map((p) => {
    const img = imagenes.find((i) => i.nombre.toLowerCase().includes(p.name.toLowerCase()));
    return { ...p, image: img?.url || p.image };
  });
}

export async function getRecetasConImagenes(): Promise<Recipe[]> {
  const imagenes = await getImagenesPorTipo("receta");
  return recipes.map((r) => {
    const img = imagenes.find((i) => i.nombre.toLowerCase().includes(r.title.toLowerCase()));
    return { ...r, image: img?.url || r.image };
  });
}

export async function getProductoConImagenPorId(id: number): Promise<Product | undefined> {
  const productoBase = products.find((p) => p.id === id);
  if (!productoBase) return undefined;
  const imagenes = await getImagenesPorTipo("producto");
  const imagenRemota = imagenes.find((img) => img.nombre.toLowerCase().includes(productoBase.name.toLowerCase()));
  return {
    ...productoBase,
    image: imagenRemota?.url || productoBase.image,
  };
}

export const valuePropositions: ValueProposition[] = [
  { icon: <CreditCard className="w-8 h-8 text-white" />, title: "Calidad premium", description: "Ingredientes seleccionados de la más alta calidad" },
  { icon: <Leaf className="w-8 h-8 text-white" />, title: "Proceso artesanal", description: "Elaborados con técnicas tradicionales y amor" },
  { icon: <Layers className="w-8 h-8 text-white" />, title: "Origen local", description: "Apoyamos a productores locales costarricenses" },
];


export const contactInfo: ContactInfoItem[] = [
  { icon: <MapPin className="w-6 h-6 text-white" />, title: "Ubicación", lines: ["Puntarenas, Costa Rica", "Zona sur, Rio Claro", "200m sur de la Iglesia Central"] },
  { icon: <Phone className="w-6 h-6 text-white" />, title: "Teléfono", lines: ["+506 8746-2555", "WhatsApp: +506 8746-2555"] },
  { icon: <Mail className="w-6 h-6 text-white" />, title: "Email", lines: ["info@sabornativo.cr", "pedidos@sabornativo.cr"] },
  { icon: <Clock className="w-6 h-6 text-white" />, title: "Horarios", lines: ["Lunes a Viernes: 8:00 AM - 6:00 PM", "Sábados: 8:00 AM - 4:00 PM", "Domingos: Cerrado"] },
]


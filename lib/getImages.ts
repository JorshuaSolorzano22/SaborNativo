import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Imagen } from "./types";

export async function getImagenesPorTipo(tipo: string): Promise<Imagen[]> {
  const q = query(collection(db, "Images"), where("tipo", "==", tipo));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as Imagen);
}

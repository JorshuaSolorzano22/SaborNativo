import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'

// Productos de ejemplo para poblar la base de datos
const sampleProducts = [
  {
    nombre: 'Miel de Abeja',
    descripcion: 'Miel artesanal 100% pura, recolectada de colmenas locales en Costa Rica.',
    precio: 7500
  },
  {
    nombre: 'Chimichurri Argentino',
    descripcion: 'Receta tradicional argentina con hierbas frescas y especias auténticas.',
    precio: 5000
  },
  {
    nombre: 'Pesto',
    descripcion: 'Pesto casero preparado con albahaca fresca, nueces y aceite de oliva.',
    precio: 6200
  },
  {
    nombre: 'Mermelada de Mora',
    descripcion: 'Mermelada artesanal hecha con moras silvestres, sin conservantes.',
    precio: 4200
  },
  {
    nombre: 'Mantequilla Saborizada',
    descripcion: 'Mantequilla cremosa infusionada con hierbas y especias naturales.',
    precio: 3800
  },
  {
    nombre: 'Pasta de Ajo',
    descripcion: 'Pasta de ajo artesanal, perfecta para untar o cocinar.',
    precio: 2500
  }
]

export async function populateProducts() {
  try {
    const productsCollection = collection(db, 'producto')
    
    console.log('Poblando productos en Firebase...')
    
    for (const product of sampleProducts) {
      const docRef = await addDoc(productsCollection, product)
      console.log(`Producto "${product.nombre}" agregado con ID: ${docRef.id}`)
    }
    
    console.log('✅ Todos los productos se agregaron exitosamente!')
  } catch (error) {
    console.error('❌ Error al poblar productos:', error)
  }
}

// Ejecutar si se ejecuta directamente este archivo
if (typeof window !== 'undefined') {
  // Código del navegador
  console.log('Para poblar productos, ejecuta: populateProducts()')
} else {
  // Código de Node.js
  populateProducts()
}

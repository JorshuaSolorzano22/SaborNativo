import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseConfig'

export interface FirebaseProduct {
  id: string
  nombre: string
  descripcion: string
  precio: number
}

export function useProducts() {
  const [products, setProducts] = useState<FirebaseProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const productsCollection = collection(db, 'producto')
      const productsSnapshot = await getDocs(productsCollection)
      
      const loadedProducts: FirebaseProduct[] = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        nombre: doc.data().nombre || '',
        descripcion: doc.data().descripcion || '',
        precio: doc.data().precio || 0
      }))
      
      setProducts(loadedProducts)
    } catch (err) {
      console.error('Error al cargar productos:', err)
      setError('Error al cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return { products, loading, error, refreshProducts: loadProducts }
}

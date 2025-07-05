"use client"

import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { db } from "@/firebaseConfig"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import AdminHeader from "@/app/admin/components/AdminHeader"

type Ingrediente = {
  id?: string
  nombre: string
  unidad: string
  precio: number
}

export default function InventarioPage() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([])
  const [form, setForm] = useState<Ingrediente>({
    nombre: "",
    unidad: "",
    precio: 0,
  })
  const [editId, setEditId] = useState<string | null>(null)

  const colRef = collection(db, "ingrediente")

  const cargarIngredientes = async () => {
    const snap = await getDocs(colRef)
    const lista = snap.docs.map((docSnap) => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        nombre: Array.isArray(data.nombre) ? data.nombre[0] : data.nombre || "",
        unidad: Array.isArray(data.medida) ? data.medida[0] : data.medida || "",
        precio: Array.isArray(data.precio) ? data.precio[0] : data.precio || 0,
      }
    })

    setIngredientes(lista.sort((a, b) => a.nombre.localeCompare(b.nombre)))
  }

  useEffect(() => {
    cargarIngredientes()
  }, [])

  const limpiarForm = () =>
    setForm({ nombre: "", unidad: "", precio: 0 })

  const agregarIngrediente = async () => {
    if (!form.nombre) return

    await addDoc(colRef, {
      nombre: [form.nombre],
      medida: [form.unidad],
      precio: [form.precio],
    })

    limpiarForm()
    cargarIngredientes()
  }

  const actualizarIngrediente = async () => {
    if (!editId) return

    await updateDoc(doc(colRef, editId), {
      nombre: [form.nombre],
      medida: [form.unidad],
      precio: [form.precio],
    })

    setEditId(null)
    limpiarForm()
    cargarIngredientes()
  }

  const eliminarIngrediente = async (id: string) => {
    await deleteDoc(doc(colRef, id))
    cargarIngredientes()
  }

  return (
    <>
      <AdminHeader />

      <main className="max-w-7xl mx-auto p-4">
        <Link href="/admin" className="inline-flex items-center text-stone-600 hover:underline mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver al panel
        </Link>

        <h2 className="text-2xl font-semibold text-stone-800 mb-6">Inventario de Ingredientes</h2>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <Input
              placeholder="Unidad (kg, ml…)"
              value={form.unidad}
              onChange={(e) => setForm({ ...form, unidad: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Precio ₡"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
            />
          </div>

          <div className="mt-4 flex items-center space-x-3">
            {editId ? (
              <>
                <Button
                  onClick={actualizarIngrediente}
                  className="bg-olive-600 hover:bg-olive-700 text-white"
                >
                  Guardar cambios
                </Button>
                <Button variant="ghost" onClick={() => { setEditId(null); limpiarForm() }}>
                  Cancelar
                </Button>
              </>
            ) : (
              <Button
                onClick={agregarIngrediente}
                className="bg-olive-600 hover:bg-olive-700 text-white flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" /> <span>Agregar ingrediente</span>
              </Button>
            )}
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                {["Nombre", "Unidad", "Precio (₡)", ""].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left text-stone-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-stone-200">
              {ingredientes.map((ing) => (
                <tr key={ing.id}>
                  <td className="px-6 py-4">{ing.nombre}</td>
                  <td className="px-6 py-4">{ing.unidad}</td>
                  <td className="px-6 py-4 text-right">{ing.precio.toLocaleString()}</td>
                  <td className="px-6 py-4 flex justify-end space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setEditId(ing.id!)
                        setForm({
                          nombre: ing.nombre,
                          unidad: ing.unidad,
                          precio: ing.precio,
                        })
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => eliminarIngrediente(ing.id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}

              {ingredientes.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-stone-500">
                    No hay ingredientes cargados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

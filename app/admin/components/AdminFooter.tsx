import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminFooter() {
  return (
    <footer className="bg-white border-t border-stone-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-stone-600">Sistema de Administración Sabor Nativo v1.0</p>
            <p className="text-sm text-olive-600 font-medium italic">"Sabores que nacen de nuestra tierra"</p>
          </div>
          <Link href={"/"}>
            <Button variant="outline" className="border-stone-300 text-stone-600 hover:bg-stone-50 bg-transparent">
              Cerrar sesión
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  )
}

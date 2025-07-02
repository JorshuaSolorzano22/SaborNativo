import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-olive-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SN</span>
            </div>
            <h1 className="text-xl font-semibold text-stone-800">Sabor Nativo</h1>
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" className="text-stone-600 hover:text-olive-600 hover:bg-olive-50">
              Pedidos
            </Button>
            <Button variant="ghost" className="text-stone-600 hover:text-olive-600 hover:bg-olive-50">
              Inventario
            </Button>
            <Button variant="ghost" className="text-stone-600 hover:text-olive-600 hover:bg-olive-50">
              Control de pedidos
            </Button>
          </nav>

          {/* Usuario */}
          <Button variant="ghost" size="icon" className="text-stone-600 hover:text-olive-600 hover:bg-olive-50">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

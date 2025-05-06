import { Link } from "react-router-dom"

function ReparacionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Reparaciones</h1>
          <p className="text-gray-500 mt-2">Administra servicios y reparaciones</p>
        </div>
        <div className="text-left">
          <Link to="/" className="border-2 border-blue-600 rounded-lg p-2 cursor-pointer">
            <button className="cursor-pointer">Volver al Inicio</button>
          </Link>
        </div>
      </header>

     
    </div>
  )
}

export default ReparacionesPage

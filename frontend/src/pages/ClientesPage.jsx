import { Link } from "react-router-dom"
import Formulario from "../Components/Formulario"
import ListaDeRegistros from "../Components/ListaDeRegistros"
import VistaVehiculos from "../Components/VistaVehiculos"

function ClientesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-500 mt-2">Administra la información de tus clientes</p>
        </div>
        <div className="text-left">
          <Link to="/" className="border-2 border-blue-600 rounded-lg p-2 cursor-pointer">
            <button className="cursor-pointer">Volver al Inicio</button>
          </Link>
        </div>
      </header>
    <div className="grid-container">
      <div> <Formulario/></div>
      <div> <ListaDeRegistros/></div>
    </div>


      <main className="container mx-auto py-10 px-4">
        <div className="mb-6">
          <Link to="/" className="border-2 border-blue-600 rounded-lg p-2">
            <button>Volver al Inicio</button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default ClientesPage

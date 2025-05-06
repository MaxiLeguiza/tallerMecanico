import { Users, Car, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Gestión</h1>
          <p className="text-gray-500 mt-2">Administra clientes, vehículos y reparaciones</p>
        </div>
      </header>

      <main className="container mx-auto py-10 px-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Tarjeta Clientes */}
          <div className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow flex flex-col">
            <div className="border-b p-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Clientes</h2>
              <p className="text-sm text-gray-500">Gestiona la información de tus clientes</p>
            </div>
            <div className="p-4 flex-1">
              <p className="text-sm text-gray-500">
                Registra nuevos clientes, actualiza información de contacto y visualiza el historial de servicios.
              </p>
            </div>
            <div className="border-t p-4">
              <Link to="/clientes" className="block w-full">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                  Ver Clientes
                </button>
              </Link>
            </div>
          </div>

          {/* Tarjeta Vehículos */}
          <div className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow flex flex-col">
            <div className="border-b p-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Car className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Vehículos</h2>
              <p className="text-sm text-gray-500">Administra el inventario de vehículos</p>
            </div>
            <div className="p-4 flex-1">
              <p className="text-sm text-gray-500">
                Registra nuevos vehículos, actualiza información técnica y asigna vehículos a clientes.
              </p>
            </div>
            <div className="border-t p-4">
              <Link to="/vehiculos" className="block w-full">
                <button className="bg-green-500 w-full border border-gray-300 text-black py-2 px-4 rounded hover:bg-green-300 transition">
                  Ver Vehículos
                </button>
              </Link>
            </div>
          </div>

          {/* Tarjeta Reparaciones */}
          <div className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow flex flex-col">
            <div className="border-b p-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                <Wrench className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold">Reparaciones</h2>
              <p className="text-sm text-gray-500">Gestiona servicios y reparaciones</p>
            </div>
            <div className="p-4 flex-1">
              <p className="text-sm text-gray-500">
                Registra nuevas reparaciones, actualiza el estado de los servicios y genera informes.
              </p>
            </div>
            <div className="border-t p-4">
              <Link to="/reparaciones" className="block w-full">
                <button className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition">
                  Ver Reparaciones
                </button>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto py-6 px-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Sistema de Gestión. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

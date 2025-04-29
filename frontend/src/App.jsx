import React, { useState } from "react";
import ListaDeRegistros from "./Components/ListaDeRegistros";
import EditarDatos from "./Components/EditarDatos";

const App = () => {
  const [registros, setRegistros] = useState([]);
  const [registroEditado, setRegistroEditado] = useState(null); // Registro seleccionado para editar
  const [mostrarModal, setMostrarModal] = useState(false); // Controla la visibilidad del modal

  // Función para obtener los registros del backend
  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/clientes");
      if (!response.ok) {
        throw new Error("Error al obtener los registros");
      }
      const datos = await response.json();
      setRegistros(datos);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para abrir el modal con los datos del registro seleccionado
  const editarRegistro = (registro) => {
    setRegistroEditado(registro); // Establece el registro que se va a editar
    setMostrarModal(true); // Muestra el modal
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setRegistroEditado(null); // Limpia el registro seleccionado
    setMostrarModal(false); // Oculta el modal
  };

  return (
    <div>
      <h1>Gestión de Clientes</h1>
      <ListaDeRegistros
        registros={registros}
        fetchRegistros={fetchRegistros}
        editarRegistro={editarRegistro} // Pasa la función como prop
      />
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditarDatos
              registroEditado={registroEditado}
              cerrarModal={cerrarModal}
              fetchRegistros={fetchRegistros}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
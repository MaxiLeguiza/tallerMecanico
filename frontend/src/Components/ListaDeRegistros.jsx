import React from "react";
import { useState } from "react";

const ListaDeRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  // Función para obtener los registros del backend
  const fetchRegistros = async () => {
    setLoading(true); // Mostrar mensaje de carga
    try {
      const response = await fetch("http://127.0.0.1:5000/api/clientes"); // Cambia la URL según tu endpoint
      if (!response.ok) {
        throw new Error("Ups! No se pudo obtener la información.");
      }
      const datos = await response.json();
      setRegistros(datos);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ocultar mensaje de carga
    }
  };

  // Función para eliminar un registro
  const eliminarRegistro = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/clientes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el registro");
      }

      // Actualizar la lista de registros después de eliminar
      setRegistros((prevRegistros) => prevRegistros.filter((registro) => registro.id !== id));
      alert("Registro eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al eliminar el registro");
    }
  };

  // Función para manejar la edición de un registro
  const editarRegistro = (id) => {
    const registro = registros.find((registro) => registro.id === id);
    if (registro) {
      setRegistroSeleccionado(registro);
      setModalVisible(true); // Mostrar el modal
    }
  };

    // Función para manejar los cambios en los inputs del formulario
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRegistroSeleccionado((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    // Función para guardar los cambios en el backend
  const guardarCambios = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000//api/clientes/${registroSeleccionado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registroSeleccionado),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      // Actualizar la lista de registros con los datos modificados
      setRegistros((prevRegistros) =>
        prevRegistros.map((registro) =>
          registro.id === registroSeleccionado.id ? registroSeleccionado : registro
        )
      );

      alert("Cambios guardados correctamente");
      setModalVisible(false); // Cerrar el modal
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al guardar los cambios");
    }
  };

  return (
    <div>
      <h1>Listado de Registros</h1>
      {/* Botón para traer los registros */}
      <button onClick={fetchRegistros} className="bg-blue-800 p-3 w-full mt-6 text-white font-bold uppercase hover:bg-blue-950 rounded-md 
            cursor-pointer transition-colors" style={{ marginBottom: "20px" }}>
        Actualizar
      </button>

      {loading ? (
        <p>Un momento... Los registros se están cargando.</p>
      ) : registros.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.id}</td>
                <td>{registro.nombre}</td>
                <td>{registro.telefono}</td>
                <td>{registro.email}</td>
                <td>{registro.direccion}</td>
                <td>
                  <button
                    onClick={() => eliminarRegistro(registro.id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-800"
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                <button
                    onClick={() => editarRegistro(registro.id)}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-800"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay registros disponibles.</p>
      )}


      {/* Modal para editar registro */}
      {modalVisible && registroSeleccionado && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          <h2>Editar Registro</h2>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={registroSeleccionado.nombre}
              onChange={handleInputChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              name="telefono"
              value={registroSeleccionado.telefono}
              onChange={handleInputChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={registroSeleccionado.email}
              onChange={handleInputChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              name="direccion"
              value={registroSeleccionado.direccion}
              onChange={handleInputChange}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <button onClick={guardarCambios} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-800">
            Guardar Cambios
          </button>
          <button
            onClick={() => setModalVisible(false)}
            className="bg-gray-600 text-white p-2 rounded hover:bg-gray-800"
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        </div>
      )}

    </div>
  );
};

export default ListaDeRegistros;
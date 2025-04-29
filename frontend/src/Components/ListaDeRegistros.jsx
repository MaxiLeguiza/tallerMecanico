import React from "react";
import { useState } from "react";

const ListaDeRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div>
      <h1>Listado de Registros</h1>
      {/* Botón para traer los registros */}
      <button onClick={fetchRegistros} style={{ marginBottom: "20px" }}>
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay registros disponibles.</p>
      )}
    </div>
  );
};

export default ListaDeRegistros;
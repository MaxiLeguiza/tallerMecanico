import React, { useState } from "react";
import "./../Style/estiloDeLista.css"; // Importar el archivo de estilos

const BuscarVehiculoPorMatricula = () => {
  const [patente, setPatente] = useState("");
  const [vehiculo, setVehiculo] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [reparaciones, setReparaciones] = useState([]);
  const [error, setError] = useState(null);

  // Función para buscar el vehículo por matrícula
  const buscarVehiculo = async () => {
    if (!patente) {
      alert("Por favor, ingresa una matrícula.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/vehiculos/patente/${patente}`);
      if (!response.ok) {
        throw new Error("No se encontró el vehículo o hubo un error en la búsqueda.");
      }

      const datos = await response.json();
      setVehiculo(datos.vehiculo);
      setCliente(datos.cliente);
      setReparaciones(datos.reparaciones);
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      setVehiculo(null);
      setCliente(null);
      setReparaciones([]);
    }
  };

  return (
    <div>
      <h1>Busqueda de Vehiculos</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Ingresa la patente del vehículo"
          value={patente}
          onChange={(e) => setPatente(e.target.value)}
          style={{ padding: "10px", marginRight: "10px", width: "300px" }}
        />
        <button onClick={buscarVehiculo} className="bg-orange-600 text-white p-2 rounded hover:bg-blue-800">
          Buscar
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {vehiculo && (
        <div>
          <h2>Datos del Vehículo</h2>
          <table border="1" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Matrícula</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Año</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{vehiculo.id}</td>
                <td>{vehiculo.patente}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.anio}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {cliente && (
        <div style={{ marginTop: "20px" }}>
          <h2>Datos del Cliente</h2>
          <table border="1" className="table">
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
              <tr>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.email}</td>
                <td>{cliente.direccion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {reparaciones.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Reparaciones Asociadas</h2>
          <table border="1" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {reparaciones.map((reparacion) => (
                <tr key={reparacion.id}>
                  <td>{reparacion.id}</td>
                  <td>{reparacion.descripcion}</td>
                  <td>{reparacion.fecha}</td>
                  <td>{reparacion.costo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vehiculo && reparaciones.length === 0 && (
        <p style={{ marginTop: "20px" }}>Este vehículo no tiene reparaciones asociadas.</p>
      )}
    </div>
  );
};

export default BuscarVehiculoPorMatricula;
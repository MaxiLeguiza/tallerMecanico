import React, { useState, useEffect } from "react";

const EditarDatos = ({ registroEditado, cerrarModal, fetchRegistros }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [alerta, setAlerta] = useState({});

  // Cargar los datos del registro seleccionado
  useEffect(() => {
    if (registroEditado) {
      setNombre(registroEditado.nombre);
      setTelefono(registroEditado.telefono);
      setEmail(registroEditado.email);
      setDomicilio(registroEditado.direccion);
    }
  }, [registroEditado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !telefono || !email || !domicilio) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    const clienteActualizado = {
      id: registroEditado.id,
      nombre,
      telefono,
      email,
      direccion: domicilio,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/clientes/${registroEditado.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clienteActualizado),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el cliente");
      }

      await response.json();
      setAlerta({ msg: "Cliente actualizado correctamente", error: false });
      fetchRegistros(); // Actualizar la lista de registros
      cerrarModal(); // Cerrar el modal
    } catch (error) {
      console.error("Error:", error);
      setAlerta({ msg: "Hubo un error al actualizar el cliente", error: true });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {alerta && (
          <p className={alerta.error ? "text-red-500" : "text-green-500"}>
            {alerta.msg}
          </p>
        )}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Domicilio"
          value={domicilio}
          onChange={(e) => setDomicilio(e.target.value)}
        />
        <button type="submit">Actualizar Cliente</button>
        <button type="button" onClick={cerrarModal}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditarDatos;
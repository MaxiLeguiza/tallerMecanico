import React from 'react'
import { useState } from 'react'
import Alerta from './Alerta';


const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('')
    const [domicilio, setDomicilio] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar que el formulario recargue la página
    
        // Validar campos
        if (!nombre || !telefono || !email || !domicilio) {
          setAlerta({ msg: "Todos los campos son obligatorios", error: true });
          return;
        }
    
        // Crear el objeto con los datos del formulario
        const nuevoCliente = {
          nombre,
          telefono,
          email,
          direccion: domicilio,
        };
    
        try {
          // Enviar los datos al backend con fetch
          const response = await fetch("http://127.0.0.1:5000/api/add_clientes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoCliente),
          });
    
          if (!response.ok) {
            throw new Error("Error al guardar el cliente");
          }
    
          const data = await response.json();
          console.log("Cliente guardado:", data);
    
          // Mostrar mensaje de éxito
          setAlerta({ msg: "Cliente agregado correctamente", error: false });
    
          // Limpiar el formulario
          setNombre("");
          setTelefono("");
          setEmail("");
          setDomicilio("");
        } catch (error) {
          console.error("Error:", error);
          setAlerta({ msg: "Hubo un error al guardar el cliente", error: true });
        }
      };
    
      const { msg } = alerta

      return (
        <>
          <form
            className="text-left bg-white w-lg py-10 px-5 mb-10 shadow-md rounded-md"
            onSubmit={handleSubmit}
          >
            {alerta && <Alerta alerta={alerta}/>}
    
            <p className="text-lg text-left mb-10 uppercase font-bold">
              Crear un Nuevo Cliente
            </p>
    
            <div className="mb-5">
              <label
                htmlFor="nombre"
                className="text-blue-900 uppercase font-bold"
              >
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre Cliente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="telefono"
                className="text-blue-900 uppercase font-bold"
              >
                Teléfono
              </label>
              <input
                id="telefono"
                type="number"
                placeholder="Teléfono"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="text-blue-900 uppercase font-bold">
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Email Cliente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="domicilio"
                className="text-blue-900 uppercase font-bold"
              >
                Domicilio
              </label>
              <input
                id="domicilio"
                type="text"
                placeholder="Domicilio cliente"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
              />
            </div>
    
            <input
              type="submit"
              className="bg-blue-800 p-3 w-full mt-6 text-white font-bold uppercase hover:bg-blue-950 rounded-md 
                cursor-pointer transition-colors"
              value="Agregar Cliente"
            />
          </form>
        </>
      );
    };
    
    export default Formulario;
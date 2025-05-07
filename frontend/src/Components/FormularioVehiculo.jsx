import React from 'react'
import { useState } from 'react'
import Alerta from './Alerta';

const FormularioVehiculo = () => {
  const [marca, setMarca] = useState('')
     const [modelo, setModelo] = useState('')
     const [año, setAño] = useState('')
     const [patente, setPatente] = useState('')
      const [cliente_id, setCliente_id] = useState('')
 
     const [alerta, setAlerta] = useState({})
 
     const handleSubmit = async (e) => {
         e.preventDefault(); // Evitar que el formulario recargue la página
     
         // Validar campos
         if (!marca || !modelo || !año || !patente || !cliente_id) {
           setAlerta({ msg: "Todos los campos son obligatorios", error: true });
           return;
         }
     
         // Crear el objeto con los datos del formulario
         const nuevoVehiculo = {
           marca,
           modelo,
           año,
           patente,
            cliente_id,
         };
     
         try {
           // Enviar los datos al backend con fetch
           const response = await fetch("http://127.0.0.1:5000/vehiculos", {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify(nuevoVehiculo),
           });
     
           if (!response.ok) {
             throw new Error("Error al guardar el vehiculo");
           }
     
           const data = await response.json();
           console.log("Vehiculo guardado:", data);
     
           // Mostrar mensaje de éxito
           setAlerta({ msg: "Vehiculo agregado correctamente", error: false });
     
           // Limpiar el formulario
           setMarca("");
           setModelo("");
           setAño("");
           setPatente("");
           setCliente_id("");
         } catch (error) {
           console.error("Error:", error);
           setAlerta({ msg: "Hubo un error al guardar el vehiculo", error: true });
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
               Crear un Nuevo Vehiculo
             </p>
     
             <div className="mb-5">
               <label
                 htmlFor="marca"
                 className="text-blue-900 uppercase font-bold"
               >
                 Marca
               </label>
               <input
                 id="marca"
                 type="text"
                 placeholder="Nombre Marca"
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                 value={marca}
                 onChange={(e) => setMarca(e.target.value)}
               />
             </div>
             <div className="mb-5">
               <label
                 htmlFor="modelo"
                 className="text-blue-900 uppercase font-bold"
               >
                 Modelo
               </label>
               <input
                 id="modelo"
                 type="text"
                 placeholder="Modelo"
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                 value={modelo}
                 onChange={(e) =>  setModelo(e.target.value)}
               />
             </div>
             <div className="mb-5">
               <label htmlFor="año" className="text-blue-900 uppercase font-bold">
                 Año
               </label>
               <input
                 id="año"
                 type="number"
                 placeholder="Año de Fabricacion"
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                 value={año}
                 onChange={(e) => setAño(e.target.value)}
               />
             </div>
             <div className="mb-5">
               <label
                 htmlFor="patente"
                 className="text-blue-900 uppercase font-bold"
               >
                 Patente
               </label>
               <input
                 id="patente"
                 type="text"
                 placeholder="Patente vehiculo"
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                 value={patente}
                 onChange={(e) => setPatente(e.target.value)}
               />
             </div>
             <div className="mb-5">
               <label
                 htmlFor="cliente"
                 className="text-blue-900 uppercase font-bold"
               >
                 Cliente
               </label>
               <input
                 id="cliente"
                 type="text"
                 placeholder="Cliente vehiculo"
                 className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                 value={cliente_id}
                 onChange={(e) => setCliente_id(e.target.value)}
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

export default FormularioVehiculo
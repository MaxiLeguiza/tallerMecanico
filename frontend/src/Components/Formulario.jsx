import React from 'react'
import { useState } from 'react'

const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState(0)
    const [email, setEmail] = useState('')
    const [domicilio, setDomicilio] = useState('')

    const [alert, setAlerta] = useState({})

  return (
    <>
    
    <form 
    className='text-left bg-white w-lg py-10 px-5 mb-10 shadow-md rounded-md'
    >
    <p className='text-lg text-left mb-10 uppercase font-bold'>
        Crear un Nuevo Cliente
    </p>

        <div className='mb-5'>
            <label 
                htmlFor='nombre'
                className='text-blue-900 uppercase font-bold'
            >Nombre</label>
            <input 
            id='nombre' 
            type='text' 
            placeholder='Nombre Cliente' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            />

        </div>
        <div className='mb-5'>
            <label 
                htmlFor='telefono'
                className='text-blue-900 uppercase font-bold'
            >Telefono</label>
            <input 
            id='telefono' 
            type='number' 
            placeholder='Telefono' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={telefono}
            onChange={e => setNombre(e.target.value)}
            />

        </div>
        <div className='mb-5'>
            <label 
                htmlFor='email'
                className='text-blue-900 uppercase font-bold'
            >Email</label>
            <input 
            id='email' 
            type='text' 
            placeholder='Email Cliente' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={e => setNombre(e.target.value)}
            />

        </div>
        <div className='mb-5'>
            <label 
                htmlFor='domicilio'
                className='text-blue-900 uppercase font-bold'
            >Domicilio</label>
            <input 
            id='domicilio' 
            type='text' 
            placeholder='Domicilio cliente' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={domicilio}
            onChange={e => setNombre(e.target.value)}
            />

        </div>

        <input
            type='submit'
            className='bg-blue-800 p-3 w-full mt-6 text-white font-bold uppercase hover:bg-blue-950 rounded-md 
            cursor-pointer transition-colors'
            value="Agregar Cliente"

        />
    </form>

    </>

  )
}

export default Formulario
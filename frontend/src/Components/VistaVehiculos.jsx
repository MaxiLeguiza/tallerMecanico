import React from 'react'
import FormularioVehiculo from './FormularioVehiculo'
import ListaDeVehiculos from './ListaDeVehiculos'


const VistaVehiculos = () => {
  return (
    <>
        <div className='grid-container'>
        <div><FormularioVehiculo/></div>
        <div><ListaDeVehiculos/></div>
        </div>
    </>
  )
}

export default VistaVehiculos
import React from 'react'
import FormularioVehiculo from './FormularioVehiculo'
import ListaDeVehiculos from './ListaDeVehiculos'
import BuscarVehiculoPorMatricula from './BuscarVehiculosPorMatricula'

const VistaVehiculos = () => {
  return (
    <>
        <div className='grid-container'>
        <div><FormularioVehiculo/></div>
        <div><ListaDeVehiculos/></div>
        <div><BuscarVehiculoPorMatricula/></div>
        </div>
    </>
  )
}

export default VistaVehiculos
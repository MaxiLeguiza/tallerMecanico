import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Formulario from './Components/Formulario.jsx'
import ListaDeRegistros from './Components/ListaDeRegistros.jsx'
import './Style/main.css'
import BuscarVehiculoPorMatricula from './Components/BuscarVehiculosPorMatricula.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
   
    <div className="grid-container">
      <div> <Formulario/></div>
      <div><ListaDeRegistros/></div>
      <div><BuscarVehiculoPorMatricula/></div>
      
    </div>
  </StrictMode>,
)

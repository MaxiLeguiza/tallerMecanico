import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Formulario from './Components/formulario.jsx'
import ListaDeRegistros from './Components/ListaDeRegistros.jsx'
import './Style/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <div className="grid-container">
    <div><Formulario/></div>
    <div><ListaDeRegistros/></div>
    </div>
  </StrictMode>,
)

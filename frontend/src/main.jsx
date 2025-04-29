import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
import Formulario from './Components/formulario.jsx'
import ListaDeRegistros from './Components/ListaDeRegistros.jsx'
import './Style/main.css'
=======
import Formulario from './Components/Formulario'
>>>>>>> 49547cc30067a8628f5f1f381b4e91c2a3e92918

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <div className="grid-container">
    <div><Formulario/></div>
    <div><ListaDeRegistros/></div>
    </div>
  </StrictMode>,
)

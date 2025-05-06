import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ClientesPage from "./pages/ClientesPage"
import VehiculosPage from "./pages/VehiculosPage"
import ReparacionesPage from "./pages/ReparacionesPage"
import React from 'react'
import './Style/App.css'

function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/vehiculos" element={<VehiculosPage />} />
          <Route path="/reparaciones" element={<ReparacionesPage />} />
        </Routes>
      </Router>   
    </>
  )
}

export default App

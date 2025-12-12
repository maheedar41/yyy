import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import GenericPage from './pages/GenericPage'
import Login from './pages/Login'
import RegisterPage from './pages/Register'
import AccreditationWizard from './pages/AccreditationWizard'
import FacilityList from './pages/FacilityList'
import FacilityAdd from './pages/FacilityAdd'
import './styles.css'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth pages (standalone) */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<RegisterPage/>} />

        {/* App layout with sidebar for authenticated routes */}
        <Route path="/" element={<App />}>
          <Route index element={<Home/>} />
          <Route path="accreditation/accreditation-wizard" element={<AccreditationWizard/>} />
          <Route path="facility-management/list-facilities" element={<FacilityList/>} />
          <Route path="facility-management/add-facility" element={<FacilityAdd/>} />
          {/* Allow additional nested segments (e.g. /accreditation/accreditation-list/view/:id) */}
          <Route path=":section/:page/*" element={<GenericPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

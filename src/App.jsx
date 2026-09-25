import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import Certificate from './pages/Certificate'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/module/:slug" element={<ModulePage />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

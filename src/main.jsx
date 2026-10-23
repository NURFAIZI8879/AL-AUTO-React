import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/global.css'
import './styles/home.css'
import './styles/paket.css'
import './styles/pendaftaran.css'
import './styles/testimoni.css'
import './styles/absensi.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

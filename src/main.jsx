import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvidor from './context/AppContextProvidor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvidor>
        <App />
      </AppContextProvidor>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './components/context/context'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async';
import Provider from './components/Provider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Toaster position="bottom-right" /> 
     
<Provider><App /></Provider>
   
    
   
  </StrictMode>,
)

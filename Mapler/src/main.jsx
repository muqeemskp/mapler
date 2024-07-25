import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { CityProvider } from './Components/hook/useCity.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CityProvider>
      <App />
    </CityProvider>
  </React.StrictMode>,
)

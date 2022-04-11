import React from 'react'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // ! importando o BrowserRouter, para poder usar las rutas

import ReactDOMClient from 'react-dom/client'
import App from './App'

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Fonts
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'

// CSS import order is load-bearing:
// reset → tokens → palette → typography → base → components → pages
import './styles/reset.css'
import './theme/tokens.css'
import './theme/void.css'
import './theme/typography.css'
import './styles/base.css'
import './components/components.css'
import './components/ProfilePanel.css'
import './pages/pages.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

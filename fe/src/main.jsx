import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from './main/GlobalStyles'
import { AuthProvider } from './main/context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </AuthProvider>
  </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PayPalScriptProvider 
      options={{
        "client-id": "AYRHC9fSwfA035u8tguaG0vBwmoDp6uxMUK5UK7c_h474p6fThHDQEkZh8xv0enH24HNkOsX4JC3Kfwo"
      }}
    >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>,
)

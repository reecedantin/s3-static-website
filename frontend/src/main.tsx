import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import { getAwsConfig } from './aws-config.ts'
import './index.css'
import App from './App.tsx'

// Initialize Amplify with config
getAwsConfig().then(config => {
  Amplify.configure(config)
  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})

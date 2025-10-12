import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { orange, pink } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: pink,
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './_core/theme'
import { store } from './_core/redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
        <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </React.StrictMode>,
)

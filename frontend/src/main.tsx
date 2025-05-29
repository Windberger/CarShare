import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {UserProvider} from "./context/UserContext.tsx";
import {RouteProvider} from "./context/RouteContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouteProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </RouteProvider>
    </StrictMode>,
)

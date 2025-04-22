import './App.css'
import Login from "./pages/LoginPage/Login.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import CreateRouteForm from "./components/CreateRouteForm.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="createCarpool" element={<CreateRouteForm></CreateRouteForm>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

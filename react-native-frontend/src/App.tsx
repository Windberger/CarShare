import './App.css'
import Login from "./pages/LoginPage/Login.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import CreateRouteForm from "./components/CreateRouteForm.tsx";
import RouteDetails from "./pages/DetailPage/RouteDetails.tsx";
import JoinRouteForm from "./components/JoinRouteForm.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="createCarpool" element={<CreateRouteForm></CreateRouteForm>}/>
                    <Route path="detailRoute/:id" element={<RouteDetails></RouteDetails>}/>
                    <Route path="joinRoute/:joinCode" element={<JoinRouteForm/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

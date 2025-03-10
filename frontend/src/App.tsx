import './App.css'
import Login from "./pages/LoginPage/Login.tsx";
import Homepage from "./pages/Homepage/Homepage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="login" element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App

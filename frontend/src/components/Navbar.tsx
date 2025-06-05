import React, { useContext } from "react";
import {useNavigate} from "react-router-dom";
import {SlArrowLeft} from "react-icons/sl";
import {logoutUser} from "../services/LoginService.ts";
import {UserContext} from "../context/UserContext.tsx";

interface NavbarProps {
    previousPage: string | null
}

function Navbar(props: NavbarProps) {

    const navigate = useNavigate();
    const {previousPage} = props;

    const userContext = useContext(UserContext);
    if(userContext == null) {
        throw new Error("UserContext is not provided");
    }

    const {setUserId} = userContext;

    const logout = () => {
        logoutUser().then((response) => {
            if(response.status == 200) {
                console.log("Logged out successfully");
                setUserId(null);
                navigate("/");
            } else {
                console.error("Logout failed");
            }
        }).catch((error) => {
            console.error("Error during logout:", error);
        });
    }

    return (
        <div className={"w-full"}>
            <nav className="bg-[#194569] text-white p-4 flex justify-between">
                { previousPage &&

                    <a onClick={() => navigate("/" + previousPage)} className="mr-4 flex items-center cursor-pointer">
                        <SlArrowLeft className="mr-3"/>
                        Back
                    </a>
                }
                {
                    !previousPage &&
                    <a className="text-xl font-bold hover:text-white cursor-pointer" onClick={() => navigate("/")}>CarShare</a>
                }
                <button onClick={logout}>Logout</button>
            </nav>
        </div>
    );
}

export default Navbar;
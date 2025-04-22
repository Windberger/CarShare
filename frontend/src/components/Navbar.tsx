import React from 'react';
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <div className={"w-full"}>
            <nav className="bg-[#194569] text-white p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">CarShare</h1>
                <ul className="flex space-x-4">

                </ul>

            </nav>
        </div>
    );
}

export default Navbar;
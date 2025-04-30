import {useState} from "react";
import {IRoute} from "../model/IRoute.ts";

/**
 * @author Johanna Hechtl
 * @since 22.04.2025
 */


interface RoutesCardProps {
    title: string,
    routes: IRoute[]
}

function RoutesCard({title, routes}: RoutesCardProps) {

    return (
        <div className={"p-4 m-8"}>
            <h2 className="text-[#194569] text-xl font-semibold mb-2">{title}</h2>

            <div className="p-4 border-2 border-[#194569] rounded-xl shadow-md">
                <ul className="list-disc pl-5 text-gray-700">
                    {routes.map((route, index) => (
                        <li key={index}>Start address: {route.startAddress.street}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RoutesCard;
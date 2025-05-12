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

            <div className="p-4 border-2 border-[#194569] rounded-xl shadow-md text-black">
                    {routes.map((route, key) => (
                        <div key={key} className={"bg-gray-100 m-2 p-2 rounded-xl flex justify-between items-center"}>
                            <div className={"w-[300px] truncate"}>From {route.startAddress.city} to {route.endAddress.city}
                            </div>
                            <div className={"text-right whitespace-nowrap"}>
                                Join Code: {route.joinCode}
                            </div>
                        </div>
                   ))}

            </div>
        </div>
    );
}

export default RoutesCard;
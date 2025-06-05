import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {IRoute} from "../model/IRoute.ts";

/**
 * @author Johanna Hechtl
 * @since 22.04.2025
 */


interface RoutesCardProps {
    title: string,
    routes: IRoute[],
    setModalOpen: (open: boolean) => void
}

function RoutesCard({title, routes, setModalOpen}: RoutesCardProps) {
    const navigate = useNavigate();


    function handleClick(id: number) {
        navigate(`/detailRoute/${id}`);
    }

    return (
        <div className={"p-4 m-8"}>
            <h2 className="text-[#194569] text-xl font-semibold mb-2">{title}</h2>

            {
                routes.length == 0 &&
                <div className="text-black">
                    {title === "Recent Routes" ?
                        <div>
                            <div>You don't have created a route yet</div>
                            <a onClick={() => navigate('/createCarpool')} className="cursor-pointer">Create a new
                                route</a>
                        </div>
                        :
                        <div>
                            <div>You haven't joined a route yet</div>
                            <a onClick={() => setModalOpen(true)} className="cursor-pointer">Join a route</a>
                        </div>
                    }
                </div>
            }
            {
                routes.length != 0 &&
                <div className="p-4 border-2 hover:border-[#194569]  hover:shadow-2xl rounded-xl shadow-xl text-black">
                    {routes.map((route, key) => (
                        <div key={key} className={"bg-gray-100 m-2 p-2 rounded-xl flex justify-between items-center cursor-pointer hover:scale-105"}
                             onClick={() => handleClick(route.routeId)}>
                            <div
                                className={"w-[300px] truncate  "}>From {route.startAddress.city} to {route.endAddress.city}
                            </div>
                            <div className={"text-right whitespace-nowrap"}>
                                Join Code: {route.joinCode}
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default RoutesCard;
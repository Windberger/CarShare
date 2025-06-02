import React, {useContext} from "react";
import Navbar from "../../components/Navbar.tsx";
import {useParams} from "react-router-dom";
import {RouteContext} from "../../context/RouteContext.tsx";
import {IRoute} from "../../model/IRoute.ts";


function RouteDetails() {
    const {id} = useParams();
    const {recentRoutes, joinedRoutes} = useContext(RouteContext)!;
    const routeId = Number(id);

    const route =
        recentRoutes.find((r) => r.routeId === routeId) ||
        joinedRoutes.find((r) => r.routeId === routeId);

    console.log(recentRoutes)
    console.log(id)
    console.log(route)

    return (
        <>
            <div className={"bg-white min-h-screen w-screen"}>

                <Navbar previousPage={'dashboard'}/>
                <div className="bg-white text-black m-10">
                    <p className={"text-[#194569] text-4xl font-bold"}>Route to {route?.startAddress.city}</p>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="space-y-4">

                            </div>

                            <div className="mt-6 text-black space-y-1 text-base">
                                <p>Distance: 54,43 km</p>
                                <p>Estimated fuel consumption: 5 litres</p>
                                <p>Estimated costs (at a price of 1,64€ per litre): <strong>8,2€</strong></p>
                            </div>

                            <button className="mt-4 px-4 py-2 bg-[#194569] text-white rounded-3xl">
                                Export route to Google Maps
                            </button>
                        </div>


                        <div>
                            {/* Map */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RouteDetails;
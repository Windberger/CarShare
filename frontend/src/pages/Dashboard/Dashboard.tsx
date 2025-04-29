import React, {useState, useContext, useEffect} from "react";
import Navbar from "../../components/Navbar.tsx";
import RoutesCard from "../../components/RoutesCard.tsx";
import {IoMdAdd} from "react-icons/io";
import {Link} from "react-router-dom";
import {IRoute} from "../../model/IRoute.ts";
import {UserContext} from "../../context/UserContext.tsx";
import {getJoinedRoutes, getRoutes} from "../../services/RouteService.ts";

/**
 * @author Johanna Hechtl
 * @since 25.03.2025
 */

Dashboard.propTypes = {};

interface DashboardProps {
    title: unknown
}


function Dashboard(props) {
    const [driverRoutes, setDriverRoutes] = useState<IRoute[]>([]);
    const [joinRoutes, setJoinRoutes] = useState<IRoute[]>([]);
    const {userId} = useContext(UserContext)!;


    const getRoutesForCards = (userId: number | null) => {
        getRoutes(userId)
            .then((routes) => {
                setDriverRoutes(routes);
            })
            .catch((error) => {
                console.error("Error fetching driver routes:", error);
                alert("An error occurred while fetching driver routes. Please try again later.");
            });

        getJoinedRoutes(userId)
            .then((routes) => {
                setJoinRoutes(routes);
            })
            .catch((error) => {
                console.error("Error fetching joined routes:", error);
                alert("An error occurred while fetching joined routes. Please try again later.");
            });
    };


    useEffect(() => {
        getRoutesForCards(userId);

    }, []);


    return (
        <div className={"bg-white min-h-screen w-screen"}>
            <Navbar/>
            <div className="flex gap-4 mb-6 m-4">
                <Link
                    to="/createCarpool"
                    className="flex items-center gap-2 px-4 py-2 bg-[#194569] text-white shadow rounded-3xl"
                >
                    <IoMdAdd/> Add Route
                </Link>
                <Link to={"/"} className="px-4 py-2 bg-[#194569] text-white rounded-3xl shadow">
                    Join Carpool
                </Link>
            </div>


            <div className="grid grid-cols-2 gap-6">
                <RoutesCard title={"Recent Routes"} routes={driverRoutes}></RoutesCard>
                <RoutesCard title={"Recent Joined Routes"} routes={joinRoutes}></RoutesCard>

            </div>
        </div>

    );
}

export default Dashboard;
import {useState, useContext, useEffect} from "react";
import Navbar from "../../components/Navbar.tsx";
import RoutesCard from "../../components/RoutesCard.tsx";
import {IoMdAdd} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {IRouteContext} from "../../model/IRoute.ts";
import {UserContext} from "../../context/UserContext.tsx";
import {getJoinedRoutes, getRoutes, routeExists} from "../../services/RouteService.ts";

/**
 * @author Johanna Hechtl
 * @since 25.03.2025
 */

Dashboard.propTypes = {};

function Dashboard() {
    const [driverRoutes, setDriverRoutes] = useState<IRouteContext[]>([]);
    const [joinRoutes, setJoinRoutes] = useState<IRouteContext[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const navigate = useNavigate();

    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("Context not found");
    }
    const {userId} = userContext;


    const getRoutesForCards = (userId: number | null) => {

        if (userId == null) {
            console.error("User ID is null!");
        }

        getRoutes(userId)
            .then((routes) => {
                setDriverRoutes(routes);
            })
            .catch((error) => {
                console.error("Error fetching driver routes:", error);
            });

        getJoinedRoutes(userId)
            .then((routes) => {
                setJoinRoutes(routes);
            })
            .catch((error) => {
                console.error("Error fetching joined routes:", error);
            });
    };

    const handleJoinCarpool = () => {
        routeExists(joinCode)
            .then((existing) => {
                if (existing == true) {
                    navigate("/joinRoute/" + joinCode);
                } else {
                    alert("This route does not exist");
                }
            })
            .catch((error) => {
                if (error.status == 404) {
                    alert("A route with this code does not exist!");
                } else {
                    alert("An unknown error occurred!");
                }
            })

        setIsModalOpen(false);
    };

    const setModalOpen = (open: boolean) => {
        setIsModalOpen(open);
    }

    useEffect(() => {
        if (!userId) {
            console.warn("User ID is null!");
            return;
        }
        getRoutesForCards(userId)
    }, [userId]);

    return (
        <div className="bg-white min-h-screen w-screen">
            {
                !userId ?
                    <div className="text-black">
                        <div>Please log in to access this page</div>
                        <a onClick={() => navigate("/")} className="cursor-pointer">Back to Homepage</a>
                    </div>
                    :

                    <div className={"bg-white min-h-screen w-screen"}>


                        <Navbar previousPage={null}/>
                        <div className="flex gap-4 mb-6 m-4">
                            <button
                                onClick={()=>navigate('/createCarpool')}
                                className="flex items-center gap-2 px-4 py-2 bg-[#194569] text-white shadow rounded-3xl"
                            >
                                <IoMdAdd/> Add Route
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="px-4 py-2 bg-[#194569] text-white rounded-3xl shadow"
                            >
                                Join Carpool
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <RoutesCard title={"Recent Routes"} routes={driverRoutes}
                                        setModalOpen={setModalOpen}></RoutesCard>
                            <RoutesCard title={"Recent Joined Routes"} routes={joinRoutes}
                                        setModalOpen={setModalOpen}></RoutesCard>
                        </div>

                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <h2 className="text-lg text-black font-bold mb-4">Enter Join Code</h2>
                                    <input
                                        type="text"
                                        value={joinCode}
                                        onChange={(e) => setJoinCode(e.target.value)}
                                        className="border p-2 w-full mb-4"
                                        placeholder="Enter join code"
                                    />
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 bg-gray-300 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleJoinCarpool}
                                            className="px-4 py-2 bg-[#194569] text-white rounded-lg"
                                        >
                                            Join
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
}

export default Dashboard;
import Navbar from "../../components/Navbar.tsx";
import RoutesCard from "../../components/RoutesCard.tsx";
import {IoMdAdd} from "react-icons/io";
import {Link} from "react-router-dom";

/**
 * @author Johanna Hechtl
 * @since 25.03.2025
 */

Dashboard.propTypes = {};

interface DashboardProps {
    title: unknown
}

function Dashboard(props) {
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
                <RoutesCard title={"Recent Routes"}></RoutesCard>
                <RoutesCard title={"Recent Joined Routes"}></RoutesCard>

            </div>
        </div>

    );
}

export default Dashboard;
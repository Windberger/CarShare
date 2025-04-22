import Navbar from "../../components/Navbar.tsx";
import RoutesCard from "../../components/RoutesCard.tsx";
import { IoMdAdd } from "react-icons/io";

/**
 * @author Johanna Hechtl
 * @since 25.03.2025
 */

Dashboard.propTypes = {};

function Dashboard(props) {
    return (
        <div className={"bg-white min-h-screen w-screen"}>
            <Navbar/>
            {/* Buttons */}
            <div className="flex gap-4 mb-6 m-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#194569] text-white  shadow rounded-3xl">
                   <IoMdAdd /> Add Route
                </button>
                <button className="px-4 py-2 bg-[#194569] text-white rounded-3xl shadow">
                    Join Carpool
                </button>
            </div>

            {/* Route Sections */}
            <div className="grid grid-cols-2 gap-6">
                <RoutesCard></RoutesCard>
                <RoutesCard></RoutesCard>

            </div>
        </div>

    );
}

export default Dashboard;
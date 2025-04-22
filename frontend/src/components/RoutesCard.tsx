import {useState} from "react";
/**
 * @author Johanna Hechtl
 * @since 22.04.2025
 */


interface RoutesCardProps {
    title: string
}

function RoutesCard({title}: RoutesCardProps) {
    const [routes, setRoutes] = useState([
        "Route 1: City A to City B",
        "Route 2: City C to City D",
        "Route 3: City E to City F"
    ]);

    return (
        <div className={"p-4 m-8"}>
            <h2 className="text-[#194569] text-xl font-semibold mb-2">{title}</h2>

            <div className="p-4 border-2 border-[#194569] rounded-xl shadow-md">
            <ul className="list-disc pl-5 text-gray-700">
                {routes.map((route, index) => (
                    <li key={index}>{route}</li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default RoutesCard;
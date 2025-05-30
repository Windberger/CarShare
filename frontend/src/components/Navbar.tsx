import {useNavigate} from "react-router-dom";
import {SlArrowLeft} from "react-icons/sl";

interface NavbarProps {
    previousPage: string | null
}

function Navbar(props: NavbarProps) {

    const navigate = useNavigate();
    const {previousPage} = props;

    return (
        <div className={"w-full"}>
            <nav className="bg-[#194569] text-white p-4 flex items-center">
                { previousPage &&

                    <a onClick={() => navigate("/" + previousPage)} className="mr-4 flex items-center cursor-pointer">
                        <SlArrowLeft className="mr-3"/>
                        Back
                    </a>
                }
                {
                    !previousPage &&
                    <a className="text-xl font-bold hover:text-white cursor-pointer" onClick={() => navigate("/")}>CarShare</a>
                }
                <ul className="flex space-x-4">

                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
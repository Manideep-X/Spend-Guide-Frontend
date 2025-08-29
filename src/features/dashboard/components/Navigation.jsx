import { useContext, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContextProvidor";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../utils/GetAssets";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Squares2X2Icon as SolidSquares2X2Icon } from "@heroicons/react/24/solid";
import UserDetailCard from "./UserDetailCard";

const Navigation = () => {
    
    const [expandSideBar, setExpandSideBar] = useState(false);
    const [showProfileDetails, setShowProfileDetails] = useState(false);
    const moreOption = useRef(null);
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSignout = () => {
        setExpandSideBar(false);
        setShowProfileDetails(false);
        localStorage.clear();
        setUser(null);
        navigate("/signin")
    }

    return (
        <nav className="flex flex-col items-center gap-3 px-5 py-5 justify-between overflow-hidden
                        md:max-w-8xl w-full md:h-full md:rounded-r-2xl md:rounded-bl-[0px] rounded-b-2xl absolute md:relative top-0">

            {/* Background Modification */}
            <div className="absolute left-0 top-0 w-full h-full bg-white/55 -z-10"></div>
            
            {/* Mobile navigation button and Logo */}
            <div className="flex items-center md:justify-center justify-between w-full z-10">
                <img src={ASSETS.logo} alt="Spend Guide Logo" className="max-w-46 sm:max-w-50 lg:max-w-54" />
                <button 
                    className="md:hidden p-1 hover:bg-[#00000015] active:bg-[#00000029] rounded-sm transition-all"
                    onClick={() => setExpandSideBar(!expandSideBar)}>
                    { expandSideBar ?
                        <SolidSquares2X2Icon className="w-7 h-7" /> 
                        : <Squares2X2Icon className="w-7 h-7" />
                    }
                </button>
            </div>

            {/* Links for navigation */}

            {/* User Detail extendable card */}
            <UserDetailCard handleSignout = {handleSignout} />

        </nav>
    );

}

export default Navigation
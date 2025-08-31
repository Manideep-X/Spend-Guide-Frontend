import { useContext, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContextProvidor";
import { NavLink, useNavigate } from "react-router-dom";
import { ASSETS, NAV_LINK_DETAILS } from "../../../utils/GetAssets";
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
        <nav className={`flex flex-col items-center gap-3 md:p-5 p-4 justify-between overflow-hidden
                        ${expandSideBar ? 'h-[90%]' : 'h-19'} transition-all 
                        md:max-w-8xl w-full md:h-full md:rounded-r-2xl md:rounded-bl-[0px] rounded-b-2xl absolute md:relative top-0 z-20
                        `}>

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
            <section className="w-full flex flex-col overflow-y-scroll my-3 ml-2 thin-scrollbar-light">
                {NAV_LINK_DETAILS.map((e, i) => (
                    <NavLink 
                        to={e.navLink} 
                        key={`nav${i}`}
                        className="w-full"
                    >
                        {/* Navigation isActive toggle */}
                        {
                            ({ isActive }) => 
                                isActive ?
                                
                                <div className="h-full flex items-center gap-4 px-8 py-3 rounded-xl transition-all shadow-[inset_2px_50px_40px_rgba(255,255,255,0.7)]">
                                    {/* Navigation icon */}
                                    <div className="w-1/4 flex items-center justify-center">
                                        <e.selected className="w-7 h-7 stroke-[1.5] text-[#423E36]" />
                                    </div>
                                    {/* Navigation text */}
                                    <span className="block font-bold text-[16px] text-[#423E36] text-left">
                                        {e.navOption}
                                    </span>
                                </div>
                                :
                                <div className="h-full flex items-center gap-4 px-8 py-3 rounded-xl transition-all hover:shadow-[inset_2px_40px_15px_rgba(255,255,255,0.5)]">
                                    {/* Navigation icon */}
                                    <div className="w-1/4 flex items-center justify-center">
                                        <e.notSelected className="w-7 h-7 stroke-[1.5] text-[#423E36]" />
                                    </div>
                                    {/* Navigation text */}
                                    <span className="block font-semibold text-[16px] text-[#423E36] text-left">
                                        {e.navOption}
                                    </span>
                                </div>    
                        }
                        
                    </NavLink>
                ))}
            </section>

            {/* User Detail extendable card */}
            <UserDetailCard handleSignout = {handleSignout} />

        </nav>
    );

}

export default Navigation
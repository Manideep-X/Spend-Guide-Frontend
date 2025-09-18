import { ArrowRightEndOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { ASSETS, LANDING_TEXT } from "../utils/GetAssets"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer";
import { useState } from "react";

const LandingPage = () => {

    const navigate = useNavigate();
    const [navExpand, setNavExpand] = useState(false);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-[#423e36] thin-scrollbar-light">

        {/* navbar for landing page */}
        <nav className={`absolute top-0 left-0 w-full flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between px-5 py-3 font-semibold bg-white/50 backdrop-blur-sm md:h-auto overflow-hidden
        ${navExpand ? 'h-1/2 shadow-xl/15 rounded-b-2xl' : 'h-[80px]'} transition-all`}
        >

            <div className="flex items-center justify-between w-full md:w-auto">
                <img 
                    src={ASSETS.logo} 
                    alt="Spend Guide logo"
                    onClick={() => navigate("/")} 
                    className="w-50 hover:cursor-pointer"
                />
                <button 
                    onClick={() => setNavExpand(!navExpand)}
                    type="button"
                    className="md:hidden"
                >
                {
                    navExpand ?
                    <XMarkIcon className={`size-12 p-2 rounded-lg ${navExpand ? 'bg-white' : 'bg-none'} transition-all`} /> :
                    <Bars3Icon className={`size-12 p-2 rounded-lg ${navExpand ? 'bg-white' : 'bg-none'} transition-all`} />
                }

                </button>
            </div>

            <ul className="flex flex-col md:flex-row md:gap-12 gap-6 grow items-center md:justify-center justify-around">
                <li><a className="hover:underline hover:font-black hover:tracking-widest transition-all md:text-[16px] text-xl w-15 text-center block" href="#home">Home</a></li>
                <li><a className="hover:underline hover:font-black hover:tracking-widest transition-all md:text-[16px] text-xl w-15 text-center block" href="#about">About</a></li>
                <li><a className="hover:underline hover:font-black hover:tracking-widest transition-all md:text-[16px] text-xl w-15 text-center block" href="#links">Links</a></li>
            </ul>
            <div className="flex items-center justify-between gap-3 p-10 md:p-0">
                <button 
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="flex items-center justify-between py-2 px-4 rounded-lg shadow-lg/20 gap-2 mx-auto bg-black/5 hover:bg-black/10 active:shadow-none active:bg-black/20 hover:cursor-pointer transition-all"
                >
                    Sign In
                    <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                </button>
                <button 
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="relative flex items-center justify-between py-2 px-6 rounded-lg shadow-lg/30 gap-2 mx-auto bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e] text-white hover:cursor-pointer transition-all"
                >
                    Sign Up
                    <span className="absolute -top-1 -right-1 size-3 animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="absolute -top-1 -right-1 size-3 rounded-full bg-green-400"></span>
                </button>
            </div>
        </nav>

        {/* Call-to-action section */}
        <section id="home" className="relative w-4/5 h-3/4 border flex flex-col items-center justify-center">
            
            {/*  */}
            <div className="absolute h-full w-full -z-9 object-cover"></div>
            <img 
                src={ASSETS.cityBackground}
                alt="Background"
                className="absolute h-full w-full -z-10 object-cover"
            />

            <h2 className="text-5xl text-center font-black">
                {LANDING_TEXT.heading}
            </h2>
            <p className="text-lg font-semibold w-full text-center">
                {LANDING_TEXT.para}
            </p>
        </section>

        {/* Image section */}

        {/* About section */}

        {/* Footer section */}
        {/* <Footer /> */}

    </section>
  )
}

export default LandingPage
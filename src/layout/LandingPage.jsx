import { ArrowRightEndOnRectangleIcon, Bars3Icon, ClipboardDocumentListIcon, PresentationChartLineIcon, ShieldCheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ASSETS, LANDING_TEXT } from "../utils/GetAssets"
import { useNavigate } from "react-router-dom"
import Footer from "./Footer";
import { useEffect, useRef, useState } from "react";
import { ComputerDesktopIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

const LandingPage = () => {

    const navigate = useNavigate();
    const [navExpand, setNavExpand] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
      const touchOutsideNav = (e) => {
        if (navRef.current && !navRef.current.contains(e.target)) {
            setNavExpand(false);
        }
      }
      document.addEventListener("mousedown", touchOutsideNav);
    
      return () => {
        document.removeEventListener("mousedown", touchOutsideNav);
      }
    }, [navRef]);
    

    return (
        <section className="relative w-full h-screen text-[#423e36] thin-scrollbar overflow-x-hidden">

            {/* navbar for landing page */}
            <nav 
                ref={navRef}
                className={`fixed z-50 top-0 left-0 w-full flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-between px-5 py-3 font-semibold bg-white/10 backdrop-blur-sm md:h-auto overflow-hidden ${navExpand ? 'sm:h-1/2 h-7/12 shadow-xl/15 rounded-b-2xl' : 'h-[80px]'} transition-all`}
            >

                <div className="flex items-center justify-between w-full md:w-auto">
                    <img
                        src={ASSETS.logo}
                        alt="Spend Guide logo"
                        onClick={() => {
                            setNavExpand(false);
                            navigate("/");
                        }}
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

                <ul className="flex flex-col md:flex-row grow items-center md:justify-center justify-around text-[#2d2a24] md:text-[#423e36]">
                    <li><a 
                        onClick={() => setNavExpand(false)}
                        className="block w-full sm:w-28 px-5 sm:border-r sm:border-black/20 py-3 rounded-l-2xl sm:bg-white/80 hover:underline hover:font-black hover:tracking-widest transition-all md:text-[16px] text-xl text-center" 
                        href="#home"
                    >
                        Home
                    </a></li>
                    <li><a 
                        onClick={() => setNavExpand(false)}
                        className="block w-full sm:w-28 px-5 py-3 sm:bg-white/80 hover:underline hover:font-black hover:tracking-widest transition-all md:text-[16px] text-xl text-center" 
                        href="#about"
                    >
                        About
                    </a></li>
                    <li><a 
                        onClick={() => setNavExpand(false)}
                        className="block w-full sm:w-28 px-5 sm:border-l sm:border-black/20 py-3 rounded-r-2xl sm:bg-white/80 hover:underline hover:font-black hover:tracking-widest transition-all md:text-[16px] text-xl text-center" 
                        href="#links"
                    >
                        Links
                    </a></li>
                </ul>
                <div className="flex items-center justify-between gap-3 p-10 md:p-0">
                    <button
                        type="button"
                        onClick={() => navigate("/signin")}
                        className="flex items-center justify-between py-2 px-4 rounded-lg shadow-lg/20 gap-2 mx-auto bg-white/70 hover:bg-white/80 active:shadow-none active:bg-white hover:cursor-pointer transition-all"
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
                    </button>
                </div>
            </nav>

            {/* Call-to-action section */}
            <section id="home" 
                className="relative pt-18 w-full flex flex-col items-center justify-between"
            >

                {/* background image */}
                <img
                    src={ASSETS.backgroundLight}
                    alt="Background"
                    className="absolute md:h-2/3 sm:h-3/4 h-7/8 w-full -z-10 top-0 object-cover opacity-30"
                />

                {/* Call-to-action text and button */}
                <div className="grow md:text-xl sm:text-[15px] md:h-80 sm:h-86 h-96 sm:w-3/4 w-full px-3 sm:px-0 text-center items-center justify-center flex flex-col">
                    <div className="flex flex-col gap-2 text-[#423e36]">
                        <p className="text-center font-black sm:text-3xl text-2xl">{LANDING_TEXT.para}</p>
                        <p className="text-center font-semibold text-[#1d722e] sm:text-[16px] text-sm opacity-90 pb-4">{LANDING_TEXT.para2}</p>
                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="relative text-sm sm:text-[15px] font-medium flex items-center justify-between py-3 px-8 rounded-lg shadow-lg/40 gap-2 mx-auto bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e] text-white hover:cursor-pointer transition-all"
                        >
                            {LANDING_TEXT.buttonText}
                            <PaperAirplaneIcon className="text-white w-5 sm:w-7" />
                            <span className="absolute -top-1 -right-1 size-3 animate-ping rounded-full bg-[#765e2b] opacity-75"></span>
                            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-[#7b6431]"></span>
                        </button>
                    </div>
                </div>

                {/* Screenshot images and it's heading */}
                <div className="grow flex flex-col items-center justify-center w-full">
                    <h2 className="grow-0 md:text-[45px] sm:text-3xl px-5 py-2 sm:px-0 text-3xl text-center font-black">
                        {LANDING_TEXT.heading} <p className="inline text-[#25933b]">{LANDING_TEXT.heading2}</p>
                    </h2>
                    <div className="w-full flex flex-col items-center justify-between ">
                        <div className="relative sm:w-3/4 w-11/12 rounded-xl shadow-xl/25">
                            <img
                                src={ASSETS.screenshotPc}
                                alt="PC screenshot"
                                className="rounded-xl border-4 border-green-100"
                            />
                            <img
                                src={ASSETS.screenshotMobile}
                                alt="Mobile screenshot"
                                className="rounded-lg border-4 border-green-100 w-[17%] absolute -bottom-1/8 left-1/10 shadow-2xl/40"
                            />
                        </div>
                        <div className="flex items-center justify-center w-full px-15 pt-20 gap-4">
                            <div className="md:w-8 sm:w-10 w-18 grow-0">
                                <ComputerDesktopIcon />
                            </div>
                            <p className="md:text-lg sm:text-[16px] text-sm text-center font-bold">
                                {LANDING_TEXT.imageText}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About section */}
            <section id="about" 
                className="flex flex-col items-center justify-center gap-5 py-28"
            >
                <h2 className="text-3xl font-black text-center">
                    {LANDING_TEXT.aboutMainHead}
                    <p className="inline text-[#25933b]">{LANDING_TEXT.aboutMainHead2}</p>
                    {LANDING_TEXT.aboutMainHead3}
                </h2>
                <section className="flex flex-wrap items-center justify-around gap-10 px-20">
                    <div className="flex flex-col gap-2 min-h-64 min-w-78 flex-1 p-10 border border-black/10 shadow-xl/20 rounded-2xl">
                        <ClipboardDocumentListIcon className="stroke-2 min-w-13 w-13 p-3 bg-[#3eb0537b] text-[#2a7a39] rounded-lg" />
                        <h2 className="text-xl font-black text-left pt-3">{LANDING_TEXT.aboutHead1}</h2>
                        <p className="font-semibold sm:text-sm text-[13px] text-[#1d722e] opacity-85 text-left w-full">{LANDING_TEXT.aboutPara1}</p>
                    </div>
                    <div className="flex flex-col gap-2 h-64 min-w-78 flex-1 p-10 border border-black/10 shadow-xl/20 rounded-2xl">
                        <PresentationChartLineIcon className="stroke-2 w-13 p-3 bg-[#3eb0537b] text-[#2a7a39] rounded-lg" />
                        <h2 className="text-xl font-black text-left pt-3">{LANDING_TEXT.aboutHead2}</h2>
                        <p className="font-semibold sm:text-sm text-[13px] text-[#1d722e] opacity-85 text-left w-full">{LANDING_TEXT.aboutPara2}</p>
                    </div>
                    <div className="flex flex-col gap-2 h-64 min-w-78 flex-1 p-10 border border-black/10 shadow-xl/20 rounded-2xl">
                        <ShieldCheckIcon className="stroke-2 w-13 p-3 bg-[#3eb0537b] text-[#2a7a39] rounded-lg" />
                        <h2 className="text-xl font-black text-left pt-3">{LANDING_TEXT.aboutHead3}</h2>
                        <p className="font-semibold sm:text-sm text-[13px] text-[#1d722e] opacity-85 text-left w-full">{LANDING_TEXT.aboutPara3}</p>
                    </div>
                </section>
            </section>

            {/* End call-to-action section */}
            <section 
                className="relative md:mb-32 mb-40 px-5 py-15 w-full flex items-center justify-center flex-col gap-5"
            >

                {/* background image blur */}
                <img
                    src={ASSETS.backgroundLight}
                    alt="Background"
                    className="absolute w-full h-full blur-2xl -z-10 top-0"
                />

                <h2 className="text-3xl font-black text-center text-shadow-xs/30">
                    {LANDING_TEXT.endHead}
                    <p className="inline text-[#25933b]">{LANDING_TEXT.endHead2}</p>
                </h2>
                <p className="text-center w-full font-semibold text-[#423e36]">
                    {LANDING_TEXT.endPara}
                </p>
                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="relative text-sm sm:text-[15px] font-medium flex items-center justify-between py-3 px-8 rounded-lg shadow-lg/40 gap-2 mx-auto bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e] text-white hover:cursor-pointer transition-all"
                >
                    {LANDING_TEXT.buttonText}
                    <PaperAirplaneIcon className="text-white w-5 sm:w-7" />
                    <span className="absolute -top-1 -right-1 size-3 animate-ping rounded-full bg-[#765e2b] opacity-75"></span>
                    <span className="absolute -top-1 -right-1 size-3 rounded-full bg-[#7b6431]"></span>
                </button>
            </section>

            {/* Footer section */}
            <section id="links" className="relative w-full flex items-center justify-center">
                <Footer />
            </section>

        </section>
    )
}

export default LandingPage
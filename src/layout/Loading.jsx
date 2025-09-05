import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { ASSETS } from "../utils/GetAssets"

const Loading = () => {
    return (
        <main className="relative flex justify-center w-full h-screen overflow-hidden p-20 text-[#423e36]">
            
            {/* Background Image */}
            <div className="absolute h-full w-full -z-9 object-cover">
            </div>
            <img
                src={ASSETS.background}
                alt="Background"
                className="absolute h-full w-full -z-10 object-cover md:blur-[150px] blur-[90px]"
            />
            
            <section className="w-1/2 md:min-w-96 md:h-60 min-w-64 h-30 rounded-xl bg-white/70 font-medium md:text-xl sm:text-lg text-md flex items-center justify-center gap-5">
                <ArrowPathIcon className="sm:w-8 sm:h-8 w-5 h-5 animate-spin" />
                <p>
                    Please wait a bit ...
                </p>
            </section>
        </main>
    )
}

export default Loading
import { ClipboardDocumentCheckIcon, InformationCircleIcon, LightBulbIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import { DASH_TIPS } from "../../../utils/GetAssets";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContextProvidor";

const EmptyDashFiller = () => {

  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  return (
    <section className="md:px-5 px-2 w-full h-screen overflow-hidden thin-scrollbar text-[#423e36] pt-20 md:pt-3 rounded-2xl">
      
      {/* Title with heading and icon */}
      <section className="flex w-full justify-between px-6 md:py-5 py-3">
        <div className="flex items-center gap-3 md:gap-4">
          <LightBulbIcon className="w-7 h-7 stroke-[2.5] text-[#423e36]" />
          <header className="text-2xl font-bold text-[#423e36]">
            {DASH_TIPS.heading}
          </header>
        </div>
      </section>

      {/* Main category display section */}
      <section className="flex items-center justify-center w-full md:h-[88%] h-11/12 py-5 rounded-2xl text-[#423e36] bg-white/50 overflow-y-auto overflow-x-hidden thin-scrollbar">

        {/* center section for heading and text redarding tips */}
        <section className="sm:w-7/8 w-11/12 h-auto py-10 px-6 flex flex-col overflow-x-hidden overflow-y-auto thin-scrollbar-light items-center justify-center rounded-2xl md:shadow-[inset_2px_150px_150px_rgba(255,255,255,0.5)] shadow-[inset_2px_90px_100px_rgba(255,255,255,0.6)] text-center">

          <span className="flex flex-col mb-4 items-start justify-center md:text-xl text-lg text-left font-bold w-full">
            <div className="grow-0">
              <ClipboardDocumentCheckIcon className="inline w-11 p-2 mr-2 mb-2 bg-white/50 rounded-xl" />
              <p className="inline">{DASH_TIPS.tipsHead1}</p>
              <p className="inline text-[#25933b]">{user.firstName}</p>!
            </div>
            <p className="text-lg">
              {DASH_TIPS.tipsHead2}
            </p>
          </span>

          <ol className="list-decimal list-outside">
            <li className="font-medium text-left pb-1">
              {DASH_TIPS.tips1}
              <button 
                onClick={() => navigate("/category")}
                type="button"
                className="md:inline block py-2 text-sm md:mx-1 px-3 rounded-lg shadow-lg/30
                        bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                        text-white hover:cursor-pointer 
                        disabled:cursor-not-allowed disabled:bg-[#1d722e]"
              >
                {DASH_TIPS.tipsButton1}</button>
            </li>
            <li className="font-medium text-left py-1">
              {DASH_TIPS.tips2}
              <button 
                onClick={() => navigate("/income")}
                type="button"
                className="md:inline block py-2 text-sm md:mx-1 px-3 rounded-lg shadow-lg/30
                        bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                        text-white hover:cursor-pointer 
                        disabled:cursor-not-allowed disabled:bg-[#1d722e]"
              >
                {DASH_TIPS.tipsButton2}</button>
            </li>
            <li className="font-medium text-left py-1">
              {DASH_TIPS.tips3}
              <button 
                onClick={() => navigate("/expense")}
                type="button"
                className="md:inline block py-2 text-sm md:mx-1 px-3 rounded-lg shadow-lg/30
                        bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                        text-white hover:cursor-pointer 
                        disabled:cursor-not-allowed disabled:bg-[#1d722e]"
              >
                {DASH_TIPS.tipsButton3}</button>
            </li>
          </ol>

          <span className="flex gap-2 sm:mt-0 mt-5 md:text-[15px] text-sm items-center font-semibold w-full text-left">
            <InformationCircleIcon className="inline w-11 p-2 mr-2 mb-2 bg-white/50 rounded-xl grow-0" />
            <p className="flex-1">
              {DASH_TIPS.note}
            </p>
          </span>

        </section>

      </section>

    </section>
  )
}

export default EmptyDashFiller
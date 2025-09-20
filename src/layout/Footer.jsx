import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { LINKS } from "../utils/UrlLinks"

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col absolute bottom-0 md:justify-between justify-center w-full sm:px-20 px-12 py-4 bg-[#e1e1e0e2] text-[#0000008F] sm:text-[13px] text-[10px] font-bold">
        <div className="flex justify-between p-2 items-center">
            <a 
              className="px-4 hover:text-[#000000c0] active:text-[#000000e1] transition-all flex gap-1" 
              href={ LINKS.repoFrontend }
              target="_blank"
            >
              Frontend Repo <ArrowTopRightOnSquareIcon className="w-4" />
            </a>
            <a 
              className="px-4 hover:text-[#000000c0] active:text-[#000000e1] transition-all border-l-[1px] flex gap-1" 
              href={ LINKS.repoBackend }
              target="_blank"
            >
              Backend Repo <ArrowTopRightOnSquareIcon className="w-4" />
            </a>
            <a 
              className="px-4 hover:text-[#000000c0] active:text-[#000000e1] transition-all border-l-[1px] flex gap-1" 
              href={ LINKS.license }
              target="_blank"
            >
              MIT License <ArrowTopRightOnSquareIcon className="w-4" />
            </a>
        </div>
        <aside className="p-4 text-center">
            <p>Copyright &copy; 2025 Spend Guide. All rights reserved.  </p>
        </aside>
    </footer>
  )
}

export default Footer
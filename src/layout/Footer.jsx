import { LINKS } from "../utils/UrlLinks"

const Footer = () => {
  return (
    <footer className="flex absolute bottom-0 justify-between w-full px-20 py-4 bg-[#e1e1e0e2] text-[#0000008F] text-[13px] font-bold">
        <div className="flex justify-between p-2 items-center">
            <a className="px-4" href={ LINKS.repoFrontend }>Frontend Repo</a>
            <a className="px-4 border-l-[1px]" href={ LINKS.repoBackend }>Backend Repo</a>
            <a className="px-4 border-l-[1px]" href={ LINKS.license }>MIT License</a>
        </div>
        <aside className="p-4">
            <p>Copyright &copy; 2025 Spend Guide. All rights reserved.  </p>
        </aside>
    </footer>
  )
}

export default Footer
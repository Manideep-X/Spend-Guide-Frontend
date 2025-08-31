import Navigation from "./components/Navigation"
import { ASSETS } from "../../utils/GetAssets"
import { Outlet } from "react-router-dom"

const Home = ({ children }) => {
  return (
    <main className="relative md:grid lg:grid-cols-[350px_1fr] md:grid-cols-[280px_1fr] w-full h-screen items-center justify-center">

      {/* Background Image */}
      <div className="absolute h-full w-full -z-9 object-cover">
      </div>
      <img
        src={ASSETS.background}
        alt="Background"
        className="absolute h-full w-full -z-10 object-cover md:blur-[150px] sm:blur-[120px] blur-[90px]"
      />

      {/* Navigation side bar */}
      <Navigation />

      {/* Other components will be here */}
      <Outlet />
      
    </main>
  )
}

export default Home
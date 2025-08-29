import Navigation from "./components/Navigation"
import { ASSETS } from "../../utils/GetAssets"
import Dashboard from "./components/Dashboard"

const Home = () => {
  return (
    <main className="relative md:grid lg:grid-cols-[350px_1fr] md:grid-cols-[280px_1fr] w-full h-screen items-center justify-center">

      {/* Background Image */}
      <div className="absolute h-full w-full -z-9 object-cover">
      </div>
      <img
        src={ASSETS.background}
        alt="Background"
        className="absolute h-full w-full -z-10 object-cover blur-[150px]"
      />

      <Navigation />
      <Dashboard />
    </main>
  )
}

export default Home
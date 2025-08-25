import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layout/Footer";
import { ASSETS } from "../../utils/GetAssets";
import { Input, NameInput } from "./components/Input";

const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  const navigate = useNavigate();

  return (
    <main
      className="relative w-full h-[100vh] items-center overflow-hidden"
    >
      {/* Setting the background image */}
      <img 
        src={ASSETS.backgroundLight}
        alt="Background"
        className="absolute h-full w-full -z-10 object-cover" 
      />

      <section className="mx-auto mt-8 max-w-fit max-h-5/6 px-28 py-7 bg-[#ffffffe8] no-scrollbar shadow-2xl/30 rounded-3xl">

        <figure className="flex flex-col items-center justify-around w-fit mx-auto">
          <img src={ASSETS.iconNoBg} alt="Spend Guide" className="w-[60px] mx-auto mb-3" />
          <figcaption className="text-sm text-center font-bold">
            <header className="text-4xl font-extrabold py-1">
              Sign in
            </header>
            Welcome back! Let's get started
        </figcaption>
        </figure>

        {/* Form for registering new user */}
        <form action="" method="post" className="py-4">
            
            <Input
              idName = "email"
              label = "Email"
              type = "email"
              onChange = {e => setEmail(e.target.value)}
              value = {email}
              placeholder = "Enter your email"
            />
            
            <Input 
              idName = "password"
              label = "Password"
              type = "password"
              onChange = {e => setPassword(e.target.value)}
              value = {password}
              placeholder = "Enter a password"
            />

            <button type="submit" 
              className="py-3 px-9 rounded-lg mt-6 mb-2 shadow-lg/30 flex mx-auto
                        bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                        text-white hover:cursor-pointer"
            >
              Sign In
            </button>
        </form>

        <aside className="text-center text-sm font-medium">
          Don't have an account? Then,
          <Link to="/signup" className="text-[#25933b] hover:text-[#207f33] active:text-[#1d722e] font-bold underline"> sign up first &#x2924;</Link>
        </aside>
        
      </section>

      {/* The footer section */}
      <Footer />
    </main>
  )
}

export default Signin
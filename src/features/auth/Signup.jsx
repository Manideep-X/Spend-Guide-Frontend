import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layout/Footer";
import { ASSETS } from "../../utils/GetAssets";
import { Input, NameInput } from "./components/Input";

const Signup = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
        className="absolute w-full -z-10" 
      />

      <section className="mx-auto mt-8 max-w-fit max-h-5/6 px-28 pt-3 pb-12 bg-[#ffffffe8] no-scrollbar shadow-2xl/30 rounded-3xl">

        <figure className="flex items-center justify-around gap-5 w-fit mx-auto">
          <img src={ASSETS.iconNoBg} alt="Spend Guide" className="w-[60px] mx-auto" />
          <figcaption className="text-sm text-center font-bold">
            <header className="text-4xl font-extrabold">
              Create an Account
            </header>
            Start organising your spendings to stay on track.
        </figcaption>
        </figure>

        <form action="" method="post" className="py-4">
          
            <NameInput 
              onChangeFirst = {e => setFirstName(e.target.value)}
              onChangeLast = {e => setLastName(e.target.value)}
              valueFirst = {firstName}
              valueLast = {lastName}
            />
            
            <Input 
              idName = "email"
              label = "Email"
              type = "email"
              onChange = {e => setEmail(e.target.value)}
              value = {email}
              placeholder = "example@xyz.com"
            />
            
            <Input 
              idName = "password"
              label = "Password"
              type = "password"
              onChange = {e => setPassword(e.target.value)}
              value = {password}
              placeholder = ""
            />

            <button type="submit" 
              className="py-3 px-9 rounded-lg mt-6 mb-2 shadow-lg/30 flex mx-auto
                        bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                        text-white hover:cursor-pointer"
            >
              Sign Up
            </button>
        </form>
        <aside className="text-center text-sm font-medium">
          Already have an account? Then,
          <Link to="/login" className="text-[#25933b] hover:text-[#207f33] active:text-[#1d722e] font-bold underline"> try signing in &#x2924;</Link>
        </aside>
        
      </section>
      <Footer />
    </main>
  )
}

export default Signup
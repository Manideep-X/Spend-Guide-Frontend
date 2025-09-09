import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layout/Footer";
import { ASSETS } from "../../utils/GetAssets";
import { Input } from "./components/Input";
import { validateSignin } from "./components/validating";
import { signin } from "../../services/AuthService";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../../context/AppContextProvidor";

const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({});

  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);

    // validating the form fields
    const newErrorMsg = validateSignin(email, password);
    setErrMsg(newErrorMsg);

    if (Object.keys(newErrorMsg).length != 0) {
      setIsLoading(false);
    }
    else {
      // If the form doesn't have any errors then it will be submitted
      try {
        // signin() will return json a object
        const response = await signin({ email, password })

        // This will save the token to the local storage and set user detail in context API
        if (response) {
          setUser(response.user)
          localStorage.setItem("token", response.token)
          navigate("/dashboard")
        }
        else {
          toast.error("Empty response body! Please try again")
          navigate("/login")
        }
      } 
      catch(err) {
        console.log(err)
        setIsLoading(false)

        if (err.status != 400) toast.error(err.message)
        setErrMsg({ ...errMsg, ["unknown"] : err.message })
      }
    }

  }

  return (
    <main
      className="relative w-full h-[100vh] items-center overflow-hidden"
    >
      {/* Setting the background image */}
      <div className="absolute h-full w-full -z-9 object-cover backdrop-blur-[0.5px] bg-[#ffffff3a]">
      </div>
      <img 
        src={ASSETS.background}
        alt="Background"
        className="absolute h-full w-full -z-10 object-cover"
      />

      <section className="mx-auto mt-8 max-w-fit sm:w-full max-h-5/6 md:px-28 sm:px-20 px-12 py-7 bg-[#ffffffe8] no-scrollbar shadow-2xl/50 rounded-3xl ">

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
        <form onSubmit={handleSubmit} action="" method="post" className="py-4">
            
            <Input
              idName = "email"
              label = "Email"
              type = "email"
              onChange = {e => setEmail(e.target.value)}
              value = {email}
              placeholder = "Enter your email"
              errorMsg={errMsg}
            />
            
            <Input 
              idName = "password"
              label = "Password"
              type = "password"
              onChange = {e => setPassword(e.target.value)}
              value = {password}
              placeholder = "Enter the password"
              errorMsg={errMsg}
            />

            {/* Display unexpected error message */}
            {
              errMsg.unknown &&
              <div className="w-[300px] h-[60px] text-sm bg-red-300 text-red-600 px-4 py-2 overflow-y-auto rounded-lg">
                {errMsg.unknown}
              </div>
            }

            <button type="submit"
              disabled={isLoading}
              className="py-3 px-9 rounded-lg mt-6 mb-2 shadow-lg/30 flex mx-auto
                        bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                        text-white hover:cursor-pointer 
                        disabled:cursor-not-allowed disabled:bg-[#1d722e]"
            >
              {
                isLoading ?
                <p className="text-[#ffffffb0] flex gap-2 items-center">
                  <ArrowPathIcon className="animate-spin w-[18px] h-[18px]" />
                  Signing In...
                </p>
                : ("Sign In")
              }
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
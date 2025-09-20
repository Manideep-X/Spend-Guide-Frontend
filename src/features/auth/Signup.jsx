import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../layout/Footer";
import { ASSETS } from "../../utils/GetAssets";
import { Input, NameInput } from "./components/Input";
import { validateSignup } from "./components/Validating";
import { signup } from "../../services/AuthService";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import ImageSelector from "./components/ImageSelector";
import { uploadImg } from "../../services/ImageService";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/solid";

const Signup = () => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({});
  const [profileImg, setProfileImg] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);

    // validating the form fields
    const newErrorMsg = validateSignup(firstName, lastName, email, password);
    setErrMsg(newErrorMsg);

    if (Object.keys(newErrorMsg).length != 0) {
      setIsLoading(false);
    }
    else {
      // If the form doesn't have any errors then it will be submitted
      try {

        // Upload profile image if present
        // uploadImg() will return image URL
        let imageUrl = "";
        if (profileImg) {
          imageUrl = await uploadImg(profileImg) || "" ;
        }

        // signup() will return a json object
        const response = await signup({ firstName, lastName, email, password, imageUrl })
        
        // custom toaster to tell user to activate their account
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
                        bg-green-100 border border-green-400 text-green-700 
                        px-3 py-2 rounded flex items-center justify-center gap-2 font-medium`}>
            <CheckBadgeIcon className="text-green-700 w-16" /> 
            <span className="block sm:inline">
              You are registered! Check your email to activate your account
            </span>
            <button className="p-2 rounded-md hover:bg-[#0000001a] hover:cursor-pointer active:bg-[#00000030]"
                    onClick={() => toast.dismiss(t.id)}>
              <XMarkIcon className="w-5 h-5 font-medium" />
            </button>
          </div>
        ), { duration: Infinity });
        
        navigate("/signin")
      } 
      catch(err) {
        console.log(err)
        setIsLoading(false)

        toast.error(err.message)
        if (err.status != 403) navigate(err.redirect)
        setErrMsg({ ...errMsg, ["unknown"] : `Unknown error occured:${err.message}` })
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

      <section className="mx-auto mt-8 max-w-fit max-h-5/6 md:px-28 sm:px-15 px-8 py-7 bg-[#ffffffe8] overflow-y-scroll overflow-x-hidden thin-scrollbar shadow-2xl/50 rounded-3xl">

        <figure className="flex flex-col items-center justify-around w-fit mx-auto">
          <img src={ASSETS.iconNoBg} alt="Spend Guide" className="w-[60px] mx-auto" />
          <figcaption className="text-sm text-center font-bold">
            <header className="text-4xl font-extrabold">
              Create an Account
            </header>
            Start organising your spendings to stay on track.
        </figcaption>
        </figure>

        {/* Form for registering new user */}
        <form onSubmit={handleSubmit} method="post" className="py-4">

          <ImageSelector
            image = {profileImg}
            setImage = {setProfileImg}
          />

          <NameInput 
            onChangeFirst = {e => setFirstName(e.target.value)}
            onChangeLast = {e => setLastName(e.target.value)}
            valueFirst = {firstName}
            valueLast = {lastName}
            errorMsg = {errMsg}
          />
          
          <Input 
            idName = "email"
            label = "Email"
            type = "text"
            onChange = {e => setEmail(e.target.value)}
            value = {email}
            placeholder = "Enter your email"
            errorMsg = {errMsg}
          />
          
          <Input 
            idName = "password"
            label = "Password"
            type = "password"
            onChange = {e => setPassword(e.target.value)}
            value = {password}
            placeholder = "Enter a password"
            errorMsg = {errMsg}
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
                Signing Up...
              </p>
              : ("Sign Up")
            }
          </button>
        </form>

        <aside className="text-center text-sm font-medium">
          Already have an account? Then,
          <Link to="/signin" className="text-[#25933b] hover:text-[#207f33] active:text-[#1d722e] font-bold underline"> try signing in &#x2924;</Link>
        </aside>
        
      </section>

      {/* The footer section */}
      <Footer />
    </main>
  )
}

export default Signup
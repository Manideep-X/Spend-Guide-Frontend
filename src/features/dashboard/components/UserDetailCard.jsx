import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../../context/AppContextProvidor"
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ArrowRightStartOnRectangleIcon, EllipsisHorizontalCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const UserDetailCard = ({ handleSignout }) => {
    const { user } = useContext(AppContext);
    const [isExtended, setIsExtended] = useState(false);


  return (
    <aside className="flex flex-col items-center justify-center md:w-full pb-2 md:p-3 bg-[#ffffff5e] rounded-xl">

        <div className="flex md:block items-center gap-3 pb-1">
            {/* Profile Image */}
            {
                user.imageUrl ?
                    <figure className="sm:w-32 w-22 sm:h-32 h-22 mt-2 flex items-center justify-center rounded-full overflow-hidden">
                        <img src={user.imageUrl} alt="Profile Image" className="sm:w-32 w-22 sm:h-32 h-22 object-cover" />
                    </figure>
                :
                    <figcaption className="w-32 h-32 flex items-center justify-center rounded-full bg-[#1a683049]">
                        <UserCircleIcon className="text-[#25933b8f] stroke-1 w-28" />
                    </figcaption>
            }

            {/* User first name */}
            <p className="text-center font-bold text-[#423e36] md:mb-2">Hi, {user.firstName}</p>
        </div>


        {/* Extendable options and it's button */}
        <section className={`px-2 w-full overflow-hidden transition-all ${
            isExtended ? 'h-[130px]' : 'h-0'
        }`}>

            {/* User full name */}
            <p className="text-center truncate pt-2 font-medium text-[#423e36]">
                {user.firstName} {user.lastName}
            </p>

            {/* User email address */}
            <p className="text-center truncate pb-2 font-medium text-[#949492]">{user.email}</p>

            {/* Signout button */}
            <button 
            className="flex items-center my-2 justify-center bg-danger gap-2 w-full p-2 rounded-lg hover:cursor-pointer text-white bg-red-700/80 hover:bg-red-700/90 active:bg-red-700 shadow-lg/30"
            onClick={() => handleSignout()}>
                <ArrowRightStartOnRectangleIcon className="w-6 h-6 stroke-1" /> Signout
            </button>

        </section>
            
        {/* Button to toggle extendable functionality */}
        <div className="w-full px-2">
            <button
                className="w-full rounded-lg hover:cursor-pointer overflow-hidden shadow-lg/30"
                onClick={() => setIsExtended(!isExtended)}>
                    {
                        isExtended ?
                        <span className="flex gap-2 text-white items-center justify-center w-full h-full 
                                        p-2 bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]">
                            <XCircleIcon className="stroke-1 w-6 h-6" />
                            See less options
                        </span>
                        :
                        <span className="flex gap-2 text-white items-center justify-center w-full h-full 
                                        p-2 bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]">
                            <EllipsisHorizontalCircleIcon className="stroke-1 w-6 h-6" />
                            See more options
                        </span>
                    }
            </button>
        </div>

    </aside>
  )
}

export default UserDetailCard
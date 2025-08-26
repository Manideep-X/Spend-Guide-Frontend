import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react"
import { errorClass, errorClassFullW, ErrorText } from "./ErrorStyling";

const Input = ({idName, label, type, onChange, value, placeholder, errorMsg}) => {

    const [displayPass, setDisplayPass] = useState(false);

    // Toggle functionality for show/hide password
    const togglePass = () => {
        setDisplayPass(!displayPass);
    }

  return (
    <div className="flex flex-col py-2">
        <label className="pl-2 font-medium text-[15px]">{label}</label>
        <div className="flex relative">
            <input 

                // Change input field styling if error exists
                className={
                    !errorMsg[idName] ? 
                    "px-5 py-2 w-full border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                    : errorClassFullW
                }

                id={idName}
                name={idName}
                type={ (type === "password" && displayPass) ? "text" : type }
                onChange={e => onChange(e)}
                value={value}
                placeholder={placeholder}
            />

            {/* Toggle eye button show/hide password */}
            <span 
                className="absolute w-10 h-[92%] right-[2px] bottom-[2px] p-2 rounded-lg
                            bg-gray-200 hover:bg-gray-300 hover:text-[#6d6d6d]"
                style={{ display: type === "password" ? `flex` : `none` }}
                onClick={() => togglePass()}
            >
                { displayPass ? 
                    <EyeIcon className="w-full text-[#767575] stroke-2 " /> 
                    : <EyeSlashIcon className="w-full text-[#959393] stroke-2" /> 
                }
            </span>
        </div>

        {/* Displaying error message if exists */}
        {
            errorMsg[idName] && <ErrorText message = {errorMsg[idName]} />
        }

    </div>
  )
}

const NameInput = ({onChangeFirst, onChangeLast, valueFirst, valueLast, errorMsg}) => {
    return (
        <div className="flex flex-col">
            <label className="pl-2 font-medium text-[15px]">Full Name</label>
            <div className="flex gap-2">
                <div>
                    <input

                        // Change input field styling if error exists
                        className={
                            !errorMsg.firstName ? 
                            "px-5 py-2 border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                            : errorClass
                        }

                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={e => onChangeFirst(e)}
                        value={valueFirst}
                        placeholder="First name"
                    />

                    {/* Displaying error message is exists */}
                    {
                        errorMsg.firstName && <ErrorText message = {errorMsg.firstName} />
                    }

                </div>
                <div>
                    <input

                        // Change input field styling if error exists
                        className={
                            !errorMsg.lastName ? 
                            "px-5 py-2 border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"
                            : errorClass
                        }

                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={e => onChangeLast(e)}
                        value={valueLast}
                        placeholder="Last name"
                    />

                    {/* Displaying error message is exists */}
                    {
                        errorMsg.lastName && <ErrorText message = {errorMsg.lastName} />
                    }

                </div>
            </div>
        </div>
    )
}

export { Input, NameInput }
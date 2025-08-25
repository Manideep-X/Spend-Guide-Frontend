import { EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react"

const Input = ({idName, label, type, onChange, value, placeholder, error}) => {

    const [displayPass, setDisplayPass] = useState(false);

    const togglePass = () => {
        setDisplayPass(!displayPass);
    }

  return (
    <div className="flex flex-col py-2">
        <label className="pl-2 font-medium text-[15px]">{label}</label>
        <div className="flex">
            <input 

                className="px-5 py-2 w-full border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"

                id={idName}
                name={idName}
                type={ (type === "password" && displayPass) ? type : "text" }
                onChange={e => onChange(e)}
                value={value}
                placeholder={placeholder}
            />
            <button className="w-8 h-8 p-1 border-2 rounded-lg">
                <EyeIcon className="w-full" />
            </button>
        </div>

    </div>
  )
}

const NameInput = ({onChangeFirst, onChangeLast, valueFirst, valueLast}) => {
    return (
        <div className="flex flex-col">
            <label className="pl-2 font-medium text-[15px]">Full Name</label>
            <div className="flex gap-2">
                <div>
                    <input

                        className="px-5 py-2 border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"

                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={e => onChangeFirst(e)}
                        value={valueFirst}
                        placeholder="John"
                    />
                </div>
                <div>
                    <input

                        className="px-5 py-2 border-2 border-gray-200 outline-[#207f33] rounded-lg bg-gray-50"

                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={e => onChangeLast(e)}
                        value={valueLast}
                        placeholder="Doe"
                    />
                </div>
            </div>
        </div>
    )
}

export { Input, NameInput }
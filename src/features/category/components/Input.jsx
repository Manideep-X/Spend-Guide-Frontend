import { errorClassFullW, ErrorText } from "./ErrorStyling";
import { CATEGORY_TYPE_AND_LABEL } from "../../../utils/GetAssets";

const Input = ({ idName, label, type, handleOnChange, value, placeholder, errorMsg }) => {

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
                    type={type}
                    onChange={e => handleOnChange(e)}
                    value={value}
                    placeholder={placeholder}
                />
            </div>

            {/* Displaying error message if exists */}
            {
                errorMsg[idName] && <ErrorText message={errorMsg[idName]} />
            }

        </div>
    )
}

const RadioInput = ({ heading, inputName, categoryType, handleOnChange, errorMsg }) => {
    return (
        <div className="flex flex-col py-2">

            {/* Heading for this radio input */}
            <p className="pl-2 font-medium text-[15px]">{heading}</p>

            {/* Radio input tags */}
            <div className="flex items-center justify-center">
            {
                CATEGORY_TYPE_AND_LABEL.map(cateTypeAndLabel => (
                    <div 
                        key={cateTypeAndLabel.type}
                    >
                        <label >
                            <input
                                type="radio"
                                name={inputName}
                                id={cateTypeAndLabel.type}
                                value={cateTypeAndLabel.type}
                                onChange={e => handleOnChange(e)}
                                checked={cateTypeAndLabel.type === categoryType}
                                style={{ display: 'none' }}
                            />
                            <div className={`flex px-5 py-3 items-center justify-between border-[1px] border-[#95939290] rounded-2xl
                            ${(cateTypeAndLabel.type === categoryType) ? 'shadow-[inset_2px_40px_25px_rgba(255,255,255,0.6)]' : 'shadow-[inset_2px_40px_25px_rgba(255,255,255,0.6)]'}`}>
                                <cateTypeAndLabel.iconNotSelected 
                                    className="w-12 p-3 bg-white/50 rounded-xl" 
                                />
                                <div className="leading-2">
                                    <p className="text-sm text-[#959392]">Type</p>
                                    <p className="text-lg font-normal">{CATEGORY_TYPE_AND_LABEL[0].label}</p>
                                </div>
                            </div>
                        </label>
                    </div>
                ))
            }
            </div>

            {/* Displaying error message if exists */}
            {
                errorMsg[inputName] && <ErrorText message={errorMsg[inputName]} />
            }
        </div>
    )
}

export { Input, RadioInput }
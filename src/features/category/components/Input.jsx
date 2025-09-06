import { errorClassFullW, ErrorText } from "./ErrorStyling";
import { CATEGORY_TYPE_AND_LABEL } from "../../../utils/GetAssets";
import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

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
            
            {/* Displaying error message if exists */}
            {
                errorMsg[inputName] && <ErrorText message={errorMsg[inputName]} />
            }

            {/* Radio input tags */}
            <div className="sm:flex sm:flex-wrap block items-center justify-between sm:gap-10 gap-3 py-3">
            {
                CATEGORY_TYPE_AND_LABEL.map(cateTypeAndLabel => (
                    <div 
                        key={cateTypeAndLabel.type}
                    >
                        <label className="w-full h-full">
                            <input
                                type="radio"
                                name={inputName}
                                id={cateTypeAndLabel.type}
                                value={cateTypeAndLabel.type}
                                onChange={e => handleOnChange(e)}
                                checked={cateTypeAndLabel.type === categoryType}
                                className="hidden"
                            />
                            <div className={`flex sm:w-48 w-full px-6 py-4 mt-2 sm:m-0 items-center gap-5 justify-center border-[1px] border-[#95939290] rounded-2xl hover:cursor-pointer transition-all
                            ${(cateTypeAndLabel.type === categoryType) ? 'bg-white/60' : 'shadow-[inset_2px_20px_35px_rgba(255,255,255,0.6)] hover:shadow-[inset_2px_40px_25px_rgba(255,255,255,0.6)]'}`}
                            >
                                {
                                    (cateTypeAndLabel.type === categoryType) ?
                                    <>
                                        <cateTypeAndLabel.iconSelected 
                                            className="w-12 p-3 bg-white/50 rounded-xl" 
                                        />
                                        <div className="leading-3">
                                            <p className="text-sm font-semibold text-[#959392]">Type</p>
                                            <p className="text-[17px] font-bold">{cateTypeAndLabel.label}</p>
                                            <p className="text-xs font-light">selected</p>
                                        </div>
                                    </> :
                                    <>
                                        <cateTypeAndLabel.iconNotSelected 
                                            className="w-12 p-3 bg-white/50 rounded-xl" 
                                        />
                                        <div className="leading-3">
                                            <p className="text-sm text-[#959392]">Type</p>
                                            <p className="text-[17px] font-normal">{cateTypeAndLabel.label}</p>
                                        </div>
                                    </>
                                }
                            </div>
                        </label>
                    </div>
                ))
            }

            </div>

        </div>
    )
}

const EmojiPickerInput = (
    { heading, iconUrl, handleEmojiChange, isEmojiOpen, setIsEmojiOpen, handleDelete, emojiName, setEmojiName }
) => {
    
    return (
        <section className="flex flex-col py-2">

            <div className="border-[1px] border-[#95939290] rounded-xl shadow-[inset_2px_20px_35px_rgba(255,255,255,0.6)]">
                
                <div className="flex items-center justify-center sm:gap-0 gap-1 rounded-xl">

                    {/* Button to open Emoji picker */}
                    <button 
                        type="button"
                        onClick={() => setIsEmojiOpen(!isEmojiOpen)} 
                        className="flex sm:w-25 w-20 sm:px-8 px-4 py-4 bg-white/30 outline-[#207f33] hover:bg-white/50 active:bg-white/80 hover:cursor-pointer text-[#423e3694] hover:text-[#423e36b8] active:text-[#423e36] rounded-l-xl transition-all"
                        >
                        { iconUrl ? <img src={iconUrl} alt="icon" /> : <DocumentPlusIcon /> }
                    </button>

                    {/* Title for this Emoji picker input */}
                    <div className="px-2 h-full w-full flex items-center justify-between">
                        <p className="text-[17px] font-medium overflow-ellipsis">{ emojiName || heading }</p>
                        { iconUrl && 
                            <TrashIcon
                                onClick={() => handleDelete('iconUrl')} 
                                className="w-12 p-3 bg-white/40 rounded-xl hover:bg-white/60 active:bg-white" /> }
                    </div>

                </div>

                {/* Emoji Picker */}
                {
                    <div className="flex items-center justify-center z-30">
                        { isEmojiOpen &&
                            <EmojiPicker
                                height={400}
                                width={422}
                                onEmojiClick={(emoji) => {
                                        handleEmojiChange("iconUrl", emoji?.imageUrl || "");
                                        setEmojiName(emoji?.names[0] || "")
                                        setIsEmojiOpen(false);
                                    }
                                }
                            />
                        }
                    </div>
                }
            </div>

        </section>
    );
    
}

export { Input, RadioInput, EmojiPickerInput }
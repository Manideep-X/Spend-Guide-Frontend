import { PencilSquareIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react"

const ImageSelector = ({ image, setImage }) => {

    const imgInputRef = useRef(null);
    const [showImgUrl, setShowImgUrl] = useState(null);

    const handleImgOnChange = (element) => {

        if (image) {
            handleImgDelete();
        }

        const imgFile = element.target.files[0];
        if (imgFile) {
            setImage(imgFile);
            // This will create a temporary client-side URL for showing preview of the img to the user before sending it to the server
            const preview = URL.createObjectURL(imgFile);
            setShowImgUrl(preview);
        }
    }

    const handleImgDelete = () => {
        setImage(null);
        setShowImgUrl(null);
    }

    const handleButtonClick = () => {
        imgInputRef.current?.click();
    }

    return (
        <section className="flex justify-center my-3">
            <input 
                className="hidden"

                accept="image/*" 
                type="file" 
                ref={imgInputRef}
                onChange={handleImgOnChange}
                src="" 
                alt=""
            />

            {
                !image ?
                <div 
                    className="relative w-37 h-37 flex items-center justify-center rounded-full 
                            bg-[#1a68304a]">

                    <UserCircleIcon className="text-[#25933bc1] stroke-1 w-22" />
                    <button
                        className="absolute -right-1 bottom-0 rounded-full p-2
                                bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                                text-[#f7fdf8db] hover:cursor-pointer shadow-lg/30"
                        type="button"
                        onClick={handleButtonClick}>

                        <PencilSquareIcon className="w-6 stroke-1" />
                    </button>
                </div>
                : 
                <div className="relative w-37 h-37 flex items-center justify-center">
                    <img src={showImgUrl} alt="Profile Image" className="w-37 h-37 object-cover rounded-full" />
                    <button
                        className="absolute -right-1 bottom-0 rounded-full p-2
                                bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                                text-[#f7fdf8db] hover:cursor-pointer shadow-lg/30"
                        type="button"
                        onClick={handleButtonClick}>

                        <PencilSquareIcon className="w-6 stroke-1" />
                    </button>
                    <button
                        className="absolute -left-1 bottom-0 rounded-full p-2
                                bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                                text-[#f7fdf8db] hover:cursor-pointer shadow-lg/30"
                        type="button"
                        onClick={handleImgDelete}>

                        <TrashIcon className="w-6 stroke-1" />
                    </button>
                </div>
            }

        </section>
    )
}

export default ImageSelector
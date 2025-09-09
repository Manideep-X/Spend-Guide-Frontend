import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline"
import { InboxStackIcon } from "@heroicons/react/24/solid"

const EmptyListFiller = ({ setShowForm, isLoading, message1, message2 }) => {
    
    return (

        <section className="flex h-full w-full items-center justify-center gap-5">
            <div className="h-2/3 w-2/3 flex flex-col items-center justify-center rounded-2xl 
              md:shadow-[inset_2px_150px_150px_rgba(255,255,255,0.5)] shadow-[inset_2px_90px_100px_rgba(255,255,255,0.6)]">
                <div className="relative w-30 p-8 bg-white/80 rounded-full">
                    <InboxStackIcon className="opacity-50" />
                    {
                        isLoading ?
                        <ArrowPathIcon
                            className="absolute -right-2 bottom-0 w-10 p-2 rounded-full flex mx-auto text-[#ffffffb0] hover:cursor-not-allowed active:cursor-not-allowed bg-[#1d722e] animate-spin" 
                        />
                        :
                        <PlusIcon
                            onClick={() => {
                                setShowForm(true)
                            }}
                            className="absolute -right-2 bottom-0 w-10 p-2 rounded-full shadow-lg/30 flex mx-auto bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e] text-white hover:cursor-pointer" 
                        />
                    }
                </div>
                <span className="text-lg font-semibold mt-3">{message1}</span>
                <p className="text-sm">{message2}</p>
            </div>
        </section>

    )
}

export default EmptyListFiller
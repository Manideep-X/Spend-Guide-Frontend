import { DocumentIcon, PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon as PencilSquareIconSolid,
        TrashIcon as TrashIconSolid, 
        DocumentIcon as DocumentIconSolid,
        QueueListIcon, 
        } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../layout/Loading"

const Category = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [hoveringRow, setHoveringRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getCate = async () => {
      try {
        const response = await getCategories();
        console.log(response);
        if (response) {
          setCategories(response);
        }
      } catch (error) {
        setIsLoading(false);
        if (error.message) toast.error(error.message);
        if (error.redirect) navigate(error.redirect);
      }
      finally {
        setIsLoading(false);
      }
    }
    getCate();
  }, [])
  
  if (isLoading) return (
    <Loading />
  )

  return (

    <section className="md:px-5 md:py-0 w-full h-screen overflow-hidden thin-scrollbar pt-20 md:pt-3">
      
      {/* Title with heading, icon and button */}
      <section className="flex w-full justify-between px-6 md:py-5 py-3">
        
        {/* Heading with icon */}
        <div className="flex items-center gap-3 md:gap-4">
          <QueueListIcon className="w-7 h-7 stroke-[2.5] text-[#423e36]" />
          <header className="text-2xl font-bold text-[#423e36]">
            Categories
          </header>
        </div>
        
        {/* Button to add a new category */}
        <button type="button"
          className="py-2 px-8 rounded-lg shadow-lg/30 flex items-center gap-2
                        bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                        text-[#ffffff] hover:cursor-pointer"
        >
          <PlusIcon className="w-5 h-5 stroke-2" />
          <span className="font-medium ">Create new category</span>
        </button>
      </section>

      {/* Main category display section */}
      <section className="w-full h-[85%] py-5 px-8 rounded-xl text-[#423e36] bg-white/50 overflow-y-auto overflow-x-hidden thin-scrollbar">

        {/* Heading and category section */}
        <div className="">
          <span className="text-lg font-bold">Categorized incomes and expenses</span>
          <section className="w-full h-full flex flex-wrap gap-x-8 gap-y-5 pt-5">
            {
              categories.map((category, index) => (
                <section 
                  key={category.id || index}
                  id={category.id || index}
                  onMouseEnter={() => setHoveringRow(category.id || index)}
                  onMouseLeave={() => setHoveringRow(null)}
                  className={`h-auto w-80 grid grid-cols-[auto_1fr] gap-2 items-center px-6 py-8 rounded-xl transition-all
                  ${hoveringRow === (category.id || index) 
                    ? 'md:shadow-[inset_2px_80px_30px_rgba(255,255,255,0.7)] shadow-[inset_2px_50px_60px_rgba(255,255,255,0.8)]' 
                    : 'md:shadow-[inset_2px_60px_65px_rgba(255,255,255,0.7)] shadow-[inset_2px_50px_60px_rgba(255,255,255,0.8)]'}
                  `}>
                      {hoveringRow === (category.id || index)
                        ? 
                        <>
                          {category.iconUrl
                          ? <img 
                              src={category.iconUrl} 
                              alt={category.name}
                              className="w-12 p-3 bg-white/50 rounded-xl" />
                          : <DocumentIconSolid className="w-12 p-3 bg-white/50 rounded-xl" />
                          }
                          <div className="flex items-center justify-between ">
                            <div className="leading-2 flex flex-col justify-center">
                              <heading className="text-lg font-bold transition-all">{category.name}</heading>
                              <p className="font-semibold text-[#959392] transition-all">{category.type}</p>
                            </div>
                            <span className={`h-12 overflow-hidden transition-all backdrop-blur-xs w-14`}>
                              <PencilSquareIconSolid className="h-full p-3 mr-2 bg-white/50 rounded-xl hover:cursor-pointer hover:bg-white/80" />
                            </span>
                          </div>
                        </>
                        :
                        <>
                          {category.iconUrl
                          ? <img 
                              src={category.iconUrl} 
                              alt={category.name}
                              className="w-12 p-3 bg-white/50 rounded-xl" />
                          : <DocumentIcon className="w-12 p-3 bg-white/50 rounded-xl" />
                          }
                          <div className="flex items-center justify-between ">
                            <div className="leading-2 flex flex-col justify-center">
                              <heading className="text-lg font-semibold">{category.name}</heading>
                              <p className="font-medium text-[#959392]">{category.type}</p>
                            </div>
                            <span className={`h-12 overflow-hidden transition-all backdrop-blur-xs w-0`}>
                            </span>
                          </div>
                        </>
                      }
                </section>
              ))
            }
          </section>
        </div>

      </section>

    </section>
  )
}

export default Category
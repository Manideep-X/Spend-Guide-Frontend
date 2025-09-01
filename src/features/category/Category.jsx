import { PlusIcon } from "@heroicons/react/24/outline";
import { QueueListIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Category = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCate = async () => {
      try {
        const response = await getCategories();
        if (response) {
          setCategories(response);
        }
      } catch (error) {
        setIsLoading(false);
        if (error.message) toast.error(error.message);
        // navigate(error.redirect);
      }
      finally {
        setIsLoading(false);
      }
    }
    getCate();
  }, [])
  

  return (

    <section className="md:px-5 md:py-0 w-full h-screen overflow-hidden thin-scrollbar pt-20 md:pt-3">
      
      {/* Title with heading, icon and button */}
      <section className="flex w-full justify-between px-6 md:py-4 py-3">
        
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
          <span className="font-medium">Create new category</span>
        </button>
      </section>

      {/* Main category table */}
      <section className="w-full h-[87%] rounded-xl text-[#423e36] bg-white/50">
      
        {/* thead of the table */}
        <div>
          <table className="w-full">
            <thead className="shadow-[inset_2px_30px_20px_rgba(255,255,255,0.4)] text-center rounded-t-xl">
              <tr>
                <th className="font-semibold py-3">Serial No.</th>
                <th className="font-semibold py-3">Creation time</th>
                <th className="font-semibold py-3">Name</th>
                <th className="font-semibold py-3">Type</th>
                <th className="font-semibold py-3">Last updated at</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* tbody of the table */}
        <div>
          <table className="w-full overflow-y-scroll overflow-x-hidden thin-scrollbar">
            <tbody className="bg-white/50 text-center">
              <tr>
                <td className="font-medium py-3" >1</td>
                <td className="font-medium py-3" >12:30</td>
                <td className="font-semibold py-3"  scope="row">Gloceries</td>
                <td className="font-medium py-3" >Expense</td>
                <td className="font-medium py-3" >18:45</td>
              </tr>
            </tbody>
          </table>
        </div>

      </section>

    </section>
  )
}

export default Category
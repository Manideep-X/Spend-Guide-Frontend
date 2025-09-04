import { XMarkIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon, SquaresPlusIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { Input, RadioInput } from "./Input";

const CategoryForm = ({ handleFormClose, updateCategory }) => {

  const [errorMsg, setErrorMsg] = useState({});
  const [category, setCategory] = useState(updateCategory);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevCategory => ({
      ...prevCategory,
      [name] : value
    }))
  }

  return (
    <main className="absolute top-0 left-0 flex items-center justify-center z-20 w-full h-full">
        {/* Background of the form */}
        <div
            onClick={() => handleFormClose()} 
            className="absolute w-full h-full left-0 top-0 z-20 overflow-hidden transition-all bg-black/20 backdrop-blur-xs"></div>

        {/* Category section */}
        <section className="relative z-30 w-3/4 max-w-[9in] h-3/4 flex items-center justify-center px-10 py-15 bg-white/50 backdrop-blur-md rounded-2xl overflow-y-auto overflow-x-hidden thin-scrollbar-light shadow-2xl/30">

          {/* Navbar of the form */}
          <nav className="absolute top-0 w-full h-auto border-b-[1px] border-[#423e3641] rounded-t-2xl flex items-center justify-between bg-white/80">
            <span className="text-xl font-semibold text-[#423e36] pl-8">
              {
                updateCategory ? 
                <span className="flex items-center justify-center gap-3" > 
                  <PencilSquareIcon className="w-7" /> 
                  Update the category 
                </span> : 
                <span className="flex items-center justify-center gap-3" > 
                  <SquaresPlusIcon className="w-7" /> 
                  Create a new category 
                </span>
              }
            </span>

            {/* Cross icon to close the form */}
            <XMarkIcon 
                onClick={() => handleFormClose()}
                className="text-[#423e36ce] w-14 p-4 border-l-[1px] border-[#423e3641] hover:bg-black/10 active:bg-black/20 rounded-tr-2xl stroke-2 transition-all" />
          </nav>

          {/* Category form */}
          <form method="post" className="w-full">

            {/* Input field for Category name */}
            <Input
              idName = "name"
              label = "Category Name"
              type = "text"
              handleOnChange = {e => handleOnChange(e)}
              value = {category?.name || ""}
              placeholder = "Give a name to the category"
              errorMsg = {errorMsg}
            />

            {/* Input field for Category types */}
            <RadioInput
              heading = "Select the type"
              inputName = "categoryType"
              categoryType = {category?.type || ""}
              handleOnChange = {e => handleOnChange(e)}
              errorMsg = {errorMsg}
            />

          </form>

        </section>
    </main>
  )
}

export default CategoryForm
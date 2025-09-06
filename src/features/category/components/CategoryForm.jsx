import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { PencilSquareIcon, SquaresPlusIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react";
import { EmojiPickerInput, Input, RadioInput } from "./Input";
import ValidateCategory from "./Validating"
import { saveCategory, updateCategoryById } from "../../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CategoryForm = ({ handleFormClose, updateCategory }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [category, setCategory] = useState(updateCategory || {});
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [emojiName, setEmojiName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (updateCategory) {
      setCategory(updateCategory);
    } else {
      setCategory({});
    }
  }, [updateCategory])


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevCategory => ({
      ...prevCategory,
      [name]: value
    }))
  }

  const handleEmojiChange = (name, value) => {
    setCategory(prevCategory => ({
      ...prevCategory,
      [name] : value
    }))
  }

  const handleDelete = (key) => {
    if (key in category) {
      const { [key]: _, ...restOfCategory } = category;
      setCategory(restOfCategory);
      if (key === 'iconUrl')
        setEmojiName("");
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);

    // Validate the category form and set error if exists
    const newErrorMsg = ValidateCategory(category);
    setErrorMsg(newErrorMsg);

    // Stops the loading is error exists
    if (Object.keys(newErrorMsg).length != 0) {
      setIsLoading(false);
    }
    else {

      // Try to update the category if updateCategory exists
      if (updateCategory) {
        try {
          
          const response = await updateCategoryById(category);

          toast.success("The category is updated successfully!")
          navigate("/category");
          handleFormClose();
          
        } catch (error) {

          console.log(error);
          if (error.message) toast.error(error.message);
          if (error.redirect) navigate(error.redirect);
          else navigate("/category")
          
        } finally {
          setIsLoading(false);
        }
      }

      // Try to create a new category if updateCategory doesn't exists
      else {
        try {

          const response = await saveCategory(category);
          
          toast.success("New category is created successfully!")
          navigate("/category");
          handleFormClose();
          
        } catch (error) {
          
          console.log(error);
          if (error.message) toast.error(error.message);
          if (error.redirect) navigate(error.redirect);
          else navigate("/category")
          
        } finally {
          setIsLoading(false);
        }
      }

    }

  }

  return (
    <main className="absolute top-0 left-0 flex items-center justify-center z-20 w-full h-full">
      {/* Background of the form */}
      <div
        onClick={(e) => handleFormClose(e)}
        className="absolute w-full h-full left-0 top-0 z-20 overflow-hidden transition-all bg-black/20 backdrop-blur-xs"></div>

      {/* Category section block */}
      <section
        className="relative z-30 max-w-[9in] sm:h-auto max-h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-md rounded-2xl overflow-y-auto overflow-x-hidden thin-scrollbar-light shadow-2xl/30 text-[#423e36]">

        {/* Navbar of the form */}
        <nav className="sticky top-0 w-full h-auto border-b-[1px] border-[#423e3641] rounded-t-2xl flex items-center justify-between bg-white/80 z-10 backdrop-blur-xs">
          <span className="md:text-xl sm:text-lg font-semibold pl-8">
            {
              (updateCategory) ?
                <span className="flex items-center justify-center gap-3" >
                  <PencilSquareIcon className="md:w-7 sm:w-6 w-5" />
                  Update the category
                </span> :
                <span className="flex items-center justify-center gap-3" >
                  <SquaresPlusIcon className="md:w-7 sm:w-6 w-5" />
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
        <form onSubmit={(e) => handleSubmit(e)} method="post" 
        className={`relative w-full h-full flex flex-col py-5 px-12 justify-center
                    ${isEmojiOpen ? 'pt-50 sm:pt-30' : 'pt-5 sm:pt-5'} transition-all`}>

          {/* Emoji picker input using emoji-picker-react library */}
          <EmojiPickerInput
            heading={(updateCategory) ? "Change the icon" : "Pick an icon"}
            iconUrl={category?.iconUrl || ""}
            handleEmojiChange={handleEmojiChange}
            isEmojiOpen={isEmojiOpen}
            setIsEmojiOpen={setIsEmojiOpen}
            handleDelete={handleDelete}
            emojiName={emojiName}
            setEmojiName={setEmojiName}
          />

          {/* Input field for Category name */}
          <Input
            idName="name"
            label={(updateCategory) ? "Change category name" : "Category name"}
            type="text"
            handleOnChange={e => handleOnChange(e)}
            value={category?.name || ""}
            placeholder="Give category a name"
            errorMsg={errorMsg}
          />

          {/* Input field for Category types */}
          <RadioInput
            heading={(updateCategory) ? "Change the type" : "Select the type"}
            inputName="type"
            categoryType={category?.type || ""}
            handleOnChange={e => handleOnChange(e)}
            errorMsg={errorMsg}
          />

          {/* Submit button */}
          <button type="submit"
            disabled={isLoading}
            className="py-3 px-9 rounded-lg shadow-xl/30 flex mx-auto
                      bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                      text-white hover:cursor-pointer 
                      disabled:cursor-not-allowed disabled:bg-[#1d722e]"
          >
            {
              isLoading ?
                <p className="text-[#ffffffb0] flex gap-2 items-center">
                  <ArrowPathIcon className="animate-spin w-[18px] h-[18px]" />
                  {
                    (updateCategory) ? "Updating..." : "Creating..."
                  }
                </p>
                : ( (updateCategory) ? "Update" : "Create" )
            }
          </button>

        </form>

      </section>
    </main>
  )
}

export default CategoryForm
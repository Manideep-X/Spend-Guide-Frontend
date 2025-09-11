import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateTransaction } from "./Validating";
import { saveNewIncome } from "../../../services/IncomeService";
import { saveNewExpense } from "../../../services/ExpenseService";
import toast from "react-hot-toast";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { DropDownInput, EmojiPickerInput, Input } from "./Input";

const ExpenseIncomeForm = ({ handleFormClose, type, categories }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [transaction, setTransaction] = useState({});
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [emojiName, setEmojiName] = useState("");

  const firstCapitalType = type.charAt(0).toUpperCase() + type.slice(1);
  const navigate = useNavigate();

  // Handle changes in the input form fields
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      [name]: value
    }))
  }

  // Same as handleOnChange but made explicitly for emoji change and amount
  const handleEmojiChange = (name, value) => {
    setTransaction(prevTransaction => ({
      ...prevTransaction,
      [name] : value
    }))
  }

  // This function is for emoji delete only, So that user can keep the icon empty 
  const handleDelete = (key) => {
    if (key in transaction) {
      const { [key]: _, ...restOfTransaction } = transaction;
      setTransaction(restOfTransaction);
      if (key === 'iconUrl')
        setEmojiName("");
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true);

    // Validate the income form and set errors if exists
    const newErrorMsg = ValidateTransaction(transaction, firstCapitalType);
    setErrorMsg(newErrorMsg);

    // Stops the loading is error exists
    if (Object.keys(newErrorMsg).length != 0) {
      setIsLoading(false);
    }
    else {

      // Try to add new income into the DB
      try {
        
        let response = null;
        if (type === "income") {
          response = await saveNewIncome(transaction);
        } else if (type === "expense") {
          response = await saveNewExpense(transaction);
        }

        if (response) {
          setTransaction(response);
          toast.success("New income is successfully added!");
          handleFormClose();
        }

      } catch (error) {

        console.log(error);
        if (error.message) toast.error(error.message);
        if (error.redirect) navigate(error.redirect);
        
      } finally {
        setIsLoading(false);
      }
    }

  }

  return (
    <main className="absolute top-0 left-0 flex items-center justify-center z-20 w-full h-full">
      {/* Background of the form */}
      <div
        onClick={(e) => handleFormClose(e)}
        className="absolute w-full h-full left-0 top-0 z-20 overflow-hidden transition-all bg-black/20 backdrop-blur-xs"></div>

      {/* Expense/Income section block */}
      <section
        className="relative z-30 max-w-[9in] sm:h-auto max-h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-md rounded-2xl overflow-y-auto overflow-x-hidden thin-scrollbar-light shadow-2xl/30 text-[#423e36]">

        {/* Navbar of the form */}
        <nav className="sticky top-0 w-full h-auto border-b-[1px] border-[#423e3641] rounded-t-2xl flex items-center justify-between bg-white/80 z-10 backdrop-blur-xs">
          <span className="md:text-xl sm:text-lg font-semibold pl-8">
            
            {/* Heading with icon */}
            <span className="flex items-center justify-center gap-3 pr-22" >
              <SquaresPlusIcon className="md:w-7 sm:w-6 w-5" />
              {`Add a new ${firstCapitalType} Source`}
            </span>
          </span>

          {/* Cross icon to close the form */}
          <XMarkIcon
            onClick={() => handleFormClose()}
            className="text-[#423e36ce] w-14 p-4 border-l-[1px] border-[#423e3641] hover:bg-black/10 active:bg-black/20 rounded-tr-2xl stroke-2 transition-all" />
        </nav>

        {/* Expense/Income form */}
        <form onSubmit={(e) => handleSubmit(e)} method="post" 
        className={`relative w-full h-full flex flex-col py-5 px-12 justify-center
                    ${isEmojiOpen ? 'pt-50 sm:pt-36' : 'pt-5 sm:pt-5'} transition-all`}>

          {/* Emoji picker input using emoji-picker-react library */}
          <EmojiPickerInput
            heading="Pick an Icon"
            iconUrl={transaction?.iconUrl || ""}
            handleEmojiChange={handleEmojiChange}
            isEmojiOpen={isEmojiOpen}
            setIsEmojiOpen={setIsEmojiOpen}
            handleDelete={handleDelete}
            emojiName={emojiName}
            setEmojiName={setEmojiName}
          />

          {/* Input field for Expense/Income name */}
          <Input
            idName="name"
            label={`${firstCapitalType} name`}
            type="text"
            handleOnChange={e => handleOnChange(e)}
            value={transaction?.name || ""}
            placeholder={`Give ${type} source a name`}
            errorMsg={errorMsg}
          />

          <div className="flex sm:flex-row flex-col sm:gap-3">

            {/* Input field for Expense/Income amount */}
            <Input
              idName="amount"
              label={`${firstCapitalType} amount`}
              type="number"
              handleOnChange={e => handleOnChange(e)}
              value={transaction?.amount || ""}
              errorMsg={errorMsg}
            />
            
            {/* Input field for Expense/Income recieved date */}
            <Input
              idName="date"
              label={`Date of ${firstCapitalType} reciept`}
              type="date"
              handleOnChange={e => handleOnChange(e)}
              value={transaction?.date || ""}
              errorMsg={errorMsg}
            />

          </div>

          {/* Drop down input field for choosing category */}
          <DropDownInput
            type={firstCapitalType}
            categories={categories}
            label={`Select category for this ${firstCapitalType}`}
            selectName="categoryId"
            handleOnChange={e => handleOnChange(e)}
            placeholder="Choose a category"
            errorMsg={errorMsg}
          />

          {/* Submit button */}
          <button type="submit"
            disabled={isLoading}
            className="py-3 px-9 mt-3 rounded-lg shadow-xl/30 flex mx-auto
                      bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e]
                      text-white hover:cursor-pointer 
                      disabled:cursor-not-allowed disabled:bg-[#1d722e]"
          >
            {
              isLoading ?
                <p className="text-[#ffffffb0] flex gap-2 items-center">
                  <ArrowPathIcon className="animate-spin w-[18px] h-[18px]" />
                  { `Adding ${firstCapitalType} ...` }
                </p>
                :
                <p className="text-[#ffffff] flex text-center items-center">
                  { `Add ${firstCapitalType}` }
                </p>
            }
          </button>

        </form>

      </section>
    </main>
  )
}

export default ExpenseIncomeForm
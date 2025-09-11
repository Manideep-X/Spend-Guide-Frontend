import { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import { getIncomesForCurrMonth } from "../../services/IncomeService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmptyListFiller from "./components/EmptyListFiller";
import ExpenseIncomeList from "./components/ExpenseIncomeList";
import { ArrowDownOnSquareStackIcon as ArrowDownOnSquareStackIconSolid, WalletIcon
} from "@heroicons/react/24/solid";
import { ArrowDownOnSquareStackIcon, ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import ExpenseIncomeForm from "./components/ExpenseIncomeForm";
import { getCategoriesByType } from "../../services/CategoryService";
import SimpleAreaChart from "../../layout/SimpleAreaChart";

const Income = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [hoveringRow, setHoveringRow] = useState(null);
  const [showIncomeForm, setShowIncomeForm] = useState(false);

  const navigate = useNavigate();

  // Function to fetch incomes of current month from DB
  const fetchIncomesForCurrMonth = async () => {
    try {
      const response = await getIncomesForCurrMonth();
      console.log(response);
      if (response) {
        setIncomes(response);
      }
    } catch (error) {
      if (error.message) toast.error(error.message);
      if (error.redirect) navigate(error.redirect);
    }
    finally {
      setIsLoading(false);
      setShowIncomeForm(false);
    }
  }

  // Fetch this month incomes from the DB after each render/re-render
  useEffect(() => {
    fetchIncomesForCurrMonth();
  }, [])

  // Function to fetch categories of income type from the DB
  const fetchIncomeCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const response = await getCategoriesByType("income");
      console.log(response);
      if (response) {
        setCategories(response);
      }
    } catch (error) {
      if (error.message) toast.error(error.message);
      if (error.redirect && (error.status === 403 || error.status >= 500)) 
        navigate(error.redirect);
    } finally {
      setIsCategoryLoading(false);
    }
  }

  // this will display the income form to add a new income
  const handleFormShow = async () => {
    await fetchIncomeCategories();
    setShowIncomeForm(true);
  }

  // this will close the form, set categories to empty list and fetch the incomes again
  const handleFormClose = () => {
    setCategories([]);
    setShowIncomeForm(false);
    fetchIncomesForCurrMonth();
  }

  // Ruturns the loading page during category fetching time
  if (isLoading) return (
    <Loading />
  )

  return (
    
    <section className="md:px-5 md:py-0 w-full h-screen overflow-x-hidden overflow-y-auto thin-scrollbar pt-20 md:pt-3">
      
      {/* Title with heading, icon and button */}
      <section className="flex w-full justify-between px-6 md:py-5 py-3">

        {/* Heading with icon */}
        <div className="flex items-center gap-3 md:gap-4">
          <WalletIcon className="w-7 h-7 stroke-[2.5] text-[#423e36]" />
          <header className="text-2xl font-bold text-[#423e36]">
            Incomes
          </header>
        </div>

        {/* Button to add a new income source */}
        <button type="button"
          disabled={isCategoryLoading}
          onClick={() => handleFormShow()}
          className="py-2 px-8 rounded-lg shadow-lg/30 flex items-center gap-2
                    bg-[#25933b] hover:bg-[#207f33] active:bg-[#1d722e] text-[#ffffff]
                    hover:cursor-pointer disabled:text-[#ffffffb0] disabled:cursor-not-allowed disabled:bg-[#1d722e]"
        >
          {
            isCategoryLoading ? <ArrowPathIcon className="w-5 h-5 stroke-2 animate-spin" /> 
                              : <PlusIcon className="w-5 h-5 stroke-2" />
          }
          <span title="Create a category" className="font-medium sm:block hidden">Add income source</span>
        </button>

      </section>

      {/* Area chart display section (will only show if income exists) */}
      {
        incomes.length !== 0 &&
        <section className="flex flex-col items-center justify-center w-full h-[4.5in] mb-5 rounded-xl text-[#423e36] bg-white/50 py-4 px-6">
          <div className="flex flex-col w-full mb-3">
            <p className="text-left sm:text-lg font-bold">Overview of this month's Incomes</p>
          </div>
          <div className="h-full w-full p-2 pt-8 pr-8 rounded-xl flex items-center justify-center shadow-[inset_2px_210px_200px_rgba(255,255,255,0.8)]">
            <SimpleAreaChart
              transactions={incomes}
              type="income"
            />
          </div>
        </section>
      }

      {/* Main income display section */}
      <section className="w-full md:h-[87%] h-11/12 rounded-xl text-[#423e36] bg-white/50 overflow-y-auto overflow-x-hidden thin-scrollbar">
        
        {/* Need to check if any incomes are available or not */}
        {
          incomes.length === 0 ?

          <EmptyListFiller
            setShowForm={handleFormShow}
            isLoading={isCategoryLoading}
            message1="No income added for this month"
            message2="Get started by adding new income source for this month"
          />
          
          :

          // Heading and income section
          <ExpenseIncomeList 
            transactions={incomes}
            type="income"
            hoveringRow={hoveringRow}
            setHoveringRow={setHoveringRow}
            fetchTransactionsForCurrMonth={fetchIncomesForCurrMonth}
            heading="Your this month's Income"
            DefaultIconHover={ArrowDownOnSquareStackIconSolid}
            DefaultIconNotHover={ArrowDownOnSquareStackIcon}
          />
        }

      </section>

      {/* Income Form for adding a new income */}
      {
        showIncomeForm &&
          <ExpenseIncomeForm handleFormClose={handleFormClose} type="income" categories={categories} />
      }

    </section>

  )
}

export default Income
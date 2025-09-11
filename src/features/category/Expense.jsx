import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExpensesForCurrMonth } from "../../services/ExpenseService";
import Loading from "../../layout/Loading";
import { ArrowUpOnSquareStackIcon as ArrowUpOnSquareStackIconSolid,
          CreditCardIcon } from "@heroicons/react/24/solid";
import { ArrowPathIcon, ArrowUpOnSquareStackIcon, PlusIcon } from "@heroicons/react/24/outline";
import EmptyListFiller from "./components/EmptyListFiller";
import ExpenseIncomeList from "./components/ExpenseIncomeList";
import ExpenseIncomeForm from "./components/ExpenseIncomeForm";
import { getCategoriesByType } from "../../services/CategoryService";
import toast from "react-hot-toast";
import SimpleAreaChart from "../../layout/SimpleAreaChart";

const Expense = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [hoveringRow, setHoveringRow] = useState(null);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const navigate = useNavigate();

  // Function to fetch expenses of current month from DB
  const fetchExpensesForCurrMonth = async () => {
    try {
      const response = await getExpensesForCurrMonth();
      console.log(response);
      if (response) {
        setExpenses(response);
      }
    } catch (error) {
      if (error.message) toast.error(error.message);
      if (error.redirect) navigate(error.redirect);
    }
    finally {
      setIsLoading(false);
      setShowExpenseForm(false);
    }
  }

  // Fetch this month expenses from the DB after each render/re-render
  useEffect(() => {
    fetchExpensesForCurrMonth();
  }, [])

  // Function to fetch categories of expense type from the DB
  const fetchExpenseCategories = async () => {
    setIsCategoryLoading(true);
    try {
      const response = await getCategoriesByType("expense");
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

  // this will display the expense form to add a new expense
  const handleFormShow = async () => {
    await fetchExpenseCategories();
    setShowExpenseForm(true);
  }

  // this will close the form and fetch the expenses again
  const handleFormClose = () => {
    setCategories([]);
    setShowExpenseForm(false);
    fetchExpensesForCurrMonth();
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
          <CreditCardIcon className="w-7 h-7 stroke-[2.5] text-[#423e36]" />
          <header className="text-2xl font-bold text-[#423e36]">
            Expenses
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
          <span title="Create a category" className="font-medium sm:block hidden">Add expense source</span>
        </button>

      </section>

      {/* Area chart display section (will only show if expense exists) */}
      {
        expenses.length !== 0 &&
        <section className="flex flex-col items-center justify-center w-full h-[4.5in] mb-5 rounded-xl text-[#423e36] bg-white/50 py-4 px-6">
          <div className="flex flex-col w-full mb-3">
            <p className="text-left sm:text-lg font-bold">Overview of this month's Expenses</p>
          </div>
          <div className="h-full w-full p-2 pt-8 pr-8 rounded-xl flex items-center justify-center shadow-[inset_2px_210px_200px_rgba(255,255,255,0.8)]">
            <SimpleAreaChart 
              transactions={expenses}
              type="expense"
            />
          </div>
        </section>
      }

      {/* Main expense display section */}
      <section className="w-full md:h-[87%] h-11/12 rounded-xl text-[#423e36] bg-white/50 overflow-y-auto overflow-x-hidden thin-scrollbar">
      
        {/* Need to check if any expenses are available or not */}
        {
          expenses.length === 0 ?

          <EmptyListFiller
            setShowForm={handleFormShow}
            isLoading={isCategoryLoading}
            message1="No expenses added for this month"
            message2="Get started by adding a new expense source for this month"
          />
          
          :

          // Heading and income section
          <ExpenseIncomeList
            transactions={expenses}
            type="expense"
            hoveringRow={hoveringRow}
            setHoveringRow={setHoveringRow}
            fetchTransactionsForCurrMonth={fetchExpensesForCurrMonth}
            heading="Your this month's Expense"
            DefaultIconHover={ArrowUpOnSquareStackIconSolid}
            DefaultIconNotHover={ArrowUpOnSquareStackIcon}
          />
        }
      
      </section>

      {/* Expense Form for adding a new expense */}
      {
        showExpenseForm &&
          <ExpenseIncomeForm handleFormClose={handleFormClose} type="expense" categories={categories} />
      }

    </section>

  )
}

export default Expense
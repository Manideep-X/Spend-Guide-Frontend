import { EnvelopeIcon, FolderArrowDownIcon, TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import { deleteAnIncomeById } from "../../../services/IncomeService"
import { deleteAnExpenseById } from "../../../services/ExpenseService";
import toast from "react-hot-toast";
import { useState } from "react";
import { format } from "date-fns";
import { ArrowDownTrayIcon, ArrowPathIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

// Component for income/expense list fetched from the DB
const ExpenseIncomeList = ({
    transactions, type, hoveringRow, setHoveringRow, heading, defaultIconHover, defaultIconNotHover
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const formatter = Intl.NumberFormat('en-US');

    // This will try to delete an income/expense by it's ID from the DB
    const deleteTransactionById = async (transaction) => {
        console.log("Need to delete ", transaction);
        setIsLoading(true);
        try {
            if (transaction?.type === "income") {

                await deleteAnIncomeById(transaction.id);
                toast.success("Income successfully deleted!");

            } else if (transaction?.type === "expense") {

                await deleteAnExpenseById(transaction.id);
                toast.success("Expense successfully deleted!");

            }
        } catch (error) {
            console.log(error);
            if (error.message) toast.error(error.message);
            if (error.redirect) navigate(error.redirect);
        } finally {
            setIsLoading(false);
        }
    }

    // Corfirmation toaster box for deletion
    const handleCorfirmation = (transaction) => {
        return toast((t) => (
            <div className="rounded flex flex-col items-center justify-center gap-2 font-medium">
                <span className="flex flex-col items-center justify-center gap-3">
                    <ExclamationTriangleIcon className="w-15 text-red-500" />
                    <p className="text-center text-xl font-bold">
                        Are you sure?
                    </p>
                    <p className="text-center text-sm">
                        Do you really want to delete this record? This process can't be undone.
                    </p>
                </span>
                <div className="flex items-center justify-center gap-4">
                    <button 
                        className="p-3 text-sm font-bold rounded-xl hover:cursor-pointer text-white bg-green-600"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                    <button 
                        className="p-3 text-sm font-bold rounded-xl hover:cursor-pointer text-white bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isLoading}
                        onClick={ async () => {
                            await deleteTransactionById(transaction);
                            toast.dismiss(t.id);
                        }}
                    >
                        {
                            isLoading ?
                            <div className="w-full h-full flex items-center justify-center">
                                <ArrowPathIcon className="w-8 animate-spin" />
                                Deleting...
                            </div>
                            :
                            ("Delete")
                        }
                    </button>
                </div>
            </div>
        ), { duration: Infinity });
    }

return (
    <div className="relative">
        <span className="sticky flex py-4 px-6 backdrop-blur-md items-center justify-between top-0 w-full sm:text-lg font-bold">
            <span>
                {heading}
                <p className="text-sm font-medium sm:hidden">Tap an {type} for more options</p>
            </span>

            {/* Buttons for email and download */}
            <div className="h-full flex sm:gap-2 gap-1 items-center justify-center">
                <button 
                disabled={transactions.length === 0}
                className="flex items-center gap-2 justify-center sm:w-38 rounded-xl sm:px-4 px-2 py-2 text-[16px] font-bold shadow-[inset_2px_30px_15px_rgba(255,255,255,0.6)] transition-all 
                hover:shadow-[inset_2px_30px_25px_rgba(255,255,255,0.7)] active:shadow-[inset_2px_30px_35px_rgba(255,255,255)] hover:cursor-pointer disabled:shadow-none disabled:opacity-60 disabled:bg-white/60 disabled:cursor-not-allowed">
                    <FolderArrowDownIcon className="h-7 opacity-90" />
                    <p className="hidden sm:inline opacity-90">Download</p>
                </button>
                <button 
                disabled={transactions.length === 0}
                className="flex items-center gap-2 justify-center sm:w-38 rounded-xl sm:px-4 px-2 py-2 text-[16px] font-bold shadow-[inset_2px_30px_15px_rgba(255,255,255,0.6)] transition-all 
                hover:shadow-[inset_2px_30px_25px_rgba(255,255,255,0.7)] active:shadow-[inset_2px_30px_35px_rgba(255,255,255)] hover:cursor-pointer disabled:shadow-none disabled:opacity-60 disabled:bg-white/60 disabled:cursor-not-allowed">
                    <EnvelopeIcon className="h-7 opacity-90" />
                    <p className="hidden sm:inline opacity-90">Email</p>
                </button>
            </div>
        </span>
        <section className="w-full h-full flex flex-wrap py-2 px-6 gap-x-8 gap-y-2">
            {
                transactions.map((transaction, index) => (
                    <section
                        key={transaction.id || index}
                        id={transaction.id || index}
                        onMouseEnter={() => setHoveringRow(transaction.id || index)}
                        onMouseLeave={() => setHoveringRow(null)}
                        className={`w-full grid grid-cols-[auto_1fr] gap-2 md:items-center px-6 py-5 rounded-xl transition-all
                    ${hoveringRow === (transaction.id || index)
                                ? 'shadow-[inset_2px_80px_30px_rgba(255,255,255,0.7)]'
                                : 'shadow-[inset_2px_60px_65px_rgba(255,255,255,0.7)]'}
                    `}>
                        {/* This will show user given icon if present or else the default one */}
                        {transaction.iconUrl
                            ? <img
                                src={transaction.iconUrl}
                                alt={transaction.name}
                                className="sm:w-14 w-11 sm:p-3 p-2 bg-white/80 rounded-xl" />
                            : <defaultIconHover className="w-12 p-3 bg-white/50 rounded-xl" />
                        }
                        <div className="flex md:flex-row gap-2 md:gap-0 flex-col md:items-center justify-between">

                            {/* This section will display income/expense name and date */}
                            <div className="leading-5 flex flex-col justify-center">
                                <span className="text-sm sm:text-[17px] font-bold transition-all overflow-ellipsis">{transaction.name}</span>
                                <p className="text-xs sm:hidden text-[#777676] transition-all flex gap-1 items-center">
                                    <ArrowDownTrayIcon className="w-3 stroke-2" />
                                    {format(transaction.date, 'do MMM, yyyy')}
                                </p>
                                <p className="hidden sm:flex sm:text-[15px] text-[#777676] transition-all gap-2 items-center">
                                    <ArrowDownTrayIcon className="w-5" />
                                    {format(transaction.date, 'do MMMM, yyyy')}
                                </p>
                            </div>

                            {/* This section will show the amount and remove button */}
                            <span className="h-12 flex md:items-center md:justify-center overflow-hidden transition-all">
                                <button
                                    onClick={() => handleCorfirmation(transaction)}
                                    disabled={isLoading}
                                    className={`md:mr-2 bg-white/50 rounded-xl hover:cursor-pointer hover:bg-white/80 active:bg-white disabled:cursor-not-allowed disabled:bg-black/20 overflow-hidden transition-all
                                    ${hoveringRow === (transaction.id || index) || isLoading ?
                                            'w-12 mr-2' : 'w-0'}`}
                                >
                                    {
                                        isLoading ?
                                            <ArrowPathIcon className="h-12 p-3 animate-spin" /> :
                                            <TrashIcon className="h-12 p-3" />
                                    }
                                </button>

                                {type === "income"
                                    ?
                                    <div className={`flex font-bold items-center justify-center sm:w-36 w-30 h-full p-3 text-white rounded-xl transition-all
                                    ${hoveringRow === (transaction.id || index) ? 'bg-[#2cb648de]' : 'bg-[#29a943e1]'}`}>
                                        <PlusIcon className="h-5 py-1 stroke-[3.5]" />
                                        <p className="sm:text-inherit text-sm">
                                            ${formatter.format(transaction.amount)}
                                        </p>
                                        <ArrowTrendingUpIcon className="h-full p-[2px] stroke-2 ml-[2px]" />
                                    </div>
                                    :
                                    <div className={`flex font-bold items-center justify-center sm:w-36 w-30 h-full p-3 text-white bg- rounded-xl transition-all
                                    ${hoveringRow === (transaction.id || index) ? 'shadow-none' : 'shadow-2xl/30 shadow-red-700'}`}>
                                        <MinusIcon className="h-5 py-1 stroke-[3.5]" />
                                        <p className="sm:text-inherit text-sm">
                                            ${formatter.format(transaction.amount)}
                                        </p>
                                        <ArrowTrendingDownIcon className="h-full p-[2px] stroke-2 ml-[2px]" />
                                    </div>
                                }
                            </span>
                        </div>

                    </section>
                ))
            }
        </section>
    </div>
)

}

export default ExpenseIncomeList
import { ArrowDownOnSquareStackIcon, ArrowDownTrayIcon, ArrowPathIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, ArrowUpOnSquareStackIcon, ArrowUpTrayIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import { ArrowDownOnSquareStackIcon as ArrowDownOnSquareStackIconSolid, 
    ArrowUpOnSquareStackIcon as ArrowUpOnSquareStackIconSolid, 
    TrashIcon} from "@heroicons/react/24/solid";
import { CURRENCY } from "../../../utils/GetAssets";
import { format } from "date-fns";
import { useState } from "react";
import { deleteAnIncomeById } from "../../../services/IncomeService";
import { deleteAnExpenseById } from "../../../services/ExpenseService";

const FilterList = ({ transactions, type, filterTransactions }) => {

    const [hoveringRow, setHoveringRow] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formatter = Intl.NumberFormat('en-US');

    const DefaultIconHover = (type === "income") ? 
        ArrowDownOnSquareStackIconSolid : ArrowUpOnSquareStackIconSolid;
    const DefaultIconNotHover = (type === "income") ? 
        ArrowDownOnSquareStackIcon : ArrowUpOnSquareStackIcon;

    // This will try to delete an income/expense by it's ID from the DB
    const deleteTransactionById = async (transaction) => {
        setIsLoading(transaction.id);
        try {
            if (type === "income") {

                await deleteAnIncomeById(transaction.id);
                toast.success("Income successfully deleted!");

            } else if (type === "expense") {

                await deleteAnExpenseById(transaction.id);
                toast.success("Expense successfully deleted!");

            }
        } catch (error) {
            console.log(error);
            if (error.message) toast.error(error.message);
            if (error.redirect) navigate(error.redirect);
        } finally {
            setIsLoading(null);
            filterTransactions();
        }
    }

    // Corfirmation toaster box for deletion
    const handleConfirmation = (transaction) => {
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
                        disabled={isLoading === transaction.id}
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
        <section className="w-full h-full flex flex-col py-5 px-8 gap-x-8 gap-y-2 overflow-x-auto overflow-y-auto thin-scrollbar">
            {/* Displays each income/expense after filtering */}
            {
                transactions.map((transaction, index) => (
                    <section
                        key={transaction.id || index}
                        id={transaction.id || index}
                        onMouseEnter={() => setHoveringRow(transaction.id || index)}
                        onMouseLeave={() => setHoveringRow(null)}
                        className={`w-full grid grid-cols-[auto_1fr] gap-2 md:items-center px-6 py-5
                            h-auto rounded-xl transition-all
                    ${hoveringRow === (transaction.id || index)
                                ? 'shadow-[inset_2px_90px_105px_rgba(255,255,255)]'
                                : 'shadow-[inset_2px_50px_80px_rgba(255,255,255,0.7)]'}
                    `}>
                        {/* This will show user given icon if present or else the default one */}
                        {transaction.iconUrl
                            ? <img
                                src={transaction.iconUrl}
                                alt={transaction.name}
                                className={`sm:w-14 w-11 sm:p-3 p-2 rounded-xl
                                ${hoveringRow === (transaction.id || index) ? 'bg-white' : 'bg-white/80'}`} />
                            :
                            <>{
                                hoveringRow === (transaction.id || index) ?
                                    <DefaultIconHover className="sm:w-14 w-11 sm:p-3 p-2 bg-white rounded-xl" />
                                    :
                                    <DefaultIconNotHover className="sm:w-14 w-11 sm:p-3 p-2 bg-white/80 rounded-xl" />
                            }</>
                        }
                        <div className="flex md:flex-row gap-2 md:gap-0 flex-col md:items-center justify-between">

                            {/* This section will display income/expense name and date */}
                            <div className="leading-5 flex flex-col justify-center">
                                <span className="text-sm sm:text-[17px] font-bold transition-all overflow-ellipsis">{transaction.name}</span>
                                <p className="text-xs sm:hidden text-[#777676] transition-all flex gap-1 items-center">
                                    {
                                        type === "income" ?
                                            <ArrowDownTrayIcon className="w-3 stroke-2" />
                                            : <ArrowUpTrayIcon className="w-3 stroke-2" />
                                    }
                                    {format(transaction.date, 'do MMM, yyyy')}
                                </p>
                                <p className="hidden sm:flex sm:text-[15px] text-[#777676] transition-all gap-2 items-center">
                                    {
                                        type === "income" ?
                                            <ArrowDownTrayIcon className="w-4" />
                                            : <ArrowUpTrayIcon className="w-4" />
                                    }
                                    {format(transaction.date, 'do MMMM, yyyy')}
                                </p>
                            </div>

                            {/* This section will show the amount and remove button */}
                            <span className="h-12 flex md:items-center md:justify-center transition-all">
                                <button
                                    onClick={() => handleConfirmation(transaction)}
                                    disabled={isLoading === transaction.id}
                                    className={`md:mr-2 bg-white/50 rounded-xl hover:cursor-pointer hover:bg-white/80 active:bg-white disabled:cursor-not-allowed disabled:bg-black/20 overflow-hidden transition-all
                                    ${hoveringRow === (transaction.id || index) || (isLoading === transaction.id) ? 'w-12 mr-2' : 'w-0'}`}
                                >
                                    {
                                        isLoading === transaction.id ?
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
                                            {CURRENCY}{formatter.format(transaction.amount)}
                                        </p>
                                        <ArrowTrendingUpIcon className="h-full p-[2px] stroke-2 ml-[2px]" />
                                    </div>
                                    :
                                    <div className={`flex font-bold items-center justify-center sm:w-36 w-30 h-full p-3 text-white rounded-xl transition-all
                                    ${hoveringRow === (transaction.id || index) ? 'bg-red-500/80' : 'bg-red-500/90'}`}>
                                        <MinusIcon className="h-5 py-1 stroke-[3.5]" />
                                        <p className="sm:text-inherit text-sm">
                                            {CURRENCY}{formatter.format(transaction.amount)}
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
    )
}

export default FilterList
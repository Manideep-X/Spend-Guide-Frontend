import { EnvelopeIcon, FolderArrowDownIcon, TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid"
import { deleteAnIncomeById } from "../../../services/IncomeService"
import { deleteAnExpenseById } from "../../../services/ExpenseService";
import { downloadExpenses, downloadIncomes, emailExpenses, emailIncomes } from "../../../services/ExcelService";
import toast from "react-hot-toast";
import { useState } from "react";
import { format } from "date-fns";
import { ArrowDownTrayIcon, ArrowPathIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon, ArrowUpTrayIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { CURRENCY } from "../../../utils/GetAssets";

// Component for income/expense list fetched from the DB
const ExpenseIncomeList = ({
    transactions, type, hoveringRow, setHoveringRow, fetchTransactionsForCurrMonth, heading, DefaultIconHover, DefaultIconNotHover
}) => {

    const [isLoading, setIsLoading] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);
    const formatter = Intl.NumberFormat('en-US');
    const navigate = useNavigate();

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
            fetchTransactionsForCurrMonth();
        }
    }

    // Function to download income/expense details for this month
    const downloadDetails = async () => {
        setIsDownloading(true);
        let responseBlob = null;

        if (type === "income") {
            try {
                responseBlob = await downloadIncomes();
            } catch (error) {
                console.error(error);
                if (error.message) toast.error(error.message);
                if (error.redirect) navigate(error.redirect);
            }
        } 
        else if (type === "expense") {
            try {
                responseBlob = await downloadExpenses();
            } catch (error) {
                console.error(error);
                if (error.message) toast.error(error.message);
                if (error.redirect) navigate(error.redirect);
            }
        }
        
        if (responseBlob) {
            // file name and download url
            let excelFileName = "detailed_list_of_"+type+".xlsx";
            
            const downloadUrl = window.URL.createObjectURL(responseBlob);
            
            // It creats an anchor tag with download url and filename
            const anchorTag = document.createElement('a');
            anchorTag.href = downloadUrl;
            anchorTag.download = excelFileName;
    
            // Add the anchor tag to the function caller's body, i.e., the download button and remove it after one click
            document.body.appendChild(anchorTag);
            anchorTag.click();
            anchorTag.parentNode.removeChild(anchorTag);
            window.URL.revokeObjectURL(downloadUrl);
    
            // Toaster message for successful download
            toast.success("Details of all "+type+" is being downloaded!");
            setIsDownloading(false);
    
        }
    }
    
    // Function to email income/expense details for this month
    const emailDetails = async () => {
        setIsEmailSending(true);

        if (type === "income") {
            try {
                await emailIncomes();
                toast.success("Email for "+type+"s is sent to your registered email address!");
            } catch (error) {
                console.error(error);
                if (error.message) toast.error(error.message);
                if (error.redirect) navigate(error.redirect);
            } finally {
                setIsEmailSending(false);
            }
        } 
        else if (type === "expense") {
            try {
                await emailExpenses();
                toast.success("Email for "+type+"s is sent to your registered email address!");
            } catch (error) {
                console.error(error);
                if (error.message) toast.error(error.message);
                if (error.redirect) navigate(error.redirect);
            } finally {
                setIsEmailSending(false);
            }
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
    <div className="relative">
        <span className="sticky flex py-4 px-6 backdrop-blur-md items-center justify-between top-0 w-full sm:text-lg font-bold">

            {/* Heading above the list */}
            <span>
                {heading}
                <p className="text-sm font-medium sm:hidden">Tap an {type} for more options</p>
            </span>

            {/* Buttons for email and download */}
            <div className="h-full flex sm:gap-2 gap-1 items-center justify-center">
                <button 
                type="button"
                onClick={() => downloadDetails()}
                disabled={transactions.length === 0 || isDownloading}
                className="flex items-center gap-2 justify-center w-auto rounded-xl sm:px-4 px-2 py-2 text-[16px] font-bold shadow-[inset_2px_30px_15px_rgba(255,255,255,0.6)] transition-all 
                hover:shadow-[inset_2px_30px_25px_rgba(255,255,255,0.7)] active:shadow-[inset_2px_30px_35px_rgba(255,255,255)] hover:cursor-pointer disabled:shadow-none disabled:opacity-60 disabled:bg-white/60 disabled:cursor-not-allowed">
                    {
                        isDownloading ?
                        <ArrowPathIcon className="h-7 opacity-90 animate-spin" /> :
                        <FolderArrowDownIcon className="h-7 opacity-90" />
                    }
                    <p className="hidden sm:inline opacity-90">
                        {isDownloading ? 'Downloading...' : 'Download'}
                    </p>
                </button>
                <button 
                type="button"
                onClick={() => emailDetails()}
                disabled={transactions.length === 0 || isEmailSending}
                className="flex items-center gap-2 justify-center sm:w-38 rounded-xl sm:px-4 px-2 py-2 text-[16px] font-bold shadow-[inset_2px_30px_15px_rgba(255,255,255,0.6)] transition-all 
                hover:shadow-[inset_2px_30px_25px_rgba(255,255,255,0.7)] active:shadow-[inset_2px_30px_35px_rgba(255,255,255)] hover:cursor-pointer disabled:shadow-none disabled:opacity-60 disabled:bg-white/60 disabled:cursor-not-allowed">
                    {
                        isEmailSending ?
                        <ArrowPathIcon className="h-7 opacity-90 animate-spin" /> :
                        <EnvelopeIcon className="h-7 opacity-90" />
                    }
                    <p className="hidden sm:inline opacity-90">
                        {isEmailSending ? 'Sending...' : 'Email'}
                    </p>
                </button>
            </div>
        </span>

        {/* Displays each income/expense */}
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
                            <span className="h-12 flex md:items-center md:justify-center overflow-hidden transition-all">
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
    </div>
)

}

export default ExpenseIncomeList
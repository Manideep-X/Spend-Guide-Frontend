import { Link } from "react-router-dom"
import { CURRENCY } from "../../../utils/GetAssets";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon, PlusIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

const RecentTransactionCard = ({ 
  transactions, type, heading, TopIcon, DefaultIconUp, DefaultIconDown, buttonLink 
}) => {

  const formatter = Intl.NumberFormat("en-US");

  return (
    <section className="relative flex flex-1 w-full flex-col min-w-[3.5in] items-center justify-center overflow-x-hidden overflow-y-auto thin-scrollbar-light rounded-2xl bg-white/70 h-[5in]">

      {/* Navbar of transaction card */}
      <div className="flex items-center justify-between px-4 py-2 sticky top-0 w-full bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <TopIcon className="w-7 stroke-2" />
          <p className="text-lg font-semibold text-left">
            {heading}
          </p>
        </div>
        {
          (type === "income" || type === "expense") &&
          <Link 
            to={`/${type}`} 
            className="flex font-medium text-sm px-3 py-2 gap-1 items-center bg-white/50 rounded-xl hover:cursor-pointer hover:bg-white/80 active:bg-white disabled:cursor-not-allowed disabled:bg-black/20 border border-[#423e3688]"
          >
            More
            <ArrowRightCircleIcon className="h-5 stroke-2 rounded-full" />
          </Link>
        }
      </div>

      {/* Body of the transaction card */}
      <div className="flex flex-col w-full h-full pt-6 md:px-8 px-3">
        {
          transactions.map((transaction, index) => (
            <div key={index} className="flex w-full h-16 px-1 py-3 items-center justify-between border-b border-[#423e363a]">
              {
                transaction?.iconUrl ? 
                <img 
                  src={transaction?.iconUrl} 
                  alt={transaction?.name || 'icon'} 
                  className="grow-0 sm:w-13 w-10 sm:h-13 h-10 sm:p-3 p-2 rounded-xl"
                /> :
                (
                  type === "income" || transaction?.type === "income" ?
                  <DefaultIconDown className="grow-0 sm:w-13 w-10 sm:h-13 h-10 sm:p-3 p-2 rounded-xl" /> :
                  <DefaultIconUp className="grow-0 sm:w-13 w-10 sm:h-13 h-10 sm:p-3 p-2 rounded-xl" />
                )
              }

              <div className="grow flex flex-col text-left items-center justify-center">
                <p className="w-full font-semibold truncate min-w-0">{transaction.name}</p>
                <p className="w-full block text-[13px] text-[#777676] transition-all gap-2 items-center text-left truncate min-w-0">{format(transaction.date, 'do MMM, yyyy')}</p>
              </div>

              {(type === "income" || transaction?.type === "income")
                ?
                <div className="grow-0 flex font-bold items-center justify-center sm:w-28 w-24 h-full py-3 text-white rounded-xl bg-[#29a943e1]">
                  <PlusIcon className="h-5 py-1 stroke-[3.5]" />
                  <p className="sm:text-inherit text-sm">
                    {CURRENCY}{formatter.format(transaction.amount)}
                  </p>
                  <ArrowTrendingUpIcon className="h-full pr-[2px] stroke-2 ml-[2px]" />
                </div>
                :
                <div className="grow-0 flex font-bold items-center justify-center sm:w-28 w-24 h-full py-3 text-white rounded-xl bg-red-500/90">
                  <MinusIcon className="h-5 py-1 stroke-[3.5]" />
                  <p className="sm:text-inherit text-sm">
                    {CURRENCY}{formatter.format(transaction.amount)}
                  </p>
                  <ArrowTrendingDownIcon className="h-full pr-[2px] stroke-2 ml-[2px]" />
                </div>
              }
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default RecentTransactionCard
import { ArrowsRightLeftIcon, ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline"
import { ArchiveBoxIcon, CreditCardIcon, WalletIcon } from "@heroicons/react/24/solid"

const AmountCard = ({ totalIncome, totalExpense, totalBalance }) => {

  return (
    <div className="flex flex-col md:flex-row grow w-full flex-wrap items-center sm:p-5 py-5 gap-5 rounded-2xl bg-white/70">

      {/* total income */}
      <div className="flex flex-1 sm:min-w-86 min-w-82 px-8 py-5 bg-white/50 rounded-2xl items-center justify-between gap-2 shadow-xl/10">
        <div className="relative">
          <ArrowTrendingUpIcon className="absolute -bottom-2 -right-4 stroke-2 w-10 rounded-full p-2 text-white shadow-xl/30 bg-[#25933b]" />
          <WalletIcon className="w-20 p-5 rounded-2xl bg-white/70 shadow-lg/30" />
        </div>
        <div>
          <p className="text-sm font-semibold text-right w-full opacity-70">
            Total Income
          </p>
          <p className="text-2xl font-bold text-right w-full text-shadow-lg/10">{totalIncome}</p>
        </div>
      </div>

      {/* total expense */
        totalExpense &&
        <div className="flex flex-1 sm:min-w-86 min-w-82 px-8 py-5 bg-white/50 rounded-2xl items-center justify-between gap-2 shadow-xl/10">
          <div className="relative">
            <ArrowTrendingDownIcon className="absolute -bottom-2 -right-4 stroke-2 w-10 rounded-full p-2 text-white shadow-xl/30 bg-[#C21807]" />
            <CreditCardIcon className="w-20 p-5 rounded-2xl bg-white/70 shadow-lg/30" />
          </div>
          <div>
            <p className="text-sm font-semibold text-right w-full opacity-70">
              Total Expense
            </p>
            <p className="text-2xl font-bold text-right w-full text-shadow-lg/10">{totalExpense}</p>
          </div>
        </div>
      }

      {/* total balance */}
      <div className="flex flex-1 sm:min-w-86 min-w-82 px-8 py-5 bg-white/50 rounded-2xl items-center justify-between gap-2 shadow-xl/10">
        <div className="relative">
          <ArrowsRightLeftIcon className="absolute -bottom-2 -right-4 stroke-2 w-10 rounded-full p-2 text-white shadow-xl/30 bg-[#808080]" />
          <ArchiveBoxIcon className="w-20 p-5 rounded-2xl bg-white/70 shadow-lg/30" />
        </div>
        <div>
          <p className="text-sm font-semibold text-right w-full opacity-70">
            Total Balance
          </p>
          <p className="text-2xl font-bold text-right w-full text-shadow-lg/10">{totalBalance}</p>
        </div>
      </div>

    </div>
  )
}

export default AmountCard
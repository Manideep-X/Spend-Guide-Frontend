import { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import { getDashboardDetails } from "../../services/DashboardService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AmountCard from "./components/AmountCard";
import RecentTransactionCard from "./components/RecentTransactionCard";
import BalancePieChart from "./components/BalancePieChart";
import EmptyDashFiller from "./components/EmptyDashFiller";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { ArrowDownOnSquareIcon, ArrowDownOnSquareStackIcon, ArrowUpOnSquareIcon, ArrowUpOnSquareStackIcon, CreditCardIcon, WalletIcon } from "@heroicons/react/24/solid";

const Dashboard = () => {

  const [dashboardDetails, setDashboardDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch dashboard details from the DB 
  const fetchDashboardDetails = async () => {

    setIsLoading(true);

    try {
      const response = await getDashboardDetails();
      if (response) {
        setDashboardDetails(response);
        console.log(response);
      }
    } catch (error) {

      if (error.message) toast.success(error.message);
      if (error.redirect) navigate(error.redirect);

    } finally {
      setIsLoading(false);
    }

  }

  // fetch details in every render/re-render
  useEffect(() => {
    fetchDashboardDetails();
  }, [])
  

  if (isLoading)
    return <Loading />

  if (!dashboardDetails?.totalIncome && !dashboardDetails?.totalExpense && !dashboardDetails?.totalBalance)
    return <EmptyDashFiller />

  return (
    <section className="md:px-5 px-1 flex flex-col gap-6 w-full h-screen overflow-x-hidden overflow-y-auto thin-scrollbar text-[#423e36] pt-20 md:pt-3">
      <section className="w-full flex flex-col md:flex-row items-center justify-between">
        
        {/* amount card for total income, expense & balance */}
        <AmountCard 
          totalIncome={dashboardDetails?.totalIncome || 0}
          totalExpense={dashboardDetails?.totalExpense || 0}
          totalBalance={dashboardDetails?.totalBalance || 0}
        />

      </section>
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* recent transaction card for last 10 transaction */}
        <RecentTransactionCard 
          transactions={dashboardDetails?.last10Transactions || []}
          heading="Latest Transactions"
          TopIcon={ArrowsUpDownIcon}
          DefaultIconUp={ArrowUpOnSquareIcon}
          DefaultIconDown={ArrowDownOnSquareIcon}
        />

        {/* balance pie chart for transaction overview */}
        {
          dashboardDetails?.totalIncome && dashboardDetails?.totalBalance &&
          <BalancePieChart
            totalIncome={dashboardDetails.totalIncome || 0}
            totalExpense={dashboardDetails.totalExpense || 0}
            totalBalance={dashboardDetails.totalBalance || 0}
          />
        }

      </section>
      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
        
        {/* recent transaction card for last 5 incomes */}
        {
          dashboardDetails?.last5Incomes && dashboardDetails?.last5Incomes.length !== 0 &&
          <RecentTransactionCard
            transactions={dashboardDetails.last5Incomes}
            heading="Recent incomes"
            type="income"
            TopIcon={WalletIcon}
            DefaultIconDown={ArrowDownOnSquareStackIcon}
            />
          }

        {/* recent transaction card for last 5 expenses */}
        {
          dashboardDetails?.last5Expenses && dashboardDetails?.last5Expenses.length !== 0 &&
          <RecentTransactionCard
            transactions={dashboardDetails.last5Expenses}
            heading="Recent expenses"
            type="expense"
            TopIcon={CreditCardIcon}
            DefaultIconUp={ArrowUpOnSquareStackIcon}
          />
        }

      </section>
    </section>
  )
}

export default Dashboard
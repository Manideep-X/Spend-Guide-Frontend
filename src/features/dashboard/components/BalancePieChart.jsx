import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { BalanceChartData } from "../../../utils/ChartData"
import { ChartPieIcon } from "@heroicons/react/24/solid";

const BalancePieChart = ({ totalIncome, totalExpense, totalBalance }) => {

  const chartData = BalanceChartData(totalIncome, totalExpense, totalBalance);

  return (
    <section className="relative flex flex-col grow items-center justify-center h-[5in] rounded-2xl bg-white/60 overflow-hidden">

      {/* Navbar */}
      <div className="absolute top-0 flex gap-2 items-center justify-between px-4 py-2 w-full bg-white/70">
        <ChartPieIcon className="grow-0 w-7" />
        <p className="grow-1 text-lg font-semibold text-left">
          Balance overview
        </p>
      </div>

      <div className="w-full h-[0.6in]"></div>

      <div className="relative flex flex-col items-center justify-between w-full h-full">
        <ResponsiveContainer width="100%" height="100%" >
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={80}
              outerRadius={150}
              paddingAngle={5}
              dataKey="value"
              label
            >
              {
                chartData.map((data, index) => (
                  <Cell key={`${data.name}_${index}`} fill={data.colour} />
                ))
              }
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-[44%] flex flex-col items-center justify-center w-full">
          <p className="text-sm font-medium text-center w-full">Total Balance</p>
          <p className="text-2xl font-bold text-center w-full text-shadow-lg/10">{totalBalance}</p>
        </div>
      </div>

      {/* Colour label below chart */}
      <div className="flex flex-wrap gap-4 sm:gap-4 items-center justify-center py-5">
        {
          chartData.map((data, index) => (
            <div key={`${data.name}_${index}`} className="flex gap-2 items-center justify-center">
              <span 
                className={`w-5 h-5 rounded-lg border border-white`}
                style={{ backgroundColor: data.colour }}
              ></span>
              <p className="font-medium px-2">{data.name}</p>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default BalancePieChart
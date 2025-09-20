import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { BalanceChartData } from "../../../utils/ChartData"
import { ChartPieIcon } from "@heroicons/react/24/solid";

const BalancePieChart = ({ totalIncome, totalExpense, totalBalance }) => {

  const chartData = BalanceChartData(totalIncome, totalExpense, totalBalance);

  return (
    <section className="relative flex flex-col flex-1 w-full min-w-[3.5in] items-center justify-center h-[5in] rounded-2xl bg-white/70 overflow-hidden">

      {/* Navbar */}
      <div className="absolute top-0 flex gap-2 items-center justify-between px-4 py-2 w-full bg-white/70">
        <ChartPieIcon className="grow-0 w-7" />
        <p className="grow-1 text-lg font-semibold text-left">
          Balance overview
        </p>
      </div>

      <div className="w-full h-[0.6in]"></div>

      <div className="relative flex flex-col items-center justify-between w-full h-full">
        {
          window.innerWidth >= 1024 && (
            <ResponsiveContainer width="100%" height="100%" >
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={80}
                  outerRadius={130}
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
          )
        }
        {
          window.innerWidth >= 640 && window.innerWidth < 1024 && (
            <ResponsiveContainer width="100%" height="100%" >
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={50}
                  outerRadius={100}
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
          )
        }
        {
          window.innerWidth < 640 && (
            <ResponsiveContainer width="100%" height="100%" >
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={50}
                  outerRadius={90}
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
          )
        }
        <div className="absolute top-[44%] flex flex-col items-center justify-center w-full">
          <p className="md:text-sm text-xs font-medium text-center w-full">Total Balance</p>
          <p className="md:text-2xl sm:text-lg font-bold text-center w-full text-shadow-lg/10">{totalBalance}</p>
        </div>
      </div>

      {/* Colour label below chart */}
      <div className="flex items-center flex-wrap justify-center py-3 my-2 mx-4 bg-white/70 rounded-2xl">
        {
          chartData.map((data, index) => (
            <div key={`${data.name}_${index}`} className="flex sm:gap-0 gap-0 w-28 items-center justify-center">
              <span 
                className={`w-5 h-5 rounded-lg border border-white`}
                style={{ backgroundColor: data.colour }}
              ></span>
              <p className="font-medium md:text-sm sm:text-[10px] text-sm px-2">{data.name}</p>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default BalancePieChart
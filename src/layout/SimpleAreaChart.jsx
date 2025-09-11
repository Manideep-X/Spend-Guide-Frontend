import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AreaChartData } from "../utils/ChartData"
import { CURRENCY } from "../utils/GetAssets"
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";

// The props injection will be done by Recharts
const CustomToolTip = ({ active, payload, type }) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#ffffff52] text-[#423e36] backdrop-blur-sm shadow-md rounded-lg p-3">
        <p className="font-bold">{data.month}</p>
        {
            type === "income" ?
                <span className="text-green-700 font-semibold flex gap-2">
                  Total: + {CURRENCY}{data.totalAmount.toLocaleString()}
                  <ArrowTrendingUpIcon className="h-6 stroke-2" />
                </span>
            :
                <span className="text-red-700 font-semibold flex gap-2">
                    Total: - {CURRENCY}{data.totalAmount.toLocaleString()}
                    <ArrowTrendingDownIcon className="h-6 stroke-2" />
                </span>
        }
        <p className="font-medium mt-1">Details: </p>
        <ul className="list-disc ml-4 text-sm">
          {
            data.items.map((item, index) => (
              <li key={index} className="flex font-light" >
                {item.name}
                {
                    item.amount && 
                    <span className="inline">
                        <p className={`font-medium ${type==="income"?'text-green-700':'text-red-700'}`}>
                            : {CURRENCY}{item.amount.toLocaleString()}
                        </p>
                    </span>
                }
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
  return null;
}

const SimpleAreaChart = ({ transactions, type }) => {
  
  const graphData = AreaChartData(transactions);

  return (
    <ResponsiveContainer width="100%" height="100%" >
      <AreaChart data={graphData} >

       {/* defs defines a linear gradient svg that fills up the area beneath the curve */}
        <defs>
          <linearGradient id="colorTotalAmount" x1="0" y1="0" x2="0" y2="1" >
            <stop offset="5%" stopColor={`${type === "income" ? "#728C69" : "#D10000"}`} stopOpacity={0.8} />
            <stop offset="95%" stopColor={`${type === "income" ? "#728C69" : "#D10000"}`} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Defining X-axis as the month */}
        <XAxis dataKey="month" />
        <YAxis />

        {/* Draws light grid line behind the chart */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* Tooltip shown when hover over the graph */}
        <Tooltip content={<CustomToolTip type={type} />} />

        {/* Adding all the visual details */}
        <Area
          type="monotone"                 // setting line as smooth and curve
          dataKey="totalAmount"           // Y-axis data
          stroke="#728C69"                // curve line's color
          strokeWidth={2}                 // curve line's width
          fill="url(#colorTotalAmount)"    // fill area under the curve
          dot={{ r: 5, fill: "#728C69" }} // small dot for each data point
          activeDot={{ r: 7 }}            // larger dot when hover
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default SimpleAreaChart
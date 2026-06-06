import {
  useEffect,
  useState,
} from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  getDashboardStats,getMonthlySales,
} from "../../services/dashboard.service"

export default function Dashboard() {

  const [stats, setStats] = useState(null);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchStats()
    fetchMonthlySales()
  }, [])
  
  const fetchMonthlySales =
  async () => {

    try {

      const data =
        await getMonthlySales()

      setSalesData(data)

    } catch (error) {

      console.log(error)
    }
  }

  const fetchStats =
    async () => {

      try {

        const data =
          await getDashboardStats()

        setStats(data)

      } catch (error) {

        console.log(error)
      }
    }

  if (!stats) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Dashboard</h1>

      {/* CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white p-4 md:p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500">Total Sales</h2>

          <p className="text-2xl md:text-3xl font-bold">₹{stats.totalSales}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Today Sales</h2>

          <p className="text-3xl font-bold">₹{stats.todaySales}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Due Amount</h2>

          <p className="text-3xl font-bold">₹{stats.dueAmount}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Low Stock</h2>

          <p className="text-3xl font-bold">{stats.lowStock}</p>
        </div>
      </div>

      <div className="bg-white p-4 md:p-5 rounded-xl shadow mt-6 md:mt-10">
        <h2 className="text-2xl font-bold mb-5">Monthly Sales</h2>
           
        <div className="overflow-x-auto">
  <div className="min-w-[500px]">  
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={salesData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />

            <YAxis />

            <Tooltip />

            <Bar dataKey="sales" />
          </BarChart>
        </ResponsiveContainer>
        </div> 
        </div> 
      </div>
    </div>
  );
}
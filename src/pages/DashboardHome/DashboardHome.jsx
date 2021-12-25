import React, { useState } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import Navbar from "../../components/Navbar";

const DashboardHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const data = [
    {
      name: "01 Apr",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "02 Apr",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "03 Apr",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "04 Apr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "05 Apr",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "06 Apr",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "07 Apr",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div>
      <div className="flex justify-between mobiles:block ">
        <h2 className="text-2xl font-light mobiles:mb-6 mobiles:mt-3">
          Welcome to Payslice , Peter Brown
        </h2>
        <div className="flex justify-between mobiles:block ">
          <div className="tab flex rounded bg-gray-100 mr-5 mobiles:my-3 mobiles:mr-0 mobiles:justify-between">
            <div
              className={`px-5 rounded py-3 cursor-pointer ${
                activeIndex === 0 && "__tab-active"
              }`}
              onClick={() => setActiveIndex(0)}
            >
              Day
            </div>
            <div
              className={`px-5 rounded py-3 cursor-pointer ${
                activeIndex === 1 && "__tab-active"
              }`}
              onClick={() => setActiveIndex(1)}
            >
              Week
            </div>
            <div
              className={`px-5 rounded py-3 cursor-pointer ${
                activeIndex === 2 && "__tab-active"
              }`}
              onClick={() => setActiveIndex(2)}
            >
              Month
            </div>
          </div>
          <div className="tab flex rounded bg-gray-100 px-5 py-2">
            <BiCalendarEvent size="20" className="my-auto" />
            <div className="px-3 my-auto">Jan, 2019 - Dec, 2019</div>
          </div>
        </div>
      </div>

      <div className="cards mt-10">
        <div className="flex mobiles:block">
          <div className="w-1/4 mobiles:w-full mobiles:my-4 mr-5 h-40 rounded-lg border border-gray-100 p-6">
            <p className="font-bold">Payroll Size</p>
            <p className="font-normal flex mobiles:flex mobiles:justify-between">
              December 2020{" "}
              <span
                className="flex ml-5 font-bold"
                style={{ color: "#0B9B36" }}
              >
                +3% <BsArrowUp className="my-auto" />
              </span>
            </p>
            <h4 className="text-lg font-bold mobiles:flex mobiles:justify-between">
              20,000{" "}
              <span className="ml-2 text-gray-400 text-sm font-light">
                Veiw more{" "}
              </span>
            </h4>
          </div>
          <div className="w-1/4 mobiles:w-full mobiles:my-4 mr-5 h-40 rounded-lg border border-gray-100 p-6">
            <p className="font-bold">Credit limit</p>
            <p className="font-light flex">December 2020</p>
            <h4 className="text-lg font-bold">NGN 20,000 </h4>
          </div>
          <div className="w-1/4 mobiles:w-full mobiles:my-4 mr-5 h-40 rounded-lg border border-gray-100 p-6">
            <p className="font-bold">Total accepted Employee</p>
            <p className="font-normal flex mobiles:flex mobiles:justify-between">
              December 2020{" "}
              <span
                className="flex ml-5 font-bold"
                style={{ color: "#0B9B36" }}
              >
                +3% <BsArrowUp className="my-auto" />
              </span>
            </p>
            <h4 className="text-lg font-bold mobiles:flex mobiles:justify-between">
              135{" "}
              <span className="ml-2 text-gray-400 text-sm font-light">
                Veiw more{" "}
              </span>
            </h4>
          </div>
          <div className="w-1/4 mobiles:w-full mobiles:my-4 mr-5 h-40 rounded-lg border border-gray-100 p-6">
            <p className="font-bold">Upcoming payments</p>
            <p className="font-normal flex mobiles:flex mobiles:justify-between">
              December 2020{" "}
              <span
                className="flex ml-5 font-bold"
                style={{ color: "#D0000C" }}
              >
                +3% <BsArrowDown className="my-auto font-bold" />
              </span>
            </p>
            <h4 className="text-lg font-bold mobiles:flex mobiles:justify-between">
              135{" "}
              <span className="ml-2 text-gray-400 text-sm font-light">
                Repay now
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div className=" my-16">
        <div className="w-full flex mobiles:block">
          <div className="graph-container p-6 mobiles:p-0 mr-8 w-2/3 mobiles:w-full mobiles:my-4 border border-gray-100 rounded-lg">
            <h3 className="text-2xl py-4 px-2">Active Withdrawal</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart
                width={500}
                height={500}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#1C64F2"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/3 mobiles:w-full rounded-lg border h-40 border-gray"></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

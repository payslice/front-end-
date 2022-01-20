import React, { useState, useEffect } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  getAllCompanyPolicy,
  getEmployeeWithdrawalRequests,
  getEmployeeWithdrawalWithParams,
  getTotalNoOfAcceptedEmployees,
  getTotalNoOfEmployees,
} from "../../utils/ApiRequests";
import { getUserDataFromStorage } from "../../utils/ApiUtils";
import { toCurrency } from "../../utils/helpers";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";
// import Navbar from "../../components/Navbar";

const DashboardHome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [policyResponse, setPolicyResponse] = useState();
  const [acceptedEmployees, setAcceptedEmployees] = useState();
  const [graphData, setGraphData] = useState();
  const [allWithdrawals, setAllWithdrawals] = useState();
  const [notificationLoading, setNotificationLoading] = useState(false);

  const userData = getUserDataFromStorage();

  const history = useHistory();

  useEffect(() => {
    console.log("userData", userData);
    setNotificationLoading(true);
    const fetchPolicy = async () => {
      try {
        const res = await getAllCompanyPolicy();
        res.data.payload.data.length > 0 &&
          setPolicyResponse(res.data.payload.data[0]);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchAcceptedEmployees = async () => {
      try {
        const res = await getTotalNoOfEmployees();
        setAcceptedEmployees(res.data.payload.data?.numberOfEmployees);
      } catch (error) {
        console.log("error", error);
      }
    };

    const getApprovedTransaction = async () => {
      try {
        const response = await getEmployeeWithdrawalWithParams("approved");
        const dataRes = response.data.payload.data
          .slice(0, 7)
          .map((data, index) => {
            return {
              name: new Date(data.created_at).toLocaleDateString(),
              uv: 40000,
              pv: parseInt(data.amount),
              amt: parseInt(data.amount),
            };
          });

        setGraphData(dataRes);
      } catch (error) {
        console.log("approved error", error);
      }
    };
    const getWithdrawals = async () => {
      try {
        const res = await getEmployeeWithdrawalRequests();
        setAllWithdrawals(res.data.payload.data.slice(0, 4));
        setNotificationLoading(false);
      } catch (error) {
        toast.error("Can't get employee withdrawals");
        setNotificationLoading(false);
      }
    };
    fetchPolicy();
    fetchAcceptedEmployees();
    getApprovedTransaction();
    getWithdrawals();
  }, []);
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
        <div className="flex justify-between">
          <div className="tab flex rounded bg-gray-100 mr-5 mobiles:mr-0">
            <div
              className={`px-5 rounded py-3 cursor-pointer mobiles:w-1/2 mobiles:px-3 mobiles:text-xs ${
                activeIndex === 0 && "__tab-active"
              }`}
              onClick={() => setActiveIndex(0)}
            >
              Day
            </div>
            <div
              className={`px-5 rounded py-3 cursor-pointer mobiles:px-3 mobiles:text-xs ${
                activeIndex === 1 && "__tab-active"
              }`}
              onClick={() => setActiveIndex(1)}
            >
              Week
            </div>
            <div
              className={`px-5 rounded py-3 cursor-pointer mobiles:px-3 mobiles:text-xs ${
                activeIndex === 2 && "__tab-active"
              }`}
              onClick={() => setActiveIndex(2)}
            >
              Month
            </div>
          </div>
          <div className="tab flex rounded bg-gray-100 px-5 py-2 mobiles:w-1/2 mobiles:text-xs mobiles:px-2">
            <BiCalendarEvent size="20" className="my-auto" />
            <div className="px-3 my-auto mobiles:px-2">
              Jan, 2019 - Dec, 2019
            </div>
          </div>
        </div>
      </div>

      <div className="cards mt-10">
        <div className="flex mobiles:block">
          <div className="w-1/4 mobiles:w-full mobiles:my-4 mr-5 h-40 rounded-lg border border-gray-100 p-6">
            <p className="font-bold">Payroll Size</p>
            <p className="font-normal flex mobiles:flex mobiles:justify-between">
              {`${new Date(policyResponse?.updated_at).toLocaleString(
                "default",
                {
                  month: "long",
                }
              )} ${new Date(policyResponse?.updated_at).getFullYear()} `}
              <span
                className="flex ml-5 font-bold"
                style={{ color: "#0B9B36" }}
              >
                +3% <BsArrowUp className="my-auto" />
              </span>
            </p>
            <h4 className="text-lg font-bold mobiles:flex mobiles:justify-between">
              {policyResponse?.payroll_size || "N/A"}
              <span className="ml-2 text-gray-400 text-sm font-light">
                Veiw more{" "}
              </span>
            </h4>
          </div>
          <div className="w-1/4 mobiles:w-full mobiles:my-4 mr-5 h-40 rounded-lg border border-gray-100 p-6">
            <p className="font-bold">Credit limit</p>
            <p className="font-light flex">{`${new Date(
              policyResponse?.updated_at
            ).toLocaleString("default", {
              month: "long",
            })} ${new Date(policyResponse?.updated_at).getFullYear()} `}</p>
            <h4 className="text-lg font-bold">0 </h4>
          </div>
          <div className="w-1/4 mobiles:w-full mobiles:my-4 mr-5 h-40 rounded-lg border border-gray-100 p-6">
            <p className="font-bold">Total accepted Employee</p>
            <p className="font-normal flex mobiles:flex mobiles:justify-between">
              {`${new Date(policyResponse?.updated_at).toLocaleString(
                "default",
                {
                  month: "long",
                }
              )} ${new Date(policyResponse?.updated_at).getFullYear()} `}
              <span
                className="flex ml-5 font-bold"
                style={{ color: "#0B9B36" }}
              >
                +3% <BsArrowUp className="my-auto" />
              </span>
            </p>
            <h4 className="text-lg font-bold mobiles:flex mobiles:justify-between">
              {acceptedEmployees || "N/A"}
              <span
                className="ml-2 text-gray-400 text-sm font-light cursor-pointer"
                onClick={() => history.push("/employee")}
              >
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
              <span
                className="ml-2 text-gray-400 text-sm font-light cursor-pointer"
                onClick={() => history.push("/payments")}
              >
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
            {graphData && (
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                  width={500}
                  height={500}
                  data={graphData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis dataKey="uv" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    fill="#1C64F2"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="w-1/3 mobiles:w-full rounded-lg border  border-gray">
            <div className="text-2xl border-b border-gray-300 py-4 px-4">
              Recent transactions
            </div>
            <div
              className="transaction-timeline p-4 overflow-scroll"
              style={{ height: "350px" }}
            >
              {notificationLoading && (
                <div
                  className="flex justify-center items-center"
                  style={{ height: "inherit" }}
                >
                  <Spin />
                </div>
              )}
              {allWithdrawals?.map((withdrawal) => {
                return (
                  <div className="transaction flex w-full justify-between">
                    <div className="node-wrapper">
                      <div className="node --red-node">
                        <img
                          src={
                            require("../../assets/svgs/withdraw-icon.svg")
                              .default
                          }
                          className=" "
                          alt=""
                        />
                      </div>
                      <div className="line"></div>
                    </div>
                    <div className="description px-3 pb-6">
                      <div className="text-xl">
                        {`${toCurrency(
                          parseInt(withdrawal.amount) +
                            parseInt(withdrawal.service_charge)
                        )}`}{" "}
                        has been withdrawn
                      </div>
                      <p className="text-gray-400 text-normal">
                        {new Date(withdrawal.created_at).toLocaleDateString()}{" "}
                        by{" "}
                        <span style={{ color: "#1c6af4" }}>
                          {withdrawal.employee.first_name}
                        </span>
                      </p>
                      <div className="border rounded-xl border-gray-200  flex ">
                        <div className="px-6 py-4 border-r ">
                          <div className="text-normal">Amount sent</div>
                          <div className="font-bold">
                            {toCurrency(withdrawal.amount)}
                          </div>
                        </div>

                        <div className="px-6 py-4">
                          <div className="text-normal">Service Charge</div>
                          <div className="font-bold">
                            {toCurrency(withdrawal.service_charge)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div className="transaction flex w-full justify-between">
                <div className="node-wrapper">
                  <div className="node --red-node">
                    <img
                      src={
                        require("../../assets/svgs/withdraw-icon.svg").default
                      }
                      className=" "
                      alt=""
                    />
                  </div>
                  <div className="line"></div>
                </div>
                <div className="description px-3 pb-6">
                  <div className="text-xl">₦30,000 has been withdrawn</div>
                  <p className="text-gray-400 text-normal">
                    wed,24 may by <span style={{ color: "#1c6af4" }}>Uche</span>
                  </p>
                  <div className="border rounded-xl border-gray-200  flex ">
                    <div className="px-6 py-4 border-r ">
                      <div className="text-normal">Amount</div>
                      <div className="font-bold">₦18,000</div>
                    </div>

                    <div className="px-6 py-4">
                      <div className="text-normal">Service Charge</div>
                      <div className="font-bold">₦1,000</div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="transaction flex w-full justify-between">
                <div className="node-wrapper ">
                  <div className="node --green-node">
                    <img
                      src={
                        require("../../assets/svgs/credited.icon.svg").default
                      }
                      className=" "
                      alt=""
                    />
                  </div>
                  <div className="line"></div>
                </div>
                <div className="description px-3">
                  <div className="text-xl">
                    ₦12,000 has been Repaid from your debit card
                  </div>
                  <p className="text-gray-400 text-normal">
                    wed,24 may by <span style={{ color: "#1c6af4" }}>Uche</span>
                  </p>
                  <div className="border rounded-xl border-gray-200 p-3">
                    <div className="text-normal">Balance</div>
                    <div className="font-bold">₦18,000</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

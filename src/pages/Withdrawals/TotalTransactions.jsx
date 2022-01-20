import React, { useState, useEffect } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { Table } from "antd";
import {
  getEmployeeWithdrawalRequests,
  getEmployeeWithdrawalWithParams,
} from "../../utils/ApiRequests";
import { toast } from "react-toastify";
import { toCurrency } from "../../utils/helpers";

const TotalTransactions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalTransactions, setTotalTransactions] = useState();

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const res = await getEmployeeWithdrawalRequests();

        const resData = res.data.payload.data?.map((data, i) => {
          return {
            key: i,
            name: `${data.employee.first_name} ${data.employee.last_name}`,
            phoneEmail: `${data.employee.email}`,
            totalWithdrawn: toCurrency(data.amount),
            amount: parseInt(data.amount),
            timeOfLastWithdrawal: new Date(data.created_at).toDateString(),
          };
        });
        setTotalTransactions(resData);
        setLoading(false);
      } catch (error) {
        toast.error("An error occured");
        setLoading(false);
      }
    };
    const getApprovedTransaction = async () => {
      try {
        const response = await getEmployeeWithdrawalWithParams("approved");
        console.log("response", response.data);
      } catch (error) {
        console.log("approved error", error);
      }
    };
    getAllTransaction();
    // getApprovedTransaction();
    // Promise.all([getAllTransaction(), getApprovedTransaction()]).then(
    //       (values) => {
    //         console.log("promise all", values);
    //       }
    //     );
  }, []);

  const totalSalaryWithdrawn = totalTransactions?.reduce(
    (acc, data) => acc + data.amount,
    0
  );
  const columns = [
    {
      title: "Full Name ",
      dataIndex: "name",
    },
    {
      title: "Phone & email",
      dataIndex: "phoneEmail",
    },
    {
      title: "Total withdrawn",
      dataIndex: "totalWithdrawn",
    },

    {
      title: "Time of last withdrawal",
      dataIndex: "timeOfLastWithdrawal",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div>
      <div className="flex justify-between mobiles:block">
        <h2 className="text-2xl mobiles:mb-8">Total Transactions</h2>
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
        <div className="flex mobiles:hidden">
          <div className="w-1/4 mr-5 flex justify-center items-center h-40 bg-gray-100 mobiles:hidden">
            Summary
          </div>
          <div className="w-1/4  mr-5 h-40 bg-gray-100 p-8 mobiles:px-4 mobiles:w-40">
            <p className="font-normal">Total salary withdrawn</p>
            <h4 className="text-xl font-semibold">
              {toCurrency(totalSalaryWithdrawn)}
            </h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
          </div>
          <div className="w-1/4  mr-5 h-40 bg-gray-100 p-8 mobiles:px-4 mobiles:w-40">
            <p className="font-normal">Number of withdrawal</p>
            <h4 className="text-xl font-semibold">
              {`0${totalTransactions?.length}`}
            </h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
          </div>
          <div className="w-1/4  mr-0 h-40 bg-gray-100 p-8 mobiles:px-4 mobiles:w-40">
            <p className="font-normal">Approved Withdrawals</p>
            <h4 className="text-xl font-semibold">NGN 420,000</h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
          </div>
        </div>

        <div className="mobiles:block hidden">
          <div className="outer w-full">
            <div className="mr-3 bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
              <div className="flex flex-col justify-center">
                <p className="font-normal">Total salary withdrawn</p>
                <h4 className="text-xl font-semibold">
                  {" "}
                  {toCurrency(totalSalaryWithdrawn)}{" "}
                </h4>
                <p className="mb-0">
                  For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
                </p>
              </div>
            </div>
            <div className=" mr-3 card bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
              <div className="flex flex-col justify-center">
                <p className="font-normal">Number of withdrawal</p>
                <h4 className="text-xl font-semibold">
                  {" "}
                  {`0${totalTransactions?.length}`}
                </h4>
                <p className="mb-0">
                  For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
                </p>
              </div>
            </div>
            <div className="mr-0 card bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
              <div className="flex flex-col justify-center">
                <p className="font-normal">Approved Withdrawals</p>
                <h4 className="text-xl font-semibold">NGN 420,000</h4>
                <p className="mb-0">
                  For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-16">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          loading={loading}
          columns={columns}
          dataSource={totalTransactions}
        />
      </div>
    </div>
  );
};

export default TotalTransactions;

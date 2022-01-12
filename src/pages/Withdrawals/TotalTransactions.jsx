import React, { useState, useEffect } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { Table } from "antd";
import {
  companyTransactionHistory,
  getTotalTransactions,
} from "../../utils/ApiRequests";
import { toast } from "react-toastify";

const TotalTransactions = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const res = await companyTransactionHistory();
        console.log("trnx rex", res);
      } catch (error) {
        toast.error("An error occured");
      }
    };
    getAllTransaction();
  }, []);
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
      title: "time of last withdrawal",
      dataIndex: "time",
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
  const data = [
    {
      key: "1",
      name: "John Brown",
      phoneEmail: +2348012299289,
      totalWithdrawn: "NGN 10,000",
      time: "11:20:00",
    },
    {
      key: "2",
      name: "John Brown",
      phoneEmail: +2348012299289,
      totalWithdrawn: "NGN 10,000",
      time: "11:20:00",
    },
  ];
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
            <h4 className="text-xl font-semibold">NGN 420,000</h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
          </div>
          <div className="w-1/4  mr-5 h-40 bg-gray-100 p-8 mobiles:px-4 mobiles:w-40">
            <p className="font-normal">Total salary withdrawn</p>
            <h4 className="text-xl font-semibold">NGN 420,000</h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
          </div>
          <div className="w-1/4  mr-0 h-40 bg-gray-100 p-8 mobiles:px-4 mobiles:w-40">
            <p className="font-normal">Total salary withdrawn</p>
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
                <h4 className="text-xl font-semibold">NGN 420,000</h4>
                <p className="mb-0">
                  For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
                </p>
              </div>
            </div>
            <div className=" mr-3 card bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
              <div className="flex flex-col justify-center">
                <p className="font-normal">Number of withdrawal</p>
                <h4 className="text-xl font-semibold">55</h4>
                <p className="mb-0">
                  For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
                </p>
              </div>
            </div>
            <div className="mr-0 card bg-white card rounded-md border border-gray-200 p-4 flex flex-col justify-center">
              <div className="flex flex-col justify-center">
                <p className="font-normal">Total salary withdrawn</p>
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
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default TotalTransactions;

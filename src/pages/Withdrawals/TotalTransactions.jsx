import React, { useState } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { Table } from "antd";

const TotalTransactions = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
      key: "1",
      name: "John Brown",
      phoneEmail: +2348012299289,
      totalWithdrawn: "NGN 10,000",
      time: "11:20:00",
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl">Total Transactions</h2>
        <div className="flex justify-between">
          <div className="tab flex rounded bg-gray-100 mr-5">
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
        <div className="flex">
          <div className="w-1/4 mr-5 flex justify-center items-center h-40 bg-gray-100">
            Summary
          </div>
          <div className="w-1/4  mr-5 h-40 bg-gray-100 p-8">
            <p className="font-normal">Total salary withdrawn</p>
            <h4 className="text-xl font-bold">NGN 420,000</h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
          </div>
          <div className="w-1/4  mr-5 h-40 bg-gray-100 p-8">
            <p className="font-normal">Total salary withdrawn</p>
            <h4 className="text-xl font-bold">NGN 420,000</h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
          </div>
          <div className="w-1/4  mr-5 h-40 bg-gray-100 p-8">
            <p className="font-normal">Total salary withdrawn</p>
            <h4 className="text-xl font-bold">NGN 420,000</h4>
            <p>
              For <span style={{ color: "#1C6AF4" }}>October</span>{" "}
            </p>
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

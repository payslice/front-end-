import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Table } from "antd";
import { CustomTag } from "../../components/CustomTag";
import { RiWalletFill } from "react-icons/ri";

const PaymentSummary = () => {
  const columns = [
    {
      title: "Payment Id",
      dataIndex: "paymemtID",
    },
    {
      title: "Total Payable ",
      dataIndex: "totalPayable",
    },
    {
      title: "Total Pay",
      dataIndex: "totalPay",
    },
    {
      title: "Month ",
      dataIndex: "month",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span>
          <CustomTag
            text={status}
            isDanger={status === "Unpaid"}
            isSuccess={status === "Paid"}
          />
        </span>
      ),
    },
    {
      title: "Pay",
      dataIndex: "pay",
      render: (pay) => (
        <div
          className="flex rounded px-3 py-1 cursor-pointer"
          style={{
            color: "white",
            background: "#1C6AF4",
            width: "100px",
          }}
        >
          <RiWalletFill className="my-auto mr-1" /> Pay Now
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => <BsThreeDotsVertical />,
    },
  ];
  const data = [
    {
      key: "1",
      paymemtID: "SOP 2039999",
      totalPayable: "NGN  19,000",
      totalPay: "NGN  19,000",
      month: "July",
      status: "Unpaid",
    },
    {
      key: "1",
      paymemtID: "SOP 2039999",
      totalPayable: "NGN  19,000",
      totalPay: "NGN  19,000",
      month: "July",
      status: "Paid",
    },
    {
      key: "1",
      paymemtID: "SOP 2039999",
      totalPayable: "NGN  19,000",
      totalPay: "NGN  19,000",
      month: "July",
      status: "Unpaid",
    },
  ];
  return (
    <div className="__wrapper">
      <div className="header">
        <h2 className="text-2xl">Payments summary </h2>
      </div>

      <div className="box__wrapper flex w-full mobiles:block">
        <div className="border border-gray-300 p-5 mr-5 my-3 rounded w-1/4 mobiles:w-full">
          <h2 className="text-2xl">Total withdrawals </h2>
          <p className="text-normal">December 2020</p>
          <h2 className="text-2xl font-bold">NGN140,000</h2>
        </div>
        <div className="border border-gray-300 p-5 mr-5 my-3 rounded w-1/4 mobiles:w-full">
          <h2 className="text-2xl">Total withdrawals </h2>
          <p className="text-normal">December 2020</p>
          <h2 className="text-2xl font-bold">NGN140,000</h2>
        </div>
        <div className="border border-gray-300 p-5 mr-5 my-3 rounded w-1/4 mobiles:w-full">
          <h2 className="text-2xl">Total withdrawals </h2>
          <p className="text-normal">December 2020</p>
          <h2 className="text-2xl font-bold">NGN140,000</h2>
        </div>
        <div className="border border-gray-300 p-5 mr-5 my-3 rounded w-1/4 mobiles:w-full">
          <h2 className="text-2xl">Total withdrawals </h2>
          <p className="text-normal">December 2020</p>
          <h2 className="text-2xl font-bold">NGN140,000</h2>
        </div>
      </div>

      <div className="text-2xl mt-16 mb-3">Withdrawal Payments</div>
      <div className="employee-table my-8">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default PaymentSummary;

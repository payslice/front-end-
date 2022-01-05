import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Table } from "antd";
import { companyPaymentHistories } from "../../utils/ApiRequests";
import { toast } from "react-toastify";

const PaymentHistory = () => {
  useEffect(() => {
    const getPaymentHistory = async () => {
      try {
        const res = await companyPaymentHistories();
        console.log("res", res.data);
      } catch (error) {
        toast.error("an error occured");
      }
    };
    getPaymentHistory();
  }, []);

  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentID",
    },
    {
      title: "Amount ",
      dataIndex: "amount",
      render: (amount) => (
        <div>
          <span className="font-bold">NGN</span>
          {amount.toLocaleString("en-NG")}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => <BsThreeDotsVertical />,
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
      paymentID: "SOP4854885859",
      name: "John Brown",
      amount: 19000,
      date: "21st July 2021",
      paymentType: "Transfer",
      status: "Pending",
    },
    {
      key: "2",
      name: "John Brown",
      paymentID: "SOP4854885859",
      amount: 19000,
      date: "21st July 2021",
      paymentType: "Transfer",
      status: "Active",
    },
    {
      key: "3",
      paymentID: "SOP4854885859",
      name: "John Brown",
      amount: 19000,
      date: "21st July 2021",
      paymentType: "Transfer",
      status: "Pending",
    },
  ];
  return (
    <div className="__admin-listing">
      <div className="w-full ">
        <h3 className="text-2xl">Payment History</h3>
        <p className="text-normal">List of all payments made to payslice </p>
      </div>
      <div className="my-16">
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

export default PaymentHistory;

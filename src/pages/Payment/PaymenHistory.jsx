import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Table } from "antd";
import { companyPaymentHistories } from "../../utils/ApiRequests";
import { toast } from "react-toastify";
import { toCurrency, truncateString } from "../../utils/helpers";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState();
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const getPaymentHistory = async () => {
      try {
        const res = await companyPaymentHistories();
        const resData = res.data.payload.data;
        console.log("resetData", resData);
        const resetData = res.data.payload.data?.map((data, i) => {
          return {
            key: i,
            amount: toCurrency(data.amount),
            paymentID: truncateString(data.payment_id, 8),
            date: new Date(data.created_at).toDateString(),
            paymentType: data.mode_of_payment,
          };
        });

        setPaymentData(resetData);
        setFetchingData(false);
      } catch (error) {
        toast.error("an error occured");
        console.log("error", error.response);
        setFetchingData(false);
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
      // render: (amount) => (
      //   <div>
      //     <span className="font-bold">NGN</span>
      //     {amount.toLocaleString("en-NG")}
      //   </div>
      // ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Payment Type",
      dataIndex: "paymentType",
      render: (paymentType) => (
        <div style={{ textTransform: "capitalize" }}>{paymentType}</div>
      ),
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
          loading={fetchingData}
          columns={columns}
          dataSource={paymentData}
        />
      </div>
    </div>
  );
};

export default PaymentHistory;

import React, { useState, useEffect } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { Table } from "antd";
import { CustomTag } from "../../../components/CustomTag";
import OptionsMenu from "../../../components/TableOptionMenu";
import {
  getTotalTransactions,
  getWithdrawalRequest,
} from "../../../utils/ApiRequests";
import { toast } from "react-toastify";
import { truncateString } from "../../../utils/helpers";

const Withdrawals = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transactionData, setTransactionData] = useState();

  const handleClick = (param) => {
    console.log("param", param);
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await getWithdrawalRequest();
        const resetData = res.data.payload.data?.map((withdrawal, i) => {
          return {
            key: i,
            transactionID: truncateString(withdrawal.request_code, 9),
            amount: withdrawal.amount,
            charges: withdrawal.service_charge,
            date: new Date(withdrawal.updated_at).toDateString(),
            status: withdrawal.status,
          };
        });
        setTransactionData(resetData);
      } catch (error) {
        toast.error("An error occured");
      }
    };
    getTransactions();
  }, []);

  const tableOptions = [
    {
      name: "Download Payslip",
      onClick: handleClick,
    },
  ];

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionID",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Charges",
      dataIndex: "charges",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span>
          <CustomTag
            text={status}
            isDanger={status === "declined"}
            isSuccess={status === "approved"}
            isWarning={status === "pending"}
          />
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return <OptionsMenu options={tableOptions} param={record.key} />;
      },
    },
  ];

  const data = [
    {
      key: "1",
      transactionID: "SOP4854885859",
      amount: "NGN 20,000",
      charges: "NGN 1000",
      date: new Date().toDateString(),
      status: "Pending",
    },
    {
      key: "2",
      transactionID: "SOP4854885859",
      amount: "NGN 20,000",
      charges: "NGN 500",
      date: new Date().toDateString(),
      status: "Successful",
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl">Transactions History </h2>
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

      <div className=" my-16">
        <Table columns={columns} dataSource={transactionData} />
      </div>
    </div>
  );
};

export default Withdrawals;

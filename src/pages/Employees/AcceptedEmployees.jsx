import React from "react";
import { Table } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CustomTag } from "../../components/CustomTag";

export const AcceptedEmployees = () => {
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
      title: "Employee ID",
      dataIndex: "bankDetails",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span>
          <CustomTag
            text={status}
            isDanger={status === "Pending"}
            isSuccess={status === "On board"}
          />
        </span>
      ),
    },
    {
      title: "Date Joined",
      dataIndex: "balance",
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
      name: "John Brown",
      phoneEmail: +2348012299289,
      bankDetails: "GTBank",
      status: "Pending",
      balance: "50,000",
    },
    {
      key: "2",
      name: "John Brown",
      phoneEmail: +2348012299289,
      bankDetails: "GTBank",
      salary: "80,000",
      balance: "50,000",
    },
    {
      key: "3",
      name: "John Brown",
      phoneEmail: +2348012299289,
      bankDetails: "GTBank",
      status: "On board",
      balance: "50,000",
    },
    {
      key: "4",
      name: "John Brown",
      phoneEmail: +2348012299289,
      bankDetails: "GTBank",
      salary: "80,000",
      balance: "50,000",
    },
  ];
  return (
    <div>
      <div className="table-header flex w-full justify-between">
        <div className="text-xl my-auto">Accepted Employees</div>
      </div>

      <div className="employee-table my-16">
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
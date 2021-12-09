import React from "react";
import { Button } from "../../components/Button/Button";
import { GreyButton } from "../../components/Button/GreyButton";
import { Table } from "antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useHistory } from "react-router-dom";

export const Employees = () => {
  const history = useHistory();
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
      title: "Bank Details",
      dataIndex: "bankDetails",
    },
    {
      title: "Salary ",
      dataIndex: "salary",
    },
    {
      title: "Salary balance",
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
      salary: "80,000",
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
      salary: "80,000",
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
        <div className="text-xl my-auto">Employees payroll Report</div>
        <div className="my-auto">
          <Button buttonText="pay full  payroll" />
        </div>
      </div>
      <div className="table-actions">
        <div>
          <GreyButton
            buttonText="create single staff +"
            onClick={() => history.push("/employee/create")}
          />
        </div>
      </div>

      <div className="employee-table my-16">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          className="cursor-pointer"
          onRow={(record, i) => {
            return {
              onClick: (event) => {
                history.push("/employee/1");
              },
            };
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

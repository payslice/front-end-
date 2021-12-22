import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { GreyButton } from "../../components/Button/GreyButton";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import OptionsMenu from "../../components/TableOptionMenu";
import { getAllEmployees } from "../../utils/ApiRequests";

export const Employees = () => {
  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await getAllEmployees();
        console.log("res", res.data);
      } catch (error) {
        console.log("error", error.response);
      }
    };
    fetchAllEmployees();
  }, []);

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
      render: (text, record) => {
        return <OptionsMenu options={tableOptions} param={record.key} />;
      },
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

  const handleClick = (param) => {
    console.log("param", param);
  };
  const handleViewDetails = (id) => {
    history.push(`/employee/${id}`);
  };

  const tableOptions = [
    {
      name: "Activate",
      onClick: handleClick,
    },
    {
      name: "Deactivate",
      onClick: handleClick,
    },
    {
      name: "View Details",
      onClick: handleViewDetails,
    },
  ];
  return (
    <div>
      <div className="table-header flex w-full justify-between">
        <div className="text-xl my-auto">Employees payroll Report</div>
        <div className="my-auto">
          <Button buttonText="Pay Full Payroll" />
        </div>
      </div>
      <div className="table-actions flex">
        <div className="mr-5">
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
          // onRow={(record, i) => {
          //   return {
          //     onClick: (event) => {
          //       console.log("record", record);
          //       history.push("/employee/1");
          //     },
          //   };
          // }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

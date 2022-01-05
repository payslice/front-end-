import React, { useEffect } from "react";
import { Table } from "antd";
import { CustomTag } from "../../components/CustomTag";

import OptionsMenu from "../../components/TableOptionMenu";
import { EmployeeTab } from "../../components/EmployeeTab";
import { AcceptedEmployeeCard } from "../../components/EmployeeCard";
import { getTotalNoAcceptedEmployees } from "../../utils/ApiRequests";

export const AcceptedEmployees = () => {
  useEffect(() => {
    const fetAcceptedEmployees = async () => {
      try {
        const res = await getTotalNoAcceptedEmployees();
        console.log("res", res.data);
      } catch (error) {
        console.log("accepted err", error.response);
      }
    };
    fetAcceptedEmployees();
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

  const handleClick = (param) => {
    console.log("param", param);
  };

  const tableOptions = [
    {
      name: "Activate",
      onClick: handleClick,
    },
    {
      name: "Stop Earning",
      onClick: handleClick,
    },
  ];

  return (
    <div>
      <div className="table-header flex w-full justify-between mobiles:block">
        <EmployeeTab />
        <div className="text-xl my-auto mobiles:mt-10">Accepted Employees</div>
      </div>

      <div className="employee-table my-16 mobiles:hidden">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
      <div className="mobiles:block hidden">
        <AcceptedEmployeeCard />

        <AcceptedEmployeeCard />
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { GreyButton } from "../../components/Button/GreyButton";
import { Table } from "antd";
import { useHistory } from "react-router-dom";
import OptionsMenu from "../../components/TableOptionMenu";
import { getAllEmployees } from "../../utils/ApiRequests";
import { BsFilter } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { EmployeeTab } from "../../components/EmployeeTab";
import { EmployeeCard } from "../../components/EmployeeCard";
import { toast } from "react-toastify";

export const Employees = () => {
  const [employees, setEmployees] = useState();
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await getAllEmployees();
        const restructuredData = res.data.payload.data?.map((data, i) => {
          return {
            key: i,
            id: data.id,
            name: `${data.first_name} ${data.last_name}`,
            email: data.email,
            phone: data.phone_number,
            bankDetails: data.bankDetails.bank_name,
            salary: parseInt(data.workDetails.staff_salary).toLocaleString(
              "en-NG"
            ),
            balance: "30,000",
          };
        });
        setEmployees(restructuredData);
        setFetchingData(false);
      } catch (error) {
        toast.error("An error occured.");
        setFetchingData(false);
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
      render: (text, record) => {
        return (
          <div>
            <div className="text-normal">{record.phone}</div>
            <div className="text-normal">{record.email}</div>
          </div>
        );
      },
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
        return <OptionsMenu options={tableOptions} param={record.id} />;
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

  const gotoDetailsPage = () => {
    history.push("/employee/1");
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
      <div className="table-header flex w-full justify-between mobiles:block">
        <EmployeeTab />
        <div className="text-xl my-auto mobiles:mt-3 mobiles:hidden">
          Employees payroll Report
        </div>
        <div className="my-auto mobiles:flex mobiles:justify-end mobiles:mb-4">
          <Button
            buttonText="Pay Full Payroll"
            className="mobiles:px-3 mobiles:py-2"
          />
        </div>
        <div className="mobiles:flex hidden justify-between mb-3 mt-5">
          <div className="text-normal my-auto ">Employees payroll Report</div>
          <div className="filter-search-wrapper flex">
            <BsFilter
              style={{ background: "#F9F9F9" }}
              className="p-1 mr-2 "
              size="32px"
            />
            <AiOutlineSearch
              style={{ background: "#F9F9F9" }}
              className="p-1 ml-2"
              size="32px"
            />
          </div>
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

      <div className="employee-table my-16 mobiles:hidden">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          loading={fetchingData}
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
          dataSource={employees}
        />
      </div>
      <div className="mobiles:block hidden">
        <EmployeeCard gotoDetailsPage={gotoDetailsPage} />
        <EmployeeCard gotoDetailsPage={gotoDetailsPage} />
      </div>
    </div>
  );
};

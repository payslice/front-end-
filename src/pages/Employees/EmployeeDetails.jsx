import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../../components/Button/Button";
import { CustomTag } from "../../components/CustomTag";
import { EmployeeInfo } from "../../components/EmployeeInfo";
import { Table } from "antd";
import { EmployeeTab } from "../../components/EmployeeTab";
import { BackButton } from "../../components/BackButton";

const EmployeeDetails = () => {
  const columns = [
    {
      title: "S/N",
      dataIndex: "key",
    },
    {
      title: "Dates",
      dataIndex: "date",
    },
    {
      title: "Time in",
      dataIndex: "timeIn",
    },
    {
      title: "Checkin status",
      dataIndex: "checkInStatus",
      render: (status) => (
        <span>
          <CustomTag
            text={status}
            isDanger={status === "Pending"}
            isSuccess={status === "Committed"}
          />
        </span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Time out",
      dataIndex: "timeOut",
    },
    {
      title: "User",
      dataIndex: "user",
      render: (user) => (
        <span>
          <CustomTag
            text={user}
            isDanger={user === "Pending"}
            isSuccess={user === "Committed"}
          />
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      date: new Date().toLocaleDateString(),
      timeIn: "124:44:04",
      checkInStatus: "Committed",
      location: "Lagos",
      timeOut: "124:44:04",
      user: "Committed",
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
      <EmployeeTab />
      <div className="mt-8">
        <BackButton />
      </div>
      <div className="text-2xl">Employee Details </div>
      <div className="bg-gray-100 flex flex-wrap mobiles:w-full justify-between px-3 py-3 mt-8 w-max">
        <div className="mobiles:w-1/2 px-3 mobiles:px-1">
          Date Joined : 2/10/2010
        </div>
        <div className="mobiles:w-1/2 px-3 mobiles:px-1">
          Location: DxB- Dubia
        </div>
        <div className="mobiles:w-full px-3 mobiles:px-1">
          Employee ID: ARMXPPXCOD
        </div>
      </div>
      <div className="mt-12">
        <div className="border border-gray-200 rounded-md">
          <div className="flex py-8 px-5 justify-between border-b-2">
            <div className="col-1 text-xl">Employee Details</div>
            <div className="actn-col my-auto">
              <BsThreeDotsVertical className="my-auto" />
            </div>
          </div>
          <div className="content w-full flex mobiles:block">
            <div className="w-1/3 p-5 mobiles:w-full">
              <EmployeeInfo title="First Name" value="Peter" />
              <EmployeeInfo title="Last Name" value="Brown" />
              <EmployeeInfo title="Gender" value="Male" />
              <EmployeeInfo
                title="Email Address"
                value="Peterbrown@payslice.com"
              />
              <EmployeeInfo title="Phone Number" value="08000000332" />
            </div>
            <div className="w-1/3 p-5 mobiles:w-full">
              <EmployeeInfo title="Bank Name" value="Stanbic IBTC" />
              <EmployeeInfo title="Account Name" value="Peter Brown" />
              <EmployeeInfo title="Account Number" value=" 002394949" />
            </div>
            <div className="w-1/3 p-5 mobiles:w-full">
              <EmployeeInfo
                title="Salary Breakdown:"
                value="Basic salary - NGN 180,000"
              />
              <EmployeeInfo title="Employement Type:" value="Full-time" />
              <EmployeeInfo title="Employers ID:" value="Male" />
            </div>
          </div>
          <div className="my-5 mx-5">
            <Button
              buttonText="Time Attendance "
              className="mobiles:py-2 mobiles:px-3"
            />
          </div>
          <div className="employee-table mb-16 mt-4 mx-5">
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

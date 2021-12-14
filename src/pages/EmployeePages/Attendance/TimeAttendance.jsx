import React from "react";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";
import { Table } from "antd";

const TimeAttendance = () => {
  const columns = [
    {
      title: "S/N",
      dataIndex: "key",
    },
    {
      title: "Date",
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
            isTeal={status === "None"}
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
      title: "Time Out",
      dataIndex: "timeOut",
    },

    {
      title: "User",
      dataIndex: "user",
      render: (status) => (
        <span>
          <CustomTag
            text={status}
            isTeal={status === "None"}
            isDanger={status === "Pending"}
            isSuccess={status === "Committed"}
          />
        </span>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      timeIn: new Date().toLocaleTimeString(),
      timeOut: new Date().toLocaleTimeString(),
      date: new Date().toDateString(),
      checkInStatus: "Committed",
      user: "Committed",
      location: "Lagos",
    },
    {
      key: "2",
      timeIn: new Date().toLocaleTimeString(),
      timeOut: new Date().toLocaleTimeString(),
      date: new Date().toDateString(),
      checkInStatus: "None",
      user: "None",
      location: "Lagos",
    },
  ];

  return (
    <div>
      <div className="page-header capitalize">time attendence history</div>
      <div className="my-10">
        <Button buttonText="Time Attendance " />
      </div>
      <div className=" my-16">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default TimeAttendance;

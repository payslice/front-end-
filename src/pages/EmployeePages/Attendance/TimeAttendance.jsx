import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";
import { Table } from "antd";
import { getClockIn, getClockOut } from "../../../utils/ApiRequests";
import { getUserDataFromStorage } from "../../../utils/ApiUtils";
import { toast } from "react-toastify";

const TimeAttendance = () => {
  const [clockInData, setClockInData] = useState();

  const userData = getUserDataFromStorage();

  console.log("user data", userData);

  useEffect(() => {
    const getClockInData = async () => {
      try {
        const res = await getClockIn(userData.id);
        setClockInData(res.data.payload.data);
      } catch (error) {
        toast.error("Can't fetch data. An error occured");
      }
    };

    const getClockOutData = async () => {
      try {
        const res = await getClockOut();
        console.log(res.data.payload.data);
      } catch (error) {}
    };
    getClockInData();
    getClockOutData();
  }, []);

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

      <div className=" my-16">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default TimeAttendance;

import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../../components/Button/Button";
import { CustomTag } from "../../components/CustomTag";
import { EmployeeInfo } from "../../components/EmployeeInfo";
import { Spin, Table } from "antd";
import { EmployeeTab } from "../../components/EmployeeTab";
import { BackButton } from "../../components/BackButton";
import {
  getClockInTime,
  getClockOut,
  getEmployeeClockOut,
  getOneEmployee,
} from "../../utils/ApiRequests";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const getLocation = async (lat, long) => {
  var url =
    "https://www.mapquestapi.com/geocoding/v1/reverse?key=API-Key&location=" +
    lat +
    "%2C" +
    long +
    "&outFormat=json&thumbMaps=false";
  try {
    const res = await axios.get(url);
    // console.log("res", res);
  } catch (error) {}
};

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState();
  const [fetchingEmpData, setFetchingEmpData] = useState();
  const [clockInData, setClockInData] = useState();
  const [clockOutData, setClockOutData] = useState();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setFetchingEmpData(true);
    const getEmployeeInfo = async () => {
      try {
        const res = await getOneEmployee(id);

        setEmployeeData(res.data.payload.data);
        setFetchingEmpData(false);
      } catch (error) {
        toast.error("An error occured");
        setFetchingEmpData(false);
      }
    };

    getEmployeeInfo();
  }, [id]);

  useEffect(() => {
    const getCheckInTime = async (userId) => {
      try {
        const res = await getClockInTime(userId);
        const resetData = res.data.payload.data?.map((resData, index) => {
          return {
            key: index,
            date: new Date(resData.clock_in_time).toLocaleDateString(),
            timeIn: new Date(resData.clock_in_time).toLocaleTimeString(),
            location: `Lat: ${resData.location.lat} Long: ${resData.location.long}`,
            checkInStatus: "-----",
          };
        });
        setClockInData(resetData);
      } catch (error) {
        toast.error("an error occured");
      }
    };

    const getCheckOutTime = async (userId) => {
      try {
        const res = await getEmployeeClockOut(userId);
        const resetData = res.data.payload.data?.map((resData, index) => {
          return {
            key: index,
            date: new Date(resData.clock_out_time).toLocaleDateString(),
            timeOut: new Date(resData.clock_out_time).toLocaleTimeString(),
            location: `Lat: ${resData.location.lat} Long: ${resData.location.long}`,
            checkInStatus: "-----",
          };
        });
        setClockOutData(resetData);
      } catch (error) {
        toast.error("an error occured");
      }
    };
    if (id) {
      getCheckInTime(id);
      getCheckOutTime(id);
    }
  }, [id]);

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
  ];

  const columns2 = [
    {
      title: "S/N",
      dataIndex: "key",
    },
    {
      title: "Dates",
      dataIndex: "date",
    },
    {
      title: "Time out",
      dataIndex: "timeOut",
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
          Date Joined :{" "}
          {new Date(
            employeeData?.workDetails.created_at
          ).toLocaleDateString() || "..."}
        </div>
        <div className="mobiles:w-1/2 px-3 mobiles:px-1">
          Location: {employeeData?.workDetails?.location || "..."}
        </div>
        <div className="mobiles:w-full px-3 mobiles:px-1">
          Employee ID: {employeeData?.employee_id || "..."}
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

          {fetchingEmpData ? (
            <div
              className="flex justify-center items-center p-10"
              style={{ height: "inherit" }}
            >
              <Spin />
            </div>
          ) : (
            <div className="content w-full flex mobiles:block">
              <div className="w-1/3 p-5 mobiles:w-full">
                <EmployeeInfo
                  title="First Name"
                  value={employeeData?.first_name}
                />
                <EmployeeInfo
                  title="Last Name"
                  value={employeeData?.last_name}
                />
                <EmployeeInfo title="Gender" value={employeeData?.gender} />
                <EmployeeInfo
                  title="Email Address"
                  value={employeeData?.email}
                />
                <EmployeeInfo
                  title="Phone Number"
                  value={employeeData?.phone_number}
                />
              </div>
              <div className="w-1/3 p-5 mobiles:w-full">
                <EmployeeInfo
                  title="Bank Name"
                  value={employeeData?.bankDetails.bank_name}
                />
                <EmployeeInfo
                  title="Account Name"
                  value={employeeData?.bankDetails.account_name}
                />
                <EmployeeInfo
                  title="Account Number"
                  value={employeeData?.bankDetails.account_number}
                />
              </div>
              <div className="w-1/3 p-5 mobiles:w-full">
                <EmployeeInfo
                  title="Salary Breakdown:"
                  value={`Basic salary - NGN ${parseInt(
                    employeeData?.workDetails.staff_salary
                  ).toLocaleString()}`}
                />
                <EmployeeInfo
                  title="Employement Type:"
                  value={employeeData?.workDetails.employment_type}
                />
                <EmployeeInfo title="Employers ID:" value="----" />
              </div>
            </div>
          )}
          <div className="my-5 flex">
            <div
              className={`px-8 py-3 ${
                activeTab === 0 ? " bg-blue-600 text-white" : "bg-gray-100"
              } cursor-pointer mx-5 rounded`}
              onClick={() => setActiveTab(0)}
            >
              Time-in
            </div>
            <div
              className={`px-8 py-3 ${
                activeTab === 1 ? "bg-blue-600 text-white" : " bg-gray-100"
              } cursor-pointer rounded`}
              onClick={() => setActiveTab(1)}
            >
              Time-out
            </div>
          </div>
          <div className="employee-table mb-16 mt-4 mx-5">
            <Table
              columns={activeTab === 0 ? columns : columns2}
              dataSource={activeTab === 0 ? clockInData : clockOutData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;

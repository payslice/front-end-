import React, { useState, useEffect } from "react";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";
import {
  clockIn,
  getAvailableWithdrawFunds,
  getAmountWithdrawn,
  clockOut,
  getWithdrawalRequest,
} from "../../../utils/ApiRequests";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { toCurrency, truncateString } from "../../../utils/helpers";
import { Spin } from "antd";
import { DotLoader } from "../../../components/Loaders/DotLoader";
import {
  getUserDataFromStorage,
  removeClockInFromStorage,
  setClockInTimeToStorage,
} from "../../../utils/ApiUtils";
import { constant } from "../../../utils/ApiConstants";

const UserDashboard = () => {
  const [availableFunds, setAvailableFunds] = useState();
  const [latLng, setLatLng] = useState();
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [checkOutSuccess, setCheckOutSuccess] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [totalWithdrawn, setTotalWithdrawn] = useState();
  const [transactionData, setTransactionData] = useState();
  const [fetchingData, setFetchingData] = useState(false);
  const [clockedIn, setClockedIn] = useState(false);
  const [fetchingWithdrawnAmount, setFetchingWithdrawnAmount] = useState(false);
  const history = useHistory();

  const userData = getUserDataFromStorage();

  useEffect(() => {
    setFetchingData(true);
    setFetchingWithdrawnAmount(true);

    if (localStorage.getItem(constant.clockInKeyName)) {
      setClockedIn(true);
    }
    const fetchWithdrawalAmount = async () => {
      try {
        const res = await getAvailableWithdrawFunds();
        setAvailableFunds(res.data.payload.data);
      } catch (error) {
        toast.error("An error occured");
      }
    };
    const getTotalWithdrawn = async () => {
      try {
        const res = await getAmountWithdrawn();
        setTotalWithdrawn(res.data.payload.data);
        setFetchingWithdrawnAmount(false);
      } catch (error) {
        toast.error("An error occured");
        setFetchingWithdrawnAmount(false);
      }
    };

    const getTransactions = async () => {
      try {
        const res = await getWithdrawalRequest();
        const resetData = res.data.payload.data?.map((withdrawal, i) => {
          return {
            key: i,
            transactionID: truncateString(withdrawal.request_code, 9),
            amount: toCurrency(withdrawal.amount),
            charges: withdrawal.service_charge,
            date: new Date(withdrawal.updated_at).toDateString(),
            status: withdrawal.status,
          };
        });
        setTransactionData(resetData);
        setFetchingData(false);
      } catch (error) {
        toast.error("An error occured");
        setFetchingData(false);
      }
    };
    getTotalWithdrawn();
    fetchWithdrawalAmount();
    getTransactions();
  }, []);

  function handleError(error) {
    let errorStr;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorStr = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorStr = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorStr = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errorStr = "An unknown error occurred.";
        break;
      default:
        errorStr = "An unknown error occurred.";
    }
    console.error("Error occurred: " + errorStr);
  }

  function showPosition(position) {
    setLatLng({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  }
  if (window.navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, handleError);
  }
  const submitClockIn = async () => {
    setCheckLoading(true);
    setClockInTimeToStorage();
    try {
      await clockIn({ location: latLng });
      setCheckInSuccess(true);
      setCheckLoading(false);
    } catch (error) {
      toast.error(error.response.data.payload.data);
      setCheckLoading(false);
    }
  };

  const submitClockOut = async () => {
    setCheckLoading(true);
    try {
      const res = await clockOut({ location: latLng });
      setCheckOutSuccess(true);

      setCheckLoading(false);
      removeClockInFromStorage();
    } catch (error) {
      toast.error(error.response.data.payload.data);
      setCheckLoading(false);
    }
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className="flex justify-between mb-20">
        <div className="text-gray-400 capitalize">
          Welcome to Payslice , {`${userData.first_name} ${userData.last_name}`}
        </div>

        {clockedIn || checkInSuccess ? (
          <Button
            buttonText="Employee CheckOut"
            loading={checkLoading}
            onClick={submitClockOut}
          />
        ) : (
          <Button
            buttonText="Employee CheckIn"
            loading={checkLoading}
            onClick={submitClockIn}
          />
        )}
      </div>

      <div className="flex w-full justify-between">
        <div className="bg-blue-600 flex px-12 mr-5 py-6 justify-between rounded-xl text-white w-1/2">
          <div className="my-auto">
            <div className="text-normal">Total Earned</div>
            <h3 className="text-xl text-white mb-0">
              NGN{" "}
              {parseInt(
                availableFunds?.amount_avaliable_to_withdraw
              ).toLocaleString()}{" "}
            </h3>
          </div>
          <div className="border flex justify-center ml-10 items-center border-white rounded-full h-16 w-16">
            {" "}
            <p
              className="mb-0 cursor-pointer"
              onClick={() => history.push("/user/withdrawals/withdraw")}
            >
              Get <br />
              Paid
            </p>
          </div>
        </div>
        <div
          className="flex px-12 py-6 ml-5 justify-between rounded-xl  w-1/2"
          style={{ background: "#FBE5DC" }}
        >
          <div className="my-auto">
            <div className="text-normal">Total withdrawn </div>
            <h3 className="text-xl  mb-0">
              {fetchingWithdrawnAmount ? (
                <>
                  {" "}
                  <DotLoader />{" "}
                </>
              ) : (
                <> NGN {parseInt(totalWithdrawn).toLocaleString()} </>
              )}
            </h3>
          </div>

          <button
            style={{ background: "#CA7652" }}
            className="h-max py-2 my-auto px-4 rounded text-white"
            onClick={() => history.push("/user/withdrawals")}
          >
            History
          </button>
        </div>
      </div>
      <div className="mt-10 border border-gray-200 rounded ">
        <div className="flex justify-between border-b pt-4 pb-2 px-8">
          <h2 className="text-xl">Recent Transaction</h2>
          <div
            className="text-blue-400"
            onClick={() => history.push("/user/withdrawals")}
          >
            Show more
          </div>
        </div>
        {fetchingData && (
          <div className="p-10 flex justify-center items-center ">
            <Spin />
          </div>
        )}
        {!fetchingData && transactionData?.length === 0 && (
          <div className="p-10 flex justify-center items-center ">
            <p>No available transaction</p>
          </div>
        )}
        {transactionData?.slice(0, 4).map((data, index) => {
          return (
            <div
              key={index}
              className="flex justify-between border-b pt-4 pb-2 px-8"
            >
              <div>
                <p className="text-normal">Direct Transfer</p>
                <div>Transation ID {data.transactionID}</div>
              </div>
              <div className="font-bold text-normal">{data.amount}</div>
              <div>
                <p>Service charge</p>
                <p>{toCurrency(data.charges)}</p>
              </div>
              <div className="w-max my-auto">
                <CustomTag
                  text={data.status}
                  isDanger={data.status === "declined"}
                  isSuccess={data.status === "approved"}
                  isWarning={data.status === "pending"}
                />
              </div>

              <div>
                <p>Time stamp</p>
                <p> {data.date} </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;

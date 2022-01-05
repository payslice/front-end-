import React, { useState, useEffect } from "react";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";
import { clockIn, getAvailableWithdrawFunds } from "../../../utils/ApiRequests";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const [availableFunds, setAvailableFunds] = useState();
  const [latLng, setLatLng] = useState();
  const [checkInSuccess, setCheckInSuccess] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchWithdrawalAmount = async () => {
      try {
        const res = await getAvailableWithdrawFunds();
        setAvailableFunds(res.data.payload.data);
      } catch (error) {
        console.log("error", error.response);
      }
    };
    fetchWithdrawalAmount();
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
    try {
      const res = await clockIn({ location: latLng });
      setCheckInSuccess(true);
      console.log("res", res);
      setCheckLoading(false);
    } catch (error) {
      toast.error(error.response.data.payload.data);
      setCheckLoading(false);
    }
  };

  return (
    <div className="user-dashboard-wrapper">
      <div className="flex justify-between mb-20">
        <div className="text-gray-400">Welcome to Payslice , Peter Brown</div>
        <Button
          buttonText={!checkInSuccess ? "Employee checkin" : "Checked In"}
          loading={checkLoading}
          onClick={submitClockIn}
        />
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
              NGN{" "}
              {parseInt(
                availableFunds?.total_amount_avaliable_to_withdraw
              ).toLocaleString()}{" "}
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
          <div className="text-blue-400">Show more</div>
        </div>
        <div className="flex justify-between border-b pt-4 pb-2 px-8">
          <div>
            <p className="text-normal">Direct Transfer</p>
            <div>Transation ID 059595959</div>
          </div>
          <div className="font-bold text-normal">20,000</div>
          <div>
            <p>Service charge</p>
            <p>1,000</p>
          </div>
          <div className="w-max my-auto">
            <CustomTag text="Successfull" isSuccess={true} />
          </div>

          <div>
            <p>Time stamp</p>
            <p>10:34</p>
          </div>
        </div>
        <div className="flex justify-between pt-4 pb-2 px-8">
          <div>
            <p className="text-normal">Direct Transfer</p>
            <div>Transation ID 059595959</div>
          </div>
          <div className="font-bold text-normal">20,000</div>
          <div>
            <p>Service charge</p>
            <p>1,000</p>
          </div>
          <div className="w-max my-auto">
            <CustomTag text="Successfull" isSuccess={true} />
          </div>

          <div>
            <p>Time stamp</p>
            <p>10:34</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

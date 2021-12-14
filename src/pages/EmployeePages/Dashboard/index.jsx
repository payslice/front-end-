import React from "react";
import { Button } from "../../../components/Button/Button";
import { CustomTag } from "../../../components/CustomTag";

const UserDashboard = () => {
  return (
    <div className="user-dashboard-wrapper">
      <div className="flex justify-between mb-20">
        <div className="text-gray-400">Welcome to Payslice , Peter Brown</div>
        <Button buttonText="Employee checkin" />
      </div>

      <div className="flex w-full justify-between">
        <div className="bg-blue-600 flex px-12 mr-5 py-6 justify-between rounded-xl text-white w-1/2">
          <div className="my-auto">
            <div className="text-normal">Total Earned</div>
            <h3 className="text-xl text-white mb-0">NGN 10,000</h3>
          </div>
          <div className="border flex justify-center ml-10 items-center border-white rounded-full h-16 w-16">
            {" "}
            <p className="mb-0">
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
            <h3 className="text-xl  mb-0">NGN 10,000</h3>
          </div>

          <button
            style={{ background: "#CA7652" }}
            className="h-max py-2 my-auto px-4 rounded text-white"
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

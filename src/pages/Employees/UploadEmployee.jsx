import React from "react";
import { IoMdImages } from "react-icons/io";

const UploadEmployee = () => {
  return (
    <div>
      <div className="header">
        <div className="left-col">
          <h2 className="text-2xl">Upload all staff</h2>
          <p>
            We need some information about your staff to process your request.
          </p>
        </div>
        <div className="my-10">
          <div className="border border-dashed border-gray-400 bg-gray-100 h-96 m-auto">
            <IoMdImages
              className="m-auto"
              size="100"
              //   style={{ height: "inherit" }}
            />
            <p className="text-center">Drop Images Here or Browse</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadEmployee;

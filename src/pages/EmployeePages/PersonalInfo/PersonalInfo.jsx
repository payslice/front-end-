import React, { useState } from "react";
import { InputField } from "../../../components/Input";
import avatar from "../../../assets/svgs/Teacher.svg";
import { Button } from "../../../components/Button/Button";

const PersonalInfo = () => {
  const [imgFile, setImgFile] = useState();
  return (
    <div className="px-8">
      <div className="text-2xl my-4">Personal Information</div>

      <form>
        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField required label="Full name" type="text" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="Email Address" type="email" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="Phone Number " type="tel" />
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField required label="Employees ID" type="text" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="BVN" type="text" minLength="11" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField required label="Location " type="text" />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField required label=" Next of Kin Gender" type="text" />
          </div>
          <div className="w-1/3 mr-5 flex">
            {imgFile ? (
              <img
                src={URL.createObjectURL(imgFile)}
                className="rounded-full h-20 w-20 bg-gray-200 object-cover my-auto"
                alt="user avatar"
              />
            ) : (
              <img
                src={avatar}
                className="rounded-full h-20 w-20 bg-gray-200 my-auto"
                alt="user avatar"
              />
            )}

            <div className="my-auto">
              <label
                htmlFor="file-upload"
                className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 "
              >
                Upload Image
              </label>

              <input
                id="file-upload"
                className="hidden"
                onChange={(e) => {
                  const [file] = e.target.files;
                  setImgFile(file);
                }}
                type="file"
                accept=".png, .jpeg, .jpg"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Button buttonText="Upload Details" />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

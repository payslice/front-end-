import React, { useState } from "react";
import { InputField } from "../../../components/Input";
import avatar from "../../../assets/svgs/Teacher.svg";
import { Button } from "../../../components/Button/Button";
import {
  updateEmployee,
  uploadFile,
  // userData,
} from "../../../utils/ApiRequests";
import {
  removeUserDataFromStorage,
  setuserDataToStorage,
  getUserDataFromStorage,
} from "../../../utils/ApiUtils";

const PersonalInfo = () => {
  const [imgFile, setImgFile] = useState();
  const userData = getUserDataFromStorage();

  console.log("user data", userData);
  const {
    first_name,
    last_name,
    email,
    phone_number,
    bankDetails,
    id,
    workDetails,
  } = userData;

  const [formData, setFormData] = useState({
    ...userData,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    email: email,
    bankDetails: {
      ...bankDetails,
      bvn: bankDetails.bvn,
      bank_code: "058",
    },
    workDetails: {
      ...workDetails,
      location: workDetails.location,
    },
    company: {
      employee_id: id,
    },
    gender: "male",
    employee_id: id,
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const uploadProfileIcon = async () => {
    let bodyFormData = new FormData();
    bodyFormData.append("file", imgFile);
    bodyFormData.append("section", "employee");
    bodyFormData.append("section_id", userData.id);
    setUploading(true);
    try {
      const res = await uploadFile(bodyFormData);
      console.log("response", res);
      setUploading(false);
    } catch (error) {
      console.log("error", error.response);
      setUploading(false);
    }
  };

  const handleChange = (type, e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    type ? (newFormData[type][name] = value) : (newFormData[name] = value);
    setFormData(newFormData);
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await updateEmployee(id, formData);
      removeUserDataFromStorage();
      setuserDataToStorage(res.data.payload.data);
      setSubmitting(false);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      setSubmitting(false);
    }
    console.log("form data", formData);
  };

  return (
    <div className="px-8">
      <div className="text-2xl my-4">Personal Information</div>

      <form onSubmit={updateUserInfo}>
        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField
              required
              label="Full name"
              value={`${formData.first_name} ${formData.last_name}`}
              disabled
              type="text"
            />
          </div>
          <div className="w-1/3 mr-5">
            <InputField
              required
              label="Email Address"
              value={formData.email}
              disabled
              type="email"
            />
          </div>
          <div className="w-1/3 mr-5">
            <InputField
              required
              label="Phone Number"
              value={formData.phone_number}
              type="tel"
              name="phone_number"
              onChange={(e) => handleChange(null, e)}
            />
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/3 mr-5">
            <InputField required label="Employees ID" type="text" />
          </div>
          <div className="w-1/3 mr-5">
            <InputField
              required
              label="BVN"
              onChange={(e) => handleChange("bankDetails", e)}
              type="number"
              name="bvn"
              value={formData.bankDetails?.bvn}
              // minLength="11"
              // maxLength="11"
            />
          </div>
          <div className="w-1/3 mr-5">
            <InputField
              required
              label="Location "
              name="location"
              value={formData.workDetails.location}
              onChange={(e) => handleChange("workDetails", e)}
              type="text"
            />
          </div>
        </div>
        <div className="w-full flex">
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
              {imgFile ? (
                <label
                  htmlFor=""
                  className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 "
                  onClick={uploadProfileIcon}
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </label>
              ) : (
                <label
                  htmlFor="file-upload"
                  className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 "
                >
                  Select Image
                </label>
              )}

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
          <Button buttonText="Upload Details" loading={submitting} />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

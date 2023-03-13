/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IoMdImages } from 'react-icons/io';
import { Button } from '../../components/Button/Button';
import { importEmployees } from '../../utils/ApiRequests';
import { getUserDataFromStorage } from '../../utils/ApiUtils';

const UploadEmployee = () => {
	const [csvFile, setCSVFile] = useState();
	const userData = getUserDataFromStorage();
	const [uploading, setUploading] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const uploadProfileIcon = async () => {
		let bodyFormData = new FormData();
		bodyFormData.append('file', csvFile);
		// bodyFormData.append("status", "true");
		setUploading(true);
		// console.log("body form data", bodyFormData);
		try {
			const res = await importEmployees(csvFile);
			// console.log("response", res);
			setUploading(false);
		} catch (error) {
			// console.log("error", error.response);
			setUploading(false);
		}
	};

	return (
		<div>
			<div className="header">
				<div className="left-col">
					<h2 className="text-2xl">Upload all staff</h2>
					<p>We need some information about your staff to process your request.</p>
				</div>

				{/* <div className="my-auto">
          {csvFile ? (
            <label
              htmlFor="file-upload"
              className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 "
              // onClick={uploadProfileIcon}
            >
              {csvFile.name}
            </label>
          ) : (
            <label
              htmlFor="file-upload"
              className="rounded bg-gray-200 cursor-pointer my-auto py-2 px-4 ml-5 "
            >
              Select File
            </label>
          )}

          <input
            id="file-upload"
            className="hidden"
            onChange={(e) => {
              const [file] = e.target.files;
              setCSVFile(file);
              console.log("file", file);
            }}
            type="file"
            accept=".csv, .xlsx"
          />
        </div> */}

				<div className="my-10">
					<div className="border border-dashed border-gray-400 bg-gray-100 h-96 m-auto">
						<div className="flex justify-center items-center p-10" style={{ height: 'inherit' }}>
							<div>
								<IoMdImages className="m-auto" size="100" />
								<p className="text-center">Upload csv file</p>
							</div>
						</div>
					</div>
				</div>

				<div className="my-8">
					<Button buttonText="Upload employee" loading={uploading} onClick={uploadProfileIcon} />
				</div>
			</div>
		</div>
	);
};

export default UploadEmployee;

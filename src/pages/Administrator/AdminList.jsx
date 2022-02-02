import React from "react";
import { Button } from "../../components/Button/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CustomTag } from "../../components/CustomTag";
import { Table } from "antd";
import { useHistory } from "react-router-dom";

const AdminList = () => {
  const history = useHistory();
  const columns = [
    {
      title: "Full Name ",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span>
          <CustomTag
            text={status}
            isDanger={status === "Pending"}
            isSuccess={status === "Active"}
          />
        </span>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: () => <BsThreeDotsVertical />,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const data = [
    {
      key: "1",
      name: "John Brown",
      phoneNumber: +2348012299289,
      email: "jamesbrown@gmail.com",
      jobTitle: "CEO",
      status: "Pending",
    },
    {
      key: "2",
      name: "John Brown",
      phoneNumber: +2348012299289,
      email: "jamesbrown@gmail.com",
      jobTitle: "CFO",
      status: "Active",
    },
    {
      key: "3",
      name: "John Brown",
      phoneNumber: +2348012299289,
      email: "jamesbrown@gmail.com",
      jobTitle: "CTO",
      status: "Pending",
    },
  ];
  return (
    <div className="__admin-listing">
      <div className="flex w-full justify-between">
        <h3 className="text-2xl">Adminstrators List</h3>
        <Button
          buttonText="Add new adminstrator"
          onClick={() => history.push("/settings/admin/add")}
        />
      </div>
      <div className="my-16">
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default AdminList;

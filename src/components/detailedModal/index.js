import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { rolewise } from "../../services/rolewiseData/rolewise";
import "./styles.css";
const DetailedModal = ({ isModalOpen, setIsModalOpen, data }) => {
  const [rolewiseJobs, setRolewiseJobs] = useState([]);
  useEffect(() => {
    rolewise(data)
      .then((rolewiseData) => {
        setRolewiseJobs(rolewiseData);
        console.log("In modal", rolewiseData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  //   console.log(data);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
      sorter: (a, b) => a.job_title.length - b.job_title.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Number of Jobs",
      dataIndex: "number",
      key: "number",
      sorter: (a, b) => a.number - b.number,
      sortDirections: ["descend", "ascend"],
    },
  ];

  const rowData = rolewiseJobs;
  console.log("rolewiseJobs in modal", rolewiseJobs);
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          OK
        </Button>,
      ]}
    >
      <div
        className="scrollbar"
        style={{
          height: "60vh",
          overflowY: "auto",
        }}
      >
        <div className="test">ads</div>
        <Table
          columns={columns}
          dataSource={rowData}
          // onChange={onChange}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </div>
    </Modal>
  );
};

export default DetailedModal;

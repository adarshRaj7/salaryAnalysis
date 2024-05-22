import { Layout, Space, Table, Tag, theme } from "antd";
import "./App.css";
import { yearwiseData } from "./services/salaries/yearwiseData";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";

//csv

 function App() {
  const  yearwise  = yearwiseData();
  console.log("In app",yearwise)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  //table test

  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: [
        {
          text: "2024",
          value: 2024,
        },
        {
          text: "2023",
          value: 2023,
        },
        {
          text: "2022",
          value: 2022,
        },
        {
          text: "2021",
          value: 2021,
        },
        {
          text: "2020",
          value: 2020,
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.year.indexOf(value) === 0,
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Total Jobs",
      dataIndex: "jobs",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.jobs - b.jobs,
    },
    {
      title: "Average Salary (USD)",
      dataIndex: "salary",
      sorter: (a, b) => a.salary - b.salary,

      // filters: [
      //   {
      //     text: "London",
      //     value: "London",
      //   },
      //   {
      //     text: "New York",
      //     value: "New York",
      //   },
      // ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];
  const data = [
    {
      key: "1",
      year: "2022",
      jobs: 31,
      salary: 1000000,
    },
    {
      key: "2",
      year: "2021",
      jobs: 42,
      salary: 2000000,
    },
    {
      key: "3",
      year: "2024",
      jobs: 32,
      salary: 3000000,
    },
    {
      key: "4",
      year: "2023",
      jobs: 33,
      salary: 4000000,
    },
    {
      key: "5",
      year: "2020",
      jobs: 34,
      salary: 5000000,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };


  return (
    <Layout style={{height:"100vh"}}>
      <Content style={{ padding: "12px 48px" }}>
        <div style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}>
            Main Table
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            showSorterTooltip={{
              target: "sorter-icon",
            }}
          />
        </div>
      </Content>
    </Layout>
  );
}

export default App;

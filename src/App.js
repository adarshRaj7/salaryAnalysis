import { Layout, Space, Table, Tag, theme } from "antd";
import "./App.css";
import { yearwiseData } from "./services/salaries/yearwiseData";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

//csv

function App() {
  const [yearly, setYearly] = useState({});

  useEffect(() => {
    yearwiseData()
      .then((yearwise) => {
        console.log("In app", yearwise);
        setYearly(yearwise);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAverageSalary = (data) => {
    let total = 0;
    if(!data) return 0;
    data.forEach((element) => {
      total += element.salary_in_usd;
    });
    return (total / data.length).toFixed(2);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //table test

  console.log(yearly);
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
    },
  ];
  const data = [
    {
      key: "1",
      year: "2022",
      jobs: yearly[2022]?.length || 0,
      salary: getAverageSalary(yearly[2022]),
    },
    {
      key: "2",
      year: "2021",
      jobs: yearly[2021]?.length || 0,
      salary:getAverageSalary(yearly[2021]),
    },
    {
      key: "3",
      year: "2024",
      jobs: yearly[2024]?.length || 0,
      salary: getAverageSalary(yearly[2024]),
    },
    {
      key: "4",
      year: "2023",
      jobs: yearly[2023]?.length || 0,
      salary: getAverageSalary(yearly[2023]),
    },
    {
      key: "5",
      year: "2020",
      jobs: yearly[2020]?.length || 0,
      salary: getAverageSalary(yearly[2020]),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: "12px 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
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

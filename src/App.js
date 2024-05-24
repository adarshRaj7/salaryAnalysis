import { Button, Layout, Modal, Space, Table, Tag, theme } from "antd";
import "./App.css";
import { yearwiseData } from "./services/salaries/yearwiseData";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import DetailedModal from "./components/detailedModal";

//csv

function App() {
  const [selectedYear, setSelectedYear] = useState(2024); // [1
  const [yearly, setYearly] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    yearwiseData()
      .then((yearwise) => {
        // console.log("In app", yearwise);
        setYearly(yearwise);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAverageSalary = (data) => {
    let total = 0;
    if (!data) return 0;
    data.forEach((element) => {
      total += element.salary_in_usd;
    });
    return (total / data.length).toFixed();
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // console.log(yearly);

  const dataForJobsGraph = Object.keys(yearly).map((key) => {
    if (key !== "null")
      return {
        year: key,
        jobs: yearly[key].length,
      };
  });
  const dataForSalaryGraph = Object.keys(yearly).map((key) => {
    if (key !== "null")
      return {
        year: key,
        salary: getAverageSalary(yearly[key]),
      };
  });
  // console.log(dataForJobsGraph);
  // console.log("dataForSalaryGraph,", dataForSalaryGraph);

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
      render: (text, record) => {
        if (record.year === "Analytics") {
          const filteredData = record.jobs.filter(
            (item) => item && item.year !== undefined
          );

          return (
            <LineChart width={100} height={100} data={filteredData}>
              <XAxis dataKey="year" hide={true} />
              <YAxis hide={true} />
              <Tooltip />
              <Line type="monotone" dataKey="jobs" stroke="#8884d8" />
            </LineChart>
          );
        } else {
          return record.jobs;
        }
      },
      sorter: (a, b) => a.jobs - b.jobs,
    },
    {
      title: "Average Salary (USD)",
      dataIndex: "salary",
      render: (text, record) => {
        if (record.year === "Analytics") {
          const filteredData = record.salary.filter(
            (item) => item && item.year !== undefined
          );

          return (
            <LineChart width={100} height={100} data={filteredData}>
              <XAxis dataKey="year" hide={true} />
              <YAxis
                domain={[
                  (dataMin) => 0.9 * dataMin,
                  (dataMax) => 1.6 * dataMax,
                ]}
                hide={true}
              />{" "}
              <YAxis hide={true} />
              <Tooltip />
              <Line type="monotone" dataKey="salary" stroke="#8884d8" />
            </LineChart>
          );
        } else {
          return record.salary;
        }
      },
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
      salary: getAverageSalary(yearly[2021]),
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
    {
      key: "6",
      year: "Analytics",
      jobs: dataForJobsGraph,
      salary: dataForSalaryGraph,
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  showModal();
                  setSelectedYear(record.year);
                  // Do something with the clicked row
                  console.log("Clicked row", record);
                },
              };
            }}
            showSorterTooltip={{
              target: "sorter-icon",
            }}
          />
        </div>
        <DetailedModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          data={yearly[selectedYear]}
        />
      </Content>
    </Layout>
  );
}

export default App;

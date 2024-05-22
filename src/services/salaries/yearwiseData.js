import { parseCsv } from "../parseCsv/parseCsv";

export const yearwiseData = () => {
  parseCsv()
    .then((results) => {
      let data = results.data;
      const yearwise = {
        2023: [],
      };
      data.forEach((element) => {
        let year = element.work_year;
        if (yearwise[year]) {
          yearwise[year].push(element);
        } else {
          yearwise[year] = [element];
        }
      });
      // console.log("2020", yearwise[2020].length);
      // console.log("2021", yearwise[2021].length);
      // console.log("2022", yearwise[2022].length);
      // console.log("2023", yearwise[2023].length);
      // console.log("2024", yearwise[2024].length);
      // console.log("total", yearwise[2024].length+yearwise[2023].length+yearwise[2022].length+yearwise[2021].length+yearwise[2020].length);
      console.log("yearwise",yearwise)
      return yearwise;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

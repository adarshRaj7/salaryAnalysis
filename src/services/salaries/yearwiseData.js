
import { parseCsv } from "../parseCsv/parseCsv";

export const yearwiseData = () => {

  return new Promise((resolve, reject) => {
  parseCsv()
    .then((results) => {
      let data = results.data;
      let yearlyData = {};
      data.forEach((element) => {
        if (!yearlyData[element.work_year]) {
          yearlyData[element.work_year] = [];
        }
        yearlyData[element.work_year].push(element);
        resolve(yearlyData);
      });
    })
    .catch((error) => {
      console.log(error);
      reject(error) ;
    });
  });
};

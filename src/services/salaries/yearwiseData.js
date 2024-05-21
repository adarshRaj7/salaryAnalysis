import { parseCsv } from "../parseCsv/parseCsv";

export const yearwiseData = () => {
  parseCsv()
    .then((results) => {
      let data = results.data;
      const yearwise = {}
      // console.log("data from year", data);
      let count = 0;
      data.forEach((element) => {
        console.log("element " + count, element);
        count++;
        let year = element.;
      });
      // console.log("yearwise",yearwise)
    })
    .catch((error) => {
      console.log(error);
    });
};

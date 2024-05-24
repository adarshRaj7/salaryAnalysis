export const rolewise = (data) => {
  return new Promise((resolve, reject) => {
    let rolewiseData = {};
    if (data) {
      data.forEach((element) => {
        if (!rolewiseData[element.job_title]) {
          rolewiseData[element.job_title] = [];
        }
        rolewiseData[element.job_title].push(element);
    });
        const result = Object.keys(rolewiseData).map((key) => {
          if (key !== "null")
            return {
              job_title: key,
              number: rolewiseData[key].length,
            };
        });
        console.log("In rolewise", result);
        resolve(result);
    }
  });
};

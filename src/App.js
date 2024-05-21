import logo from "./logo.svg";
import "./App.css";
import { parseCsv } from "./services/parseCsv/parseCsv";
import { useState } from "react";
import { yearwiseData } from "./services/salaries/yearwiseData";

//csv

function App() {
  yearwiseData();
  // let data = [];
  // parseCsv()
  // .then((results) => {
  //   data = results;
  //   console.log(data);
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  // console.log("data", data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

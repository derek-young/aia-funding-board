import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

import "./App.css";

function parseData(data) {
  const rows = data
    .split("\n")
    .map(row =>
      row
        .split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)
        .map(x => x.replace(/"/g, ""))
        .filter(x => x.length > 1)
    )
    .filter(row => row.length > 1);

  // Split final row into 2 x 12
  const finalRow = rows.pop().slice(0, 13);

  rows.push(finalRow);
  rows.push(finalRow);
  console.log("rows", rows);

  return rows;
}

const Row = (row, rowIndex, rows) => {
  console.log("row", row);
  return (
    <div key={rowIndex} className="App-row">
      {row.map((label, i, array) => {
        // Remove total
        if (i === 0) return null;

        const modifier = rowIndex > rows.length - 3 ? 3 : 0;
        const width = `${100 / array.length - modifier}%`;

        return (
          <Button
            key={i}
            onClick={() =>
              console.log(`Row: ${rowIndex}, Column: ${i} ${label}`)
            }
            variant="contained"
            style={{
              opacity: 0.9,
              width
            }}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("./Fund_a _Need-Sheet1.csv");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      const result = await reader.read();

      return decoder.decode(result.value);
    };

    getData().then(data => {
      const parsedData = parseData(data);
      setData(parsedData);
    });
  }, []);

  console.log("data", data);

  return (
    <div className="App">
      <header className="App-header">AIA Fundraising Board</header>
      <div className="App-body">
        {data.map(Row)}
        <div className="App-body-background" />
      </div>
    </div>
  );
};

export default App;

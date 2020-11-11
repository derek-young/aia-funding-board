import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import fundedImg from "./funded.png";

import "./App.css";
import { parseData } from "./helpers";

// Colors from https://www.shutterstock.com/blog/use-pastel-colors-designs

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: 4,
    opacity: 0.9
  },
  row0: {
    fontSize: 26,
    backgroundColor: "rgba(244, 205, 226, 1)",
    "&:hover": {
      backgroundColor: "rgba(244, 205, 226, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(244, 205, 226, 0.2)"
    }
  },
  row1: {
    fontSize: 24,
    backgroundColor: "rgba(236, 205, 249, 1)",
    "&:hover": {
      backgroundColor: "rgba(236, 205, 249, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(236, 205, 249, 0.2)"
    }
  },
  row2: {
    fontSize: 22,
    backgroundColor: "rgba(228, 217, 247, 1)",
    "&:hover": {
      backgroundColor: "rgba(228, 217, 247, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(228, 217, 247, 0.2)"
    }
  },
  row3: {
    fontSize: 18,
    backgroundColor: "rgba(221, 228, 243, 1)",
    "&:hover": {
      backgroundColor: "rgba(221, 228, 243, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(221, 228, 243, 0.2)"
    }
  },
  row4: {
    fontSize: 16,
    backgroundColor: "rgba(216, 232, 241, 1)",
    "&:hover": {
      backgroundColor: "rgba(216, 232, 241, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(216, 232, 241, 0.2)"
    }
  },
  row5: {
    fontSize: 16,
    backgroundColor: "rgba(206, 250, 235, 1)",
    "&:hover": {
      backgroundColor: "rgba(206, 250, 235, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(206, 250, 235, 0.2)"
    }
  },
  row6: {
    backgroundColor: "rgba(209, 250, 223, 1)",
    "&:hover": {
      backgroundColor: "rgba(209, 250, 223, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(209, 250, 223, 0.2)"
    }
  },
  row7: {
    backgroundColor: "rgba(234, 250, 204, 1)",
    "&:hover": {
      backgroundColor: "rgba(234, 250, 204, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(234, 250, 204, 0.2)"
    }
  },
  row8: {
    backgroundColor: "rgba(247, 251, 203, 1)",
    "&:hover": {
      backgroundColor: "rgba(247, 251, 203, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(247, 251, 203, 0.2)"
    }
  },
  row9: {
    backgroundColor: "rgba(247, 251, 203, 1)",
    "&:hover": {
      backgroundColor: "rgba(247, 251, 203, 0.8)"
    },
    "&:disabled": {
      backgroundColor: "rgba(247, 251, 203, 0.2)"
    }
  }
}));

const Row = ({ row, rowIndex, rows }) => {
  const classes = useStyles();
  const [funded, setFunded] = useState(new Array(rows.length).fill([]));

  return (
    <div className="App-row">
      {row.map((label, i, array) => {
        // Remove total
        if (i === 0) return null;

        let modifier = 0; // rowIndex % 2 === 0 ? 2 : 0;
        if (rowIndex === rows.length - 3) modifier = 1;
        if (rowIndex > rows.length - 3) modifier = 3;

        const width = `${100 / array.length - modifier}%`;

        let overlayClass = "";

        if (rowIndex > 4) overlayClass = "Row-fundedSmall";
        if (rowIndex > 6) overlayClass = "Row-fundedTiny";

        const isFunded =
          funded[rowIndex] && funded[rowIndex][i] && funded[rowIndex][i].funded;

        return (
          <Button
            key={i}
            className={`${classes.root} ${classes[`row${rowIndex}`]}`}
            style={{ position: "relative", width }}
            disabled={isFunded}
            onClick={() => {
              const newFunded = [...funded];
              newFunded[rowIndex] = [...newFunded[rowIndex]];

              if (isFunded) {
                newFunded[rowIndex][i] = { funded: false };
              } else {
                newFunded[rowIndex][i] = {
                  funded: true,
                  firstName: "Sarah"
                };
              }

              setFunded(newFunded);
            }}
            variant="contained"
          >
            <div>
              {label}
              {isFunded && (
                <>
                  <div className={`Row-fundedOverlay ${overlayClass}`}>
                    Thank You, {funded[rowIndex][i].firstName}!
                  </div>
                  <img alt="funded" className="Row-fundedImg" src={fundedImg} />
                </>
              )}
            </div>
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

  return (
    <div className="App">
      <header className="App-header">AIA Fundraising Board</header>
      <div className="App-body">
        {data.map((row, rowIndex, rows) => (
          <Row key={rowIndex} row={row} rowIndex={rowIndex} rows={rows} />
        ))}
        <div className="App-body-background" />
      </div>
    </div>
  );
};

export default App;

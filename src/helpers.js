export function parseData(data) {
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

  return rows;
}

// https://d3-graph-gallery.com/graph/line_basic.html

const createD3BasicLineChart = function (targetSelector) {
  // const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  //   width = 460 - margin.left - margin.right,
  //   height = 400 - margin.top - margin.bottom;

  const margin = {
    top: 20,
    right: 15,
    bottom: 20,
    left: 40
  },
    width = 350 - margin.left - margin.right,
    height = 220 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select(targetSelector)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  console.log("moin", svg)

  //Read the data
  // const GAMADataApiURL = "http://localhost:8000/api/GAMAData"
  // let csvRowCount = 0
  // d3.csv(GAMADataApiURL,
  // // d3.csv(csvData,
  //   // When reading the csv, I must format variables:
  //   function (d) {
  //     if (csvRowCount > 9497) return
  //     csvRowCount += 1
  //     const formatDate= d.current_date.match(/'([^']+)'/)[1].slice(0,11)
  //     return { date: d3.timeParse("%Y-%m-%d ")(formatDate), value: d.value }
  //   }).then(data => {
  //     drawBasicLineChartFromData(data, width, height, svg)
  //   }).catch(err => { console.log("error while processing CSV with D3", err) })
}

// Now I can use this dataset:
const drawBasicLineChartFromData = function (data, width, height, svg) {

  // Add X axis --> it is a date format
  const x = d3.scaleTime()
    .domain(d3.extent(data, function (d) { return d.date; }))
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return +d.value; })])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function (d) { return x(d.date) })
      .y(function (d) { return y(d.value) })
    )

}
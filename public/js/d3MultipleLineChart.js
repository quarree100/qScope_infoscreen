// https://d3-graph-gallery.com/graph/line_several_group.html

const createD3MultipleLineChart = function (targetSelector, data_path_list) {
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

    // const file01 = "data/includes/csv_export/emissions/emissions_20220714_19-21-56/csv_export_co2_graph_test_1.03.csv"
    // const file02 = "data/includes/csv_export/emissions/emissions_20220714_19-21-56/csv_export_co2_graph_test_2.09.csv"
    // const file03 = "data/includes/csv_export/emissions/emissions_20220714_19-21-56/csv_export_co2_graph_test_2.09.csv"
    // const file04 = "data/includes/csv_export/emissions/emissions_20220714_19-21-56/csv_export_co2_graph_test_2.13.csv"
    // const file05 = "data/includes/csv_export/emissions/emissions_20220714_19-21-56/csv_export_co2_graph_test_2.19.csv"
    // const files = [file01, file02, file03, file04, file05]
    const files = data_path_list
    const promises = [];

    let file_num = 0
    files.forEach((file_path)=> {
        const file_num_temp = file_num // if you give file_num to each promise, when they are called, they're all incremented
        file_num++
        file_path = addPathTolocalhost(file_path) //maybe not necessary
        promises.push(
            d3.csv(file_path, function (d) {
                const formatDate = d.current_date.match(/'([^']+)'/)[1].slice(0, 11)
                return { date: d3.timeParse("%Y-%m-%d ")(formatDate), value: d.building_emissions, file_num: file_num_temp }
            }))
        }
    )
    Promise.all(promises).then(function (files) {
        //make data flat
        let data = files.reduce((acc, curVal) => {
            return acc.concat(curVal)
        }, []);

        drawMultipleLineChart(data, width, height, svg)
    }).catch(err => { console.log("error while processing CSV with D3", err) })
}

// Now I can use this dataset:
const drawMultipleLineChart = function (data, width, height, svg) {

    // group the data: I want to draw one line per group
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function (d) { return d.file_num; })
        .entries(data);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
        .domain(d3.extent(data, function (d) { return d.date; }))
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return +d.value; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // color palette
    var res = sumstat.map(function (d) { return d.key }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", function (d) { return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function (d) {

            return d3.line()
                .x(function (d) { return x(d.date); })
                .y(function (d) { return y(+d.value); })
                (d.values)
        })



}
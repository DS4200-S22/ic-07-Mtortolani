/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
// This code creates the svg object and sets the position for the barchart
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? 
// maxY1 finds the largest score in data1
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do?   
let yScale1 = d3.scaleLinear() // scales the Y axis linear data to pixels
            .domain([0,maxY1]) // inputs the data
            .range([height-margin.bottom,margin.top]); // outputs the pixel values

// TODO: What does each line of this code do? 
let xScale1 = d3.scaleBand() // scaling for categories
            .domain(d3.range(data1.length)) // inputs the amount of columns in the data
            .range([margin.left, width - margin.right]) // outputs the pixel position in the svg
            .padding(0.1); // adds a bit of space on each end of the graph

// TODO: What does each line of this code do?  
svg1.append("g") // appends a generic svg
   .attr("transform", `translate(${margin.left}, 0)`) // translates svg
   .call(d3.axisLeft(yScale1))  // calls in the scale for the y axis and makes it for us
   .attr("font-size", '20px'); // changes font size

// TODO: What does each line of this code do? 
svg1.append("g") // appends a generic svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // translate to the spot we want
    .call(d3.axisBottom(xScale1)  // set in the scale for the x axis
            .tickFormat(i => data1[i].name))  // make name of item show up per tick
    .attr("font-size", '20px'); // changes font size

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
const tooltip1 = d3.select("#hard-coded-bar") // select our div with id "hard-coded-bar"
                .append("div") // appends a new div
                .attr('id', "tooltip1") // gives this new div the id 'tooltip1'
                .style("opacity", 0) // makes the div have 0 opacity
                .attr("class", "tooltip"); // sets the div class to 'tooltip'

// TODO: What does each line of this code do?  
const mouseover1 = function(event, d) { // sets mouseover1 event function
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // sets inner html to name and score of data hovered
          .style("opacity", 1);   // changes opacity from transparent to showing up
}

// TODO: What does each line of this code do? 
const mousemove1 = function(event, d) { // set mousemove1 event function
  tooltip1.style("left", (event.x)+"px") // sets the postition of the tooltip to the right of the mouse
          .style("top", (event.y + yTooltipOffset) +"px"); // sets the tooltip position under the mouse
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) { // sets mouseleave1 event function
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg1.selectAll(".bar") // makes an empty selection
   .data(data1) // calls barchart data
   .enter() // insterts the selected bars
   .append("rect") // appends a rectangle
     .attr("class", "bar") // make the rectangle's class 'bar'
     .attr("x", (d,i) => xScale1(i)) // sets the x position for the rectangle
     .attr("y", (d) => yScale1(d.score)) // sets the y height of the rectangle
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))  // sets theheight of each bar to the bars score
     .attr("width", xScale1.bandwidth()) // set the witch of the bars
     .on("mouseover", mouseover1) // links event listener to event handler
     .on("mousemove", mousemove1) // links event listener to event handler
     .on("mouseleave", mouseleave1); // links event listener to event handler





// CSV Bar Code


// prepare svg dimensions
// Reuse same width and height
const width2 = 900; 
const height2 = 450; 
const margin2 = {left:50, right:50, bottom:50, top:100}; 
const yTooltipOffset2 = 15; 


// create and position svg
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width2-margin2.left-margin2.right)
  .attr("height", height2 - margin2.top - margin2.bottom)
  .attr("viewBox", [0, 0, width2, height2]);

  

// set up data csv
d3.csv('data/barchart.csv').then((data) => {
  console.log(data); 

  let xKey2 = 'name';
  let yKey2 = 'score';

  let maxY1 = d3.max(data, function(d) { return data[yKey2]});

  // prep y axis scale
  // look to fix yScale
  let yScale2 = d3.scaleLinear() // scales the Y axis linear data to pixels
              .domain([0,maxY1]) // inputs the data
              .range([height2-margin2.bottom,margin2.top]); // outputs the pixel values

  // prep x axis scale
  let xScale2 = d3.scaleBand() // scaling for categories
              .domain(d3.range(data.length)) // inputs the amount of columns in the data
              .range([margin2.left, width2 - margin2.right]) // outputs the pixel position in the svg
              .padding(0.1); // adds a bit of space on each end of the graph

  // apply y scale 
  svg2.append("g")
    .attr("transform", `translate(${margin2.left}, 0)`)
    .call(d3.axisLeft(yScale2)) 
    .attr("font-size", '20px');

  // apply x scale
  svg2.append("g") // appends a generic svg
      .attr("transform", `translate(0,${height2 - margin2.bottom})`) // translate to the spot we want
      .call(d3.axisBottom(xScale2)  // set in the scale for the x axis
              .tickFormat(i => data[i].name))  // make name of item show up per tick
      .attr("font-size", '20px'); // changes font size

  // make csv bar graph
  svg2.selectAll(".bar") // makes an empty selection
    .data(data) // calls barchart data
    .enter() // insterts the selected bars
    .append("rect") // appends a rectangle
      .attr("class", "bar") // make the rectangle's class 'bar'
      .attr("x", (d,i) => xScale2(i)) // sets the x position for the rectangle
      // comes fromm yscale 2, fix yscale 2
      .attr("y", (d) => yScale2(d.score)) // sets the y height of the rectangle
      .attr("height", (d) => (height2 - margin2.bottom) - yScale2(d.score))  // sets theheight of each bar to the bars score
      .attr("width", xScale2.bandwidth()) // set the witch of the bars

}
)


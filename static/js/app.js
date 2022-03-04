// Top-Ten Bar Chart

// Create arrays for word with rank, primary score, and secondary score from top_guesses.js
let topFirstGuessWords = guessScores.map(guessObj => guessObj.Word.toUpperCase());
let firstGuessYellowScores = guessScores.map(guessObj => guessObj.Expected_Yellow_Squares);
let firstGuessGreenScores = guessScores.map(guessObj => guessObj.Expected_Green_Squares);
let firstGuessTotalScores = guessScores.map(guessObj => guessObj.Expected_Yellow_Squares + guessObj.Expected_Green_Squares);

// Secondary score trace
let greenTrace = {
    x: firstGuessGreenScores,
    y: topFirstGuessWords,
    name: "Expected Green<br>     Squares",
    type: "bar",
    orientation: "h",
    text: firstGuessGreenScores.map(String),
    textposition: "auto",
    customdata: firstGuessYellowScores,
    hovertemplate:
        "<b>%{y}</b><br><br>" +
        "Expected Green Squares: %{x:.2f}<br>" +
        "Expected Yellow Squares: %{customdata:.2f}<br>" +
        "<extra></extra>",
    hoverlabel: {bgcolor: "white"}
}

// Primary score trace
let yellowTrace = {
    x: firstGuessYellowScores,
    y: topFirstGuessWords,
    name: "Expected Yellow<br>     Squares",
    type: "bar",
    orientation: "h",
    text: firstGuessYellowScores.map(String),
    textposition: "auto",
    hoverinfo: "none"
}

// Combine traces
let barData = [greenTrace, yellowTrace];

// Setup bar chart layout
let barLayout = {
    barmode: "stack",
    yaxis: {autorange: "reversed"},
    height: 475,
    xaxis: {
        //showticklabels: false
    },
    margin: {
        t: 10,
        b: 30,
        l: 80,
        r: 30,
        pad: 5
    },
    plot_bgcolor: "#343a40",
    paper_bgcolor: "#343a40",
    colorway: ["#54B447", "#D3DB1B"],
    legend: {
        font: {size: 17},
        orientation: "h",
        traceorder: "normal",
        x: 0.08,
        y: 1.15
    },
    font: {
        size: 15,
        color: "white"
    }
}

// Render the plot to the div tag with id "top-ten bar"
Plotly.newPlot("top-ten-bar", barData, barLayout);




// // Top-Ten Table

// // Import the guesses object from top-guesses.js
// const topGuesses = guesses;

// // Reference the HTML table using d3
// let tbody = d3.select("#top-ten");

// // Loop through each guess
// // and append a row and cells for each value in the row
// topGuesses.forEach((guess) => {
//     // Append a row to the table body
//     let row = tbody.append("tr");
    
//     // Loop through each key for the guess and add
//     // each value as a table cell (td)
//     Object.values(guess).forEach((val) => {
//         let cell = row.append("td");
//         cell.text(val);
//     });
// });




// Metrics Table

// Import the metrics object from top-guesses_metrics.js
const guessMetrics = metrics;

// Reference the HTML table using d3
let tbody = d3.select("#guess-metrics");

// Loop through each guess
// and append a row and cells for each value in the row
guessMetrics.forEach((guess) => {
    // Append a row to the table body
    let row = tbody.append("tr");
    
    // Loop through each key for the guess and add
    // each value as a table cell (td)
    Object.values(guess).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
    });
});





// Solver

// Import the words array from words.js
// const allWords = words







// // Create function to build the table
// function buildTable(data) {

//     // Loop through each guess
//     // and append a row and cells for each value in the row
//     topGuesses.forEach((guess) => {
//         // Append a row to the table body
//         let row = tbody.append("tr");
        
//         // Loop through each key for the guess and add
//         // each value as a table cell (td)
//         Object.values(guess).forEach((val) => {
//             let cell = row.append("td");
//             cell.text(val);
//         });
//     });
// };

// // Build the table when the page loads
// buildTable(tableData);
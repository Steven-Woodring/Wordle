// Top-Ten Bar Chart

// Create arrays for word with rank, primary score, and secondary score from top_guesses.js
let topFirstGuessWords = guesses.map(guessObj => `${guessObj.Rank}) ${guessObj.Word}`);
let firstGuessPrimaryScores = guesses.map(guessObj => guessObj.Primary_Score);
let firstGuessSecondaryScores = guesses.map(guessObj => guessObj.Secondary_Score);

// Primary score trace
let primaryTrace = {
    x: firstGuessPrimaryScores,
    y: topFirstGuessWords,
    name: "Letter Score",
    type: "bar",
    orientation: "h"
}

// Secondary score trace
let secondaryTrace = {
    x: firstGuessSecondaryScores,
    y: topFirstGuessWords,
    name: "Positioning Score",
    type: "bar",
    orientation: "h"
}

// Combine traces
let barData = [primaryTrace, secondaryTrace];

// Setup bar chart layout
let barLayout = {
    barmode: "overlay",
    yaxis: {autorange: "reversed"},
    height: 500,
    xaxis: {
        showticklabels: false
    },
    margin: {
        t: 15,
        b: 30,
        l: 80,
        r: 30,
        pad: 5
    },
    plot_bgcolor: "#343a40",
    paper_bgcolor: "#343a40",
    colorway: ["#3069B9", "#699FEA"],
    legend: {
        font: {size: 17},
        orientation: "h",
        x: 0.1,
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
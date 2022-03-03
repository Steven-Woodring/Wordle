// Top-Ten Table

// Import the guesses object from top-guesses.js
const topGuesses = guesses;

// Reference the HTML table using d3
var tbody = d3.select("#top-ten");

// Loop through each guess
// and append a row and cells for each value in the row
topGuesses.forEach((guess) => {
    // Append a row to the table body
    let row = tbody.append("tr");
    
    // Loop through each key for the guess and add
    // each value as a table cell (td)
    Object.values(guess).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
    });
});




// Metrics Table

// Import the metrics object from top-guesses_metrics.js
const guessMetrics = metrics;

// Reference the HTML table using d3
var tbody = d3.select("#guess-metrics");

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
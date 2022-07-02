// Top-Ten Bar Chart

// Sort guessScores array by total expected squares, then by expected green squares, descending
guessScores.sort(function (a, b) {
    
    if (a.Total_Expected_Squares > b.Total_Expected_Squares) return -1;
    if (a.Total_Expected_Squares < b.Total_Expected_Squares) return 1;

    if (a.Expected_Green_Squares > b.Expected_Green_Squares) return -1;
    if (a.Expected_Green_Squares < b.Expected_Green_Squares) return 1;
});

// Grab only the top 10 first guesses
let topGuessScores = guessScores.slice(0,10);

// Create arrays for word with rank, primary score, and secondary score from top_guesses.js
let topFirstGuessWords = topGuessScores.map(guessObj => guessObj.Word.toUpperCase());
let firstGuessYellowScores = topGuessScores.map(guessObj => guessObj.Expected_Yellow_Squares);
let firstGuessGreenScores = topGuessScores.map(guessObj => guessObj.Expected_Green_Squares);
let firstGuessTotalScores = topGuessScores.map(guessObj => guessObj.Total_Expected_Squares);

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
    height: 500,
    xaxis: {
        title: {text: "Total Expected Colored Squares"}
    },
    margin: {
        t: 20,
        b: 50,
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




// Solver

// get table references
let form = d3.select("form");

function buildForm() {
    
    // First, clear the form
    form.html("");
  
    let label1 = form.append("label");
    label1.text("What word did you select for your first guess?");
    let input1 = form.append("input");

    let label2 = form.append("label");
    label2.text("What color is each square? (b=black, y=yellow, g=green) (Ex: bbgby)");
    let input2 = form.append("input");

    // let label3 = form.append("label");
    // label3.text("Which letters are yellow?")
    // let input3 = form.append("input");

    // let label4 = form.append("label");
    // label4.text("Which letters are green?")
    // let input4 = form.append("input");
    
    
    // // Next, loop through each object in the data
    // // and append a row and cells for each value in the row
    // for (let i = 0; i < 3; i++) {
    //     // Append a row to the table body
    //     let label = form.append("label");
    //     let input = form.append("input");

    //     if (i === 0) {
            
    //     }
  
    //     // Loop through each field in the dataRow and add
    //     // each value as a table cell (td)
    //     Object.values(dataRow).forEach((val) => {
    //         let cell = row.append("td");
    //         cell.text(val);
    //     });
    // });
  }



// Initialize empty variables to hold the colored letters
let blackLetters = "";
let yellowLetters = {};
let greenLetters = {};


function giveNextGuess() {
    
    

    // Grab current guess from first input
    let currentGuess = document.getElementsByTagName("input")[0].value;

    // Grab colored square information from second input
    let currentSquares = document.getElementsByTagName("input")[1].value;
    
    for (let i = 0; i < 5; i++) {
        
        // If the square is inputted as "b"
        if (currentSquares[i] === "b") {
            // Add the letter to the string of black letters
            blackLetters += currentGuess[i];

        // Else, if the square is inputted as "y"
        } else if (currentSquares[i] === "y") {
            // If the yellowLetters object includes a key that is equal to the letter
            if (Object.keys(yellowLetters).includes(currentGuess[i])) {
                // Add the index to the array that is the letter key's value
                yellowLetters[currentGuess[i]].push(i);
            } else {
                // Create a key of the letter in the yellowLetters object and assign an array of the index to its value
                yellowLetters[currentGuess[i]] = [i];
            }

        } else {
            // If the greenLetters object includes a key that is equal to the letter
            if (Object.keys(greenLetters).includes(currentGuess[i])) {
                greenLetters[currentGuess[i]].push(i);
            } else {
                greenLetters[currentGuess[i]] = [i];
            }
        }
    }

    console.log(blackLetters);
    console.log(yellowLetters);
    console.log(greenLetters);

    // get words list
    let allWordsInOrder = [];
    guessScores.forEach(wordObj => allWordsInOrder.push(wordObj.Word));
    console.log(allWordsInOrder);

    // filter words list for words that don't contain any of the black letters
    for (let i = 0; i < blackLetters.length; i++) {
        allWordsInOrder = allWordsInOrder.filter(word => !(word.includes(blackLetters[i])));
    }
    console.log(allWordsInOrder);
    
    // filter words list for words that dont have yellow letters in their listed indices
    Object.keys(yellowLetters).forEach(letter => {

        allWordsInOrder = allWordsInOrder.filter(word => word.includes(letter));

        for (let i = 0; i < yellowLetters[letter].length; i++) {
            let letterIndex = yellowLetters[letter][i];
            allWordsInOrder = allWordsInOrder.filter(word => word[letterIndex] !== letter);
        }
    })

    console.log(allWordsInOrder);

    // filter words list for words that have green letters in their listed indices
    Object.keys(greenLetters).forEach(letter => {

        for (let i = 0; i < greenLetters[letter].length; i++) {
            let letterIndex = greenLetters[letter][i];
            allWordsInOrder = allWordsInOrder.filter(word => word[letterIndex] === letter);
        }
    })

    console.log(allWordsInOrder);

    let nextGuess = allWordsInOrder[0];
    console.log(nextGuess);



    // First, clear the form
    form.html("");
  
    let label0 = form.append("label");
    label0.text(`We recommend that your next guess be "${nextGuess}". `);

    let label1 = form.append("label");
    label1.text(" What's your guess?");
    let input1 = form.append("input");

    let label2 = form.append("label");
    label2.text("What color is each square? (b=black, y=yellow, g=green) (Ex: bbgby)");
    let input2 = form.append("input");

    
    







    
    // // If all four inputs were given (if the user is starting)
    // if (document.getElementsByTagName("input")[3]) {
    //     // Store the first input as the user's first guess
    //     let firstGuess = document.getElementsByTagName("input")[0].value;
    //     console.log(firstGuess);
        
    //     // Store the second input as the grey letters
    //     let greyLetters = document.getElementsByTagName("input")[1].value;
    //     console.log(greyLetters);
        
    //     // Store the third input as the yellow letters
    //     let yellowLetters = document.getElementsByTagName("input")[2].value;
    //     console.log(yellowLetters);
        
    //     // Store the fourth input as the green letters
    //     let greenLetters = document.getElementsByTagName("input")[3].value;
    //     console.log(greenLetters);
    // } else {
    //     // Add the grey letters from the first input to greyLetters
    //     greyLetters += document.getElementsByTagName("input")[0].value;
    //     console.log(greyLetters);
        
    //     // Add the yellow letters from the second input to yellowLetters
    //     let newYellowLetters = document.getElementsByTagName("input")[1].value;
    //     console.log(yellowLetters);
        
    //     // Add the green letters from the third input to greenLetters
    //     let greenLetters = document.getElementsByTagName("input")[2].value;
    //     console.log(greenLetters);
    // }

    // Find best-scoring word that fits color criteria

    // Print next guess and get rid of 1st question


}



// Attach an event to listen for a click on the "Next Guess" button
d3.select("button").on("click", giveNextGuess);

// Run a function so that when the page loads, the initial form appears
buildForm();








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
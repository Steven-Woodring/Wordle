// Ensure that words array from words.js has correct amount of words (12,947 Wordle words)
console.log(words.length);

// Create function to find how many green and yellow squares a first guess is expected to produce
function scoreGuess(guess) {
    
    // Create new words array that omits the guess
    let wordsMinusGuess = words.filter(word => word !== guess);

    // Initialize expected yellow and green square count for guess to 0
    let guessGreenSquares = 0;
    let guessYellowSquares = 0;
    
    // For each letter in guess
    for (let i = 0; i < guess.length; i++) {
        
        // Initialize expected yellow and green square count for letter to 0
        let letterGreenSquares = 0;
        let letterYellowSquares = 0;

        // For word in the array of remaining words
        for (let j = 0; j < wordsMinusGuess.length; j++) {

            // If the letter is in the same position in the guess and word
            if (guess[i] === wordsMinusGuess[j][i]) {
                // Add (1 / 12,946) to the expected green square count
                letterGreenSquares += (1 / wordsMinusGuess.length);
            }

            // Else, if the word contains the current letter from guess
            else if (wordsMinusGuess[j].includes(guess[i])) {
                // Add (1 / 12,946) to the expected yellow square count
                letterYellowSquares += (1 / wordsMinusGuess.length);
            }
        }

        // Add expected green/yellow squares for letter to expected green/yellow squares for guess
        guessGreenSquares += letterGreenSquares;
        guessYellowSquares += letterYellowSquares;
    }

    // Create object to hole the guess and its scores
    let guessScore = {
        Word: guess,
        Expected_Green_Squares: (Math.round(guessGreenSquares * 100) / 100),
        Expected_Yellow_Squares: (Math.round(guessYellowSquares * 100) / 100),
        Total_Expected_Squares: (Math.round((guessGreenSquares + guessYellowSquares) * 100) / 100)
    }
    
    // Return guessScore object
    return guessScore;
}

// Initialize array to hold only the words that have repeated letters
repeatLetterWords = [];

// For word in words array
for (let i = 0; i < words.length; i++) {
    
    // For letter in word
    for (let j = 1; j < 5; j++) {

        // Slice word to get all letters up to but not including the current letter
        let previousLetters = words[i].slice(0, j);

        // If the current letter is included in the previousLetters string
        if (previousLetters.includes(words[i][j])) {
            // Add the word to the repeatLetterWords array
            repeatLetterWords.push(words[i]);
        }
    } 
}

// Create array with words that are in words array but not in repeatLetterWords array
let distinctWords = words.filter(word => !(repeatLetterWords.includes(word)));

// Initialize empty array to hold all the guessScore objects
let guessScores = [];

// For each guess in words array, run scoreGuess function on the guess
// and push the resulting object to the guessScores array
distinctWords.forEach(guess => guessScores.push(scoreGuess(guess)));

// Sort guessScores array by total expected squares, then by expected green squares, descending
guessScores.sort(function (a, b) {
    
    if (a.Total_Expected_Squares > b.Total_Expected_Squares) return -1;
    if (a.Total_Expected_Squares < b.Total_Expected_Squares) return 1;

    if (a.Expected_Green_Squares > b.Expected_Green_Squares) return -1;
    if (a.Expected_Green_Squares < b.Expected_Green_Squares) return 1;
});

// For word object in guessScores array
for (let i = 0; i < guessScores.length; i++) {
    // Add a Rank element to the object based on where the object is in the array
    guessScores[i].Rank = (i + 1)
}
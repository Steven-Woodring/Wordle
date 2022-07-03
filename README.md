# Wordle Solver
### A webpage that helps Wordle players optimize their strategy and arrive at the solution.

## :globe_with_meridians: Website/Dashboard 
### [Check out the webpage!](https://steven-woodring.github.io/Wordle_Solver/)

## Overview
#### Wordle, the latest internet craze, is a daily online word game in which players have a maximum of 6 guesses to land on a specific 5-letter word. My Wordle Solver webpage identifies the 10 best starting words, scores them based on how much information they are expected to reveal to the player, and charts how well they have performed at solving past games.

<img width="572" alt="Screen Shot 2022-07-03 at 1 48 11 PM" src="https://user-images.githubusercontent.com/95303422/177051408-840e8dc9-3573-4975-8957-4f131030189b.png">

<img width="1261" alt="Screen Shot 2022-07-03 at 1 49 35 PM" src="https://user-images.githubusercontent.com/95303422/177051452-8cc7a385-035f-435e-847e-b04d88d22860.png">

#### I used D3.js to implement an automated solver into the webpage. The user must simply enter their first guess and the resulting colors of the squares, and the program will make a recommendation for the next guess. The process is repeated until the solution is discovered (hopefully within the 6-guess limit). The solver operates under the assumption that the user is playing in hard mode, in which the player cannot make a guess that excludes letters that they already know are in the word.

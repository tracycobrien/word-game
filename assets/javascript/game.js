var validLetter = false;
var wins = 0;
var losses = 0;
var correctGuesses = 0;
var currentPickCorrect = false;
var guessesRemaining = 12;
var computerWord = "";
var finalMessage = "";
var finalImage = "";
var gameOver = false;
var p = 0;
var alreadyPicked = false;
var pickedLetters = [];
var alphabet = [ "A" , "B"  , "C" , "D" , "E"  , "F"  , "G"  , "H"  , "I"  , "J"  , "K"  , "L"  , "M"  , "N" , "O" , "P"  , "Q"  , "R"  , "S"  , "T"  , "U"   , "V"   , "W"  , "X"  , "Y" , "Z"]
var computerChoice = [
    , "Arabian"
    , "QuarterHorse"
    , "Thoroughbred"
    , "TennesseeWalker"
    , "Paint"
    , "Appaloosa"
    , "MiniatureHorse"
    , "Warmblood"

];

// --Randomly chooses a choice from the word array computerChoices.
computerWord = computerChoice[Math.floor(Math.random() * computerChoice.length)];
console.log("start: " + computerWord);

// --Create a new empty array, with num of items in array matching num of letters in computer selected word.
var wordToGuess = new Array(computerWord.length);
console.log(wordToGuess);

// --Set initial display array for the word to be all empty '_' spaces.
for (var i = 0; i < wordToGuess.length; i++) {
    wordToGuess[i] = "_"
}
// console.log(wordToGuess);

// --Display initial html text at top of screen at start.
var topHtml =
    "<div class='row'>" +
    "<div class='col-sm-10 offset-sm-1'>" +
    "<br><br><h2>Horse Breed Guessing Game</h2>" +
    "<h3>Press any letter to get started!</h3>";

// --Create display html text for display of the blank word at start.
var blankLinesHtml = "<h1>"
// --Loop to build the blank '_' spaces for the length of the computer-picked word.
for (var w = 0; w < wordToGuess.length; w++) {
    blankLinesHtml = blankLinesHtml + wordToGuess[w] + " ";
}
var openingHtml = blankLinesHtml + "</h1></h4>CURRENT WORD</h4></div></div>" +
    "<div class='row'>" +
    "<div class='col-sm-6 offset-sm-2 col-md-6'>" +
    "<img id='horseBreed' src='./assets/images/horsebarn.jpeg'>" +
    "</div>" +
    "</div>";
finalImage = "<img id='horseBreed' src='./assets/images/horsebarn.jpeg'>";
// --Print to the screen the first lines and blank word.
document.querySelector("#game").innerHTML = topHtml + openingHtml;

// --The user presses a key.
document.onkeyup = function (event) {

    // --Determines which key was pressed.
    var userGuess = event.key;

    // --Reset some indicators.
    validLetter = false;
    currentPickCorrect = false;

    // --Set the computer-generated word and anything entered by the user to all uppercase.
    computerWord = computerWord.toUpperCase();
    console.log("computerWord: " + computerWord);
    userGuess = userGuess.toUpperCase();
    console.log("userGuess: " + userGuess);

    // --Check the alphabet array to see if a valid letter was chosen.
    for (var v = 0; v < alphabet.length; v++) {
        if (userGuess == alphabet[v]) {
            validLetter = true;
        }
    }
    // console.log("validLetter: " + validLetter)

    // --Only proceed if a valid letter is chosen.
    if (validLetter) {

        // --Loop through each letter of the computerWord and match against the user input userGuess.
        for (var i = 0; i < computerWord.length; i++) {
            // console.log("userGuess: " + userGuess);
            // console.log("computerWord.charAt(i): " + computerWord.charAt(i));
            // --Set indicator if a correct guess, meaning the userGuess matches one of the letters in the computer's word.
            if (userGuess == computerWord.charAt(i)) {
                currentPickCorrect = true;
                // console.log("if (userGuess == computerWord.charAt(i)): " + userGuess + ", " + computerWord.charAt(i));
                // --Check to see if this correct guess was already picked previously - if so set an indicator.
                if (wordToGuess[i] != "_") {
                    alreadyPicked = true;
                    //console.log("alreadyPicked: " + alreadyPicked);
                }
                // --Move correct guess into the array so that the letter doesn't display as blank ('_') anymore.
                wordToGuess[i] = userGuess;

                // console.log("Set wordToGuess[i] = userGuess:" + wordToGuess[i]);
                // console.log("wordToGuess: " + wordToGuess);
            }
        }

        // --If at least one letter was already incorrectly picked:
        if (pickedLetters.length > 0) {
            // --Check to see if the user input was already selected and stored in the pickedLetters array.
            // --pickedLetters array is the array holding all of the incorrect guesses already made.
            for (var z = 0; z < pickedLetters.length; z++) {
                // --Each item in the picked letter array has a letter followed by a space (for display purposes),
                // --so move just the single-charactor letter to compareLetter so it can be evaluated. 
                var compareLetter = pickedLetters[z].charAt(1);
                // console.log("DUPLICATE CHECKER LOOP");
                // console.log("alreadyPicked: " + alreadyPicked);
                // console.log("pickedLetters[z]: " + pickedLetters[z]);
                // console.log("compareLetter: " + compareLetter);
                // console.log("userGuess: " + userGuess);
                // Compare each previous incorrect letter against the user input letter, to see if it was already selected.
                if (compareLetter == userGuess) {
                    // --Letter was alreaddy selected, so set an indicator.
                    alreadyPicked = true;
                    // console.log("compareLetter == userGuess");
                    // console.log("alreadyPicked: " + alreadyPicked);
                }
            }
        }

        console.log("currentPickCorrect: " + currentPickCorrect);
        // --User input a letter that was previously selected.
        if (alreadyPicked) {
            pickResult = "You already guessed that!"
            // console.log("wordToGuess: " + wordToGuess);
        }
        // --User guessed a correct letter.
        else if (currentPickCorrect) {
            pickResult = "CORRECT!";
            // --Each letter guessed could be in the word multiple times (e.g. guessing P for apple has 2 P's).
            for (var d = 0; d < computerWord.length; d++) {
                if (userGuess == computerWord.charAt(d))
                    // --Increment counter to know how many total letters have actually been guessed in the word, for use later.
                    correctGuesses++;
                // console.log("correctGuesses: " + correctGuesses);
            }
        }
        // --User guess was incorrect, remove one remaining guess.
        else {
            pickResult = "WRONG!";
            // --Remove one remaining guess.
            guessesRemaining--;
            // --Move the incorrect guess to the array holding all of the incorrect guesses so far.
            pickedLetters[p] = " " + userGuess;
            // console.log("pickedLetters[p]: " + pickedLetters[p]);
            // console.log("pickedLetters: " + pickedLetters);
            // --Increment index p so pickedLetters array is ready to accept the next incorrect guess.
            p++;
            // console.log("wordToGuess[i]: " + wordToGuess[i]);
            // console.log("userGuess: " + userGuess);
        }

        // --A few lines ago the total letters have actually been guessed in the word were set, so now use that values to
        // --be able to see if all of the letters in the word have been guessed. If they have, process winning logic.
        if (correctGuesses >= computerWord.length) {
            finalMessage = computerWord + ": YOU WIN!!!!!";
            // --Show horse picture.
            finalImage = "<img id='horseBreed' src='./assets/images/" + computerWord.toLowerCase() + ".jpg'>";
            // --Add one to number of wins.
            wins++;
            // --Set indicator for game over, to be used later.
            gameOver = true;
            // --Reset initial display array for the word to be all blank '_' spaces again.
            for (var i = 0; i < wordToGuess.length; i++) {
                wordToGuess[i] = "_"
            }
            // console.log(wordToGuess);
        }
        // --No more guesses remain, so losing logic.
        else if (guessesRemaining <= 0) {
            finalMessage = computerWord + ": YOU LOSE!";
            // --Show horse picture.
            finalImage = "<img id='horseBreed' src='./assets/images/" + computerWord + ".jpg'>";
            // --Add one to number of loses.
            losses++;
            // --Set indicator for game over, to be used later.
            gameOver = true;
            // --Reset initial display array for the word to be all blank '_' spaces again.
            for (var i = 0; i < wordToGuess.length; i++) {
                wordToGuess[i] = "_"
            }
            //console.log(wordToGuess);
        }
        // console.log("finalMessage: " + finalMessage);
        // console.log("correctGuesses: " + correctGuesses);
        // console.log("guessesRemaining: " + guessesRemaining);
        // console.log("pickResult: " + pickResult);
        // console.log("gameOver: " + gameOver)
        // console.log("Wins: " + wins);
        // console.log("Losses: " + losses);

        // --Write out the final displays:

        // --The game is over, so write out all blank '_' again so the refreshed word is ready and displayed to play again.
        var linesHtml = "<h1>"
        for (var w = 0; w < wordToGuess.length; w++) {
            linesHtml = linesHtml + wordToGuess[w] + " ";
        }
        linesHtml = linesHtml + "</h1></h4>CURRENT WORD</h4>";

        // --The rest of the final displays, showing result and the team pic, plus overall wins and losses.
        var mainHtml =
            "<div class='row'>" +
            "<div class='col-sm-6 col-md-4'>" +
            finalImage +
            "</div>" +
            "<div class='col-sm-8 col-md-4'>" +
            "<br><h1>" + pickResult + "</h1>" +
            "<h2>You picked:</h2><h2>" + pickedLetters + "</h2>" +
            "<br><h2>Guesses remaining: " + guessesRemaining + "</h2>" +
            "<h2>Wins: " + wins + "</h2>" +
            "<h2>Losses: " + losses + "</h2>" +
            "<h1>" + finalMessage + "</h1>" +
            "</div>" +
            "<div class='col-sm-6 col-md-4'>" +
            finalImage +
            "</div>" +
            "</div>"


        document.querySelector("#game").innerHTML = topHtml + linesHtml + mainHtml;


    }

    // --Reset this indicator for the next game.
    alreadyPicked = false;

    // --Reset some more indicators and write out the next word and screen for the next game.
    if (gameOver) {
        validLetter = false;
        correctGuesses = 0;
        currentPickCorrect = false;
        guessesRemaining = 12;
        computerWord = "";
        gameOver = false;
        p = 0;
        pickedLetters = [];

        // --Randomly chooses from the word array computerChoices. Same logic as directly above and also in beginning.
        computerWord = computerChoice[Math.floor(Math.random() * computerChoice.length)];
        console.log("start: " + computerWord);

        // --Create a new empty array, with num of items in array matching num of letters in computer selected word.
        wordToGuess = new Array(computerWord.length);
        console.log(wordToGuess);

        // --Set initial display array for the word to be all empty '_' spaces.
        for (var i = 0; i < wordToGuess.length; i++) {
            wordToGuess[i] = "_"
        }
        console.log("At end, wordToGuess: " + wordToGuess);
        // --Create display html text for display of blank word at start.
        var blankLinesHtml = "<h2>"
        for (var w = 0; w < wordToGuess.length; w++) {
            blankLinesHtml = blankLinesHtml + wordToGuess[w] + " ";
        }

        var linesHtml = "<h1>"
        for (var w = 0; w < wordToGuess.length; w++) {
            linesHtml = linesHtml + wordToGuess[w] + " ";
        }
        linesHtml = linesHtml + "</h1></h4>CURRENT WORD</h4>";

        var mainHtml =
            "<div class='row'>" +
            "<div class='col-sm-6'>" +
            finalImage +
            "</div>" +
            "<div class='col-sm-8'>" +
            "<br><h1>" + pickResult + "</h1>" +
            "<h3>You picked:</h3><h3>" + pickedLetters + "</h3>" +
            "<br><h2>Guesses remaining: " + guessesRemaining + "</h2>" +
            "<h2>Wins: " + wins + "</h2>" +
            "<h2>Losses: " + losses + "</h2>" +
            "<h1>" + finalMessage + "</h1>" +
            "</div>" +
            "<div class='col-sm-6'>" +
            finalImage +
            "</div>" +
            "</div>"

        document.querySelector("#game").innerHTML = topHtml + linesHtml + mainHtml;
        finalMessage = " ";

    }

};
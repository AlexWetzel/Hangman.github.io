//Each word from the word list will be split into an array of its letters, and stored in another array
function fragmentWords(){
	for (var i = 0; i < wordList.length; i++) {
		words.push([]);
		for (var j = 0; j < wordList[i].length; j++) {
			var letter = wordList[i].charAt(j);
			words[i].push(letter);
		}
		console.log(words[i]);
	}
}

//The next word in the list is selected, the round count goes up, and the guesses and pile gets erased
function nextRound(round){
	round++;
	board = makeBlank(words[round-1].length);
	guess = [];
	pile = [];
	return round;
}


//The word list is sorted into a random order
function randomSort() {
    words.sort(function(a, b){return 0.5 - Math.random()});
}

//This function creates an array filled with the same number of underscores as letters in the chosen word
function makeBlank(length){
	var blank = [];
	for (var i = 0; i < length; i++) {
		blank.push("_");
	}
	return blank;
}

//The pressed key is checked to see if it is in the word
function checkIndex(arr, val){
	return arr.indexOf(val);
}

//This will get every instance of the selected letter and fill the letter in its corresponding position
function fillBoard(arr, val){
   i = -1;
   while ((i = arr.indexOf(val, i+1)) != -1){
        board[i] = val;
   }
}

//When the game starts, the turn count is set to: 10. Win count and loss count are set to 0. Round is set to 1.	
//Round is equal to the index of the active word minus 1.
var round = 0;
var win = 0;
var loss = 0;
var turn = 10;

//This is used to pause before/after a round.
var stop = 1;

//Guess includes every letter, pile includes incorrect letters. The pile is what gets displayed.
var guess = [];
var pile = [];
var board = [];

var wordList = [
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"indigo",
	"violet"
];

//Empty array for storing "fragmented" words
var words = [];

//When the user opens the page, the word list is randomized.
//The program chooses the first word in the list, and the board is filled with underscores to show blank spaces.
fragmentWords();
randomSort(words);
// var board = makeBlank(words[round-1].length);
// document.getElementById("letters").innerHTML = board.join(" ");

//The user inputs a key, the game checks if the letter is in the selected word.

	console.log("Round: "+ round +"; Turn: " + turn + "; win: " + win + "; Loss: " + loss)
	console.log("Pile:" + pile);
	console.log("Guesses: " + guess);
	console.log(words[round-1]);

document.getElementById("round").innerHTML = round;
document.getElementById("message").innerHTML = "Press any key to start!"


document.onkeyup = function(event) {

	document.getElementById("message").innerHTML = " ";

	if (stop === 1) {
		stop = 0;
		turn = 10;
		round = nextRound(round);
		document.getElementById("letters").innerHTML = board.join(" ");
		document.getElementById("guess").innerHTML = pile;		
	}
	else {
		var letter = event.key;

		// var check = checkIndex(words[round-1], letter);

		//Check if the user repeats a guess
		if (guess.indexOf(letter) === -1) {

			guess.push(letter);

			//If the letter is not in the word, the board stays the same, the guessed letter goes in the pile, and the number of turns goes down by 1.
			//If there are 0 turns left and there are still blank spaces, the user loses the round, and their loss count goes up by 1.
			if (words[round-1].indexOf(letter) === -1){
				pile.push(letter);
				turn--;

				document.getElementById("guess").innerHTML = pile;

				//A bad guess will never result in a win, so the game checks the number of turns to decide whether to end the round.
				if (turn <= 0){
					document.getElementById("message").innerHTML = "Game Over";			
					// round = nextRound(round);
					// turn = 10;
					loss++;
					stop = 1;
				}
			}

			//If the letter is in the word, the game finds every instance of the letter in the word,
			// and overwrites the corresponding blank spaces.
			else {
				fillBoard(words[round-1], letter);

				//Once the blank spaces are filled in (if no underscores are detected), the user wins that wound, increasing their win count by 1.
				if (board.indexOf("_") === -1){
					document.getElementById("message").innerHTML = "You Win!";
					// round = nextRound(round);
					// turn = 10;
					win++;
					stop = 1;	
				}
			}
		}
	
	//If the user repeats a guess, they are told, and the turn count does not change.
		else {
			document.getElementById("message").innerHTML = "You already guessed that";
		}
	}
	document.getElementById("letters").innerHTML = board.join(" ");

	document.getElementById("tally").innerHTML = "Wins:" + win + "    Losses: " + loss + "      Guesses Remaining: " + turn;

	console.log("Round: "+ round +"; Turn: " + turn + "; win: " + win + "; Loss: " + loss)
	console.log("Pile:" + pile);
	console.log("Guesses:" + guess);
	console.log(words[round-1]);
	
}


//At the start of the next round, the next word is chosen, and the bord is made blank again.
//The turn count is reset to 10, and the round number goes up by 1. 
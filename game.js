// #2-3 create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow"
var buttonColours = ["red", "blue", "green", "yellow"];

// #2-5 create a new empty array called gamePattern
var gamePattern = [];

// #4-3 create a new empty array with the name userClickedPattern
var userClickedPattern = [];

var started = false;

// #7-2 create a new variable called level and start at level 0
var level = 0;

// #7-1 detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence()
$(document).keypress(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

// #4-1 detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function () {
	// #4-2 create a new variable called userChosenColour to store the id of the button that got clicked
	var userChosenColour = $(this).attr("id");

	// #4-4 add the contents of the variable userChosenColour created in step #4-2 to the end of this new userClickedPattern
	userClickedPattern.push(userChosenColour);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	// #8-2 Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
	checkAnswer(userClickedPattern.length - 1);
});

// #8-1 create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
	// #8-3 Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		// #8-4 If the user got the most recent answer right in step #8-3, then check that they have finished their sequence with another if statement.
		if (userClickedPattern.length === gamePattern.length) {
			// #8-5 call nextSequence() after a 1000 millisecond delay
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		// #9-1 In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
		playSound("wrong");

		// #9-2a apply class "game-over" to the body of the website when the user gets one of the answers wrong
		$("body").addClass("game-over");

		// #9-3 Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
		$("#level-title").text("Game Over, Press Any Key to Restart");

		// #9-2b remove class "game-over" after 200 milliseconds.
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		// #10-2 Call startOver() if the user gets the sequence wrong.
		startOver();
	}
}

// #2-1 create a new function called nextSequence()
function nextSequence() {
	// #8-6 Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
	userClickedPattern = [];

	// #7-3 the h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level x"
	level++;
	$("#level-title").text("Level " + level);

	// #2-2 create a new random number generator between 0 and 3, and store it in a variable called randomNumber
	var randomNumber = Math.floor(Math.random() * 4);

	// #2-4 create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array
	var randomChosenColour = buttonColours[randomNumber];

	// #2-6 add the new randomChosenColour generated in step #2-4 to the end of the gamePattern
	gamePattern.push(randomChosenColour);

	// #3-1 select the button with the same id as the randomChosenColour
	// #3-2 animate a flash to the button selected in step #3-1
	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);

	// #3-3 play the sound for the button colour selected in step #3-1
	// #5-1 In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played
	playSound(randomChosenColour);
}

// #6-1 create a new function called animatePress(), it should take a single input parameter called currentColour
function animatePress(currentColor) {
	// #6-3 add pressed class to the button that gets clicked inside animatePress()
	$("#" + currentColor).addClass("pressed");

	// #6-4 remove pressed class to the button after 100ms
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}

// #5-2 create a new function called playSound() that takes a single input parameter called name
function playSound(name) {
	// #5-3 play the sound for the selected button colour
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

// #10-1 Create a new function called startOver()
function startOver() {
	// #10-3 Inside this function, you'll need to reset the values of level, gamePattern and started variables
	level = 0;
	gamePattern = [];
	started = false;
}

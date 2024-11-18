const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

// Detect keypress to start the game
$(document).keypress(function () {
    if (!started) {
        level = 0;
        gamePattern = [];
        nextSequence();
        started = true;
    }
});

// Handle user button clicks
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
});

function checkAnswer() {
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        gameOver();
    }
}

// Generate the next sequence
function nextSequence() {
    level++;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);

    // Generate a random color and animate it
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);

    playSound(randomChosenColor);
}

// Play sound for a given button color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Add and remove "pressed" class for animations
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 200);
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started = false;
}

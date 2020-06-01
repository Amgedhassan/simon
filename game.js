var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
/////////////////////////////////// KEY PRESS ///////////////////////////////////////////////
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
})
/////////////////////////////////// CHECK ANSWER ///////////////////////////////////////////////
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }


    } else {
        console.log("wrong");
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        startOver();
        $("#level-title").text("Game over , Press any key to start");

    }
}
/////////////////////////////////// MAIN FUNCTION ///////////////////////////////////////////////
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);

}
/////////////////////////////////// CHOOSE COLOR ///////////////////////////////////////////////
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makeSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});
/////////////////////////////////// SOUND AND ANIMATION ///////////////////////////////////////////////
function makeSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).on("click", function () {
        $("#" + currentColour).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed")
        }, 100);
    })
}
/////////////////////////////////// START AGAIN ///////////////////////////////////////////////
function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}

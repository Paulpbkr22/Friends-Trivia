$(document).ready(function() {



    

    // array with questions and answers
    var questions = [{
        question: "Why did Monica lose weight?",
        choice: ["Her mom called her fat", "Ross called her fat", "The camera adds ten pounds", "Chandler caller her fat",],
        answer: 3,
        pic: "/Examples/Trivia-Practice/assets/images/fat.jpg",
    },
    {
        question: "Who did Rachel leave at the altar?",
        choice: ["Ross", "Barry", "Emily", "Obama"],
        answer: 1,
        pic: "/Examples/Trivia-Practice/assets/images/barry.jpg",
    },
    {
        question: "What figure was on the Geller Cup?",
        choice: ["Barbie", "G.I. Joe", "Troll Doll", "Obama"],
        answer: 2,
        pic: "/Examples/Trivia-Practice/assets/images/gellercup.jpg",
    },
    {
        question: "Who pees on Monicas' foot?",
        choice: ["Chandler", "Joey", "Bonnie", "Obama"],
        answer: 0,
        pic: "/Examples/Trivia-Practice/assets/images/jellyfish.jpg",
    },
    {
        question: "What does the group use a bunch of to poke the ugly naked guy?",
        choice: ["Chop Sticks", "Wire", "Popsicle Sticks", "Sandwiches"],
        answer: 0,
        pic: "/Examples/Trivia-Practice/assets/images/chopstick.jpg"
    },
    {
        question: "Where does Joey hide The Shining when he gets scared?",
        choice: ["Closet", "Cabinet", "Freezer", "Foosball Table"],
        answer: 2,
        pic: "/Examples/Trivia-Practice/assets/images/freezer.jpg"
    },
    {
        question: "What does Joey get Chandler for his 30th Birthday?",
        choice: ["Lemon-Lime Soda", "A hug", "A Meatball Sub", "A hooker"],
        answer: 1,
        pic: "/Examples/Trivia-Practice/assets/images/hug.jpg"
    },
    {
        question: "What comic book does Phoebe steal from Ross?",
        choice: ["Dinosaur-Man", "Spider-Man", "Geology Rocks!", "Science-Boy"],
        answer: 3,
        pic: "/Examples/Trivia-Practice/assets/images/scienceboy.jpg"
    },
    {
        question: "What does Ross keep yelling when moving his couch?",
        choice: ["Turn", "Pivot", "Switch", "Rotate"],
        answer: 1,
        pic: "/Examples/Trivia-Practice/assets/images/pivot.jpg",
    }];


    var intervalId;
    var timer = 15;
    var qCount = questions.length;
    var userGuess = "";
    var running = false;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();

    $("#start").on("click", function() {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })

    function runTimer() {
        if(!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }


    function decrement() {
        $("#timeLeft").html("<h3>Time Remaining: " + timer + "</h3>");
        timer --;


        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerBlock").html("<p>Out of time! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidePicture();
        }
    }


    function stop() {
        running = false;
        clearInterval(intervalId);
    }


    function displayQuestion() {

        index = Math.floor(Math.random()*questions.length);
        pick = questions[index];



        $("#questionBlock").html("<h2>" + pick.question + "</h2>");

        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerChoice");
            userChoice.html(pick.choice[i]);


            userChoice.attr("data-guessvalue", i);
            $("#answerBlock").append(userChoice);

        }
    


    $(".answerChoice").on("click", function() {

        userGuess = parseInt($(this).attr("data-guessvalue"));


        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess = "";
            $("#answerBlock").html("<p>Correct!</p>");
            hidePicture();
            // displayQuestion();

        } else {
            stop();
            wrongCount++;
            userGuess = "";
            $("#answerBlock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidePicture();
            // displayQuestion();
        }
    })
}

    function hidePicture() {
        $("#answerBlock").append("<img src =" + pick.pic + ">");
        newArray.push(pick);
        questions.splice(index, 1);


        var hidePic = setTimeout(function() {
            $("#answerBlock").empty();
            timer = 15;


            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionBlock").empty();
		        $("#questionBlock").html("<h3>Game Over!  Here's how you did: </h3>");
		        $("#answerBlock").append("<h4> Correct: " + correctCount + "</h4>" );
		        $("#answerBlock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		        $("#answerBlock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		        $("#reset").show();
		        correctCount = 0;
		        wrongCount = 0;
		        unanswerCount = 0;
            } else {
                runTimer();
                displayQuestion();

            }
        
        }, 2000);
    }




    $("#reset").on("click", function() {
        $("#reset").hide();
	    $("#answerBlock").empty();
	    $("#questionBlock").empty();
	    for(var i = 0; i < holder.length; i++) {
		questions.push(holder[i]);
	}
	    runTimer();
	    displayQuestion();
    })


})
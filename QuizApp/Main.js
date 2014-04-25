
var quiz = {
    questions: [
        {
            question: "Which of the following is NOT a programming language",
            choices: [
                {
                    Option: "PHP",
                    Answer: false
                },
                {
                    Option: "JavaScript",
                    Answer: false
                },
                {
                    Option: "AJAX",
                    Answer: true
                },
                {
                    Option: "jQuery",
                    Answer: false
                }
            ],
            status: "Not Taken",
            points: 20
        },
        {
            question: "What does CSS stand for",
            choices: [
                {
                    Option: "Cool Satin Sheets",
                    Answer: false
                },
                {
                    Option: "Centralized showing service",
                    Answer: false
                },
                {
                    Option: "Comcase Sports Security",
                    Answer: false
                },
                {
                    Option: "Cascading Style Sheet",
                    Answer: true
                }
            ],
            status: "Not Taken",
            points: 20
        },
         {
             question: "Which option sets the background color",
             choices: [
                 {
                     Option: "color",
                     Answer: false
                 },
                 {
                     Option: "background",
                     Answer: false
                 },
                 {
                     Option: "backgroud-color",
                     Answer: true
                 },
                 {
                     Option: "display: inline",
                     Answer: false
                 }
             ],
             status: "Not Taken",
             points: 20
         },
          {
              question: "How do you assign a number to a variable",
              choices: [
                  {
                      Option: "variable: 5",
                      Answer: false
                  },
                  {
                      Option: "var = [5]",
                      Answer: false
                  },
                  {
                      Option: "var number = 5",
                      Answer: true
                  },
                  {
                      Option: "variable == 5",
                      Answer: false
                  }
              ],
              status: "Not Taken",
              points: 20
          },
           {
               question: "How do you call a function named calcInterest with an alert",
               choices: [
                   {
                       Option: "alert.calcInterest()",
                       Answer: false
                   },
                   {
                       Option: "alert(calcInterest());",
                       Answer: true
                   },
                   {
                       Option: "console.log(calcInterest)",
                       Answer: false
                   },
                   {
                       Option: "document.write(calcInterest)",
                       Answer: false
                   }
               ],
               status: "Not Taken",
               points: 20
           }
    ],

}

////TryOut Using constructor is a more compact but we will do the later during  refactor.

//var qQuestion = function (questi, choics, status, points) {
//    this.question = questi;
//    this.choice = choics;
//    this.status = status;
//    this.points = points;
//};


//var QuestionOne = new qQuestion("string", [1, 2, 3]);
//var QuestionTwo = new qQuestion();
//var QuestionThree = new qQuestion();
//var QuestionFour = new qQuestion();
//var QuestionFive = new qQuestion();

//find something

var button = $("#start");
var question = $("#question");
var choices = $("#choices");
var nextBtn = $("#next");
var fiftyButton = $("#fifty");
var cheatButton = $("#cheat");
var count = 0;
var progressBar = $("#progress");
var Points = 0;

var showQuestions = function () {
    //Get Questions
    var random = Math.floor(Math.random() * quiz.questions.length);

    var quizQuestion = quiz.questions[random].question;
    var quizAnswers = quiz.questions[random].choices;
    var idCount = 0;

    // Disable next button
    nextBtn.attr("disabled","disabled");

    //find h2 element and display on page
    question.html('<h2>' + quizQuestion + '</h2>');

    //Display answers on the page
    for (var i = 0; i < quizAnswers.length; i++) {
        idCount += 1;
        choices.append('<li id="' + idCount + '" onclick="rightOrWrong(' + quizAnswers[i].Answer + ',' + idCount + ');" class="well" data-option=' + quizAnswers[i].Answer + '>' + quizAnswers[i].Option + '</li>')
    }

    quiz["questions"][count]["status"] = "Taken";

    //Set Progress bar
    count += 1;
    progressBar.attr("value", count);
}

var startQuiz = function () {
    button.remove();
    question.removeClass("hidden");
    choices.removeClass("hidden");
    nextBtn.removeClass("hidden");
    progressBar.removeClass("hidden");
    fiftyButton.removeClass("hidden");
    cheatButton.removeClass("hidden");

    showQuestions();
};

var nextQuestion = function () {
    var remainingQuestions = [];
    var quizQuestion;
    var idCount = 0;

    nextBtn.attr("disabled", "disabled");
    fiftyButton.removeAttr("disabled");

    //Find all the questions that are not taken and put them into an array
    for (var i = 0; i < quiz["questions"].length; i++) {
        if (quiz.questions[i].status !== "Taken") {
            remainingQuestions.push(quiz.questions[i]);
        }
    }

    //If the there are any remaining questions pick the first one else Finish
    if (remainingQuestions.length > 0) {
        quizQuestion = remainingQuestions[0].question;
    } else {
        alert("Your Score " + Points + "%");
        console.log("done");
        return "done";
    }
    question.html('<h2>' + quizQuestion + '</h2>');
    choices.html(" ");

    //loop through the choices for the given question and put them on the page.
    for (var i = 0; i < remainingQuestions[0]["choices"].length; i++) {
        idCount += 1;
        choices.append('<li id ="' + idCount + '" onclick="rightOrWrong(' + remainingQuestions[0]["choices"][i]["Answer"] + ',' + idCount + ');" class="well" data-option=' + remainingQuestions[0]["choices"][i]["Answer"] + '>' + remainingQuestions[0]["choices"][i]["Option"] + '</li>')
    }

    quiz.questions[count]["status"] = "Taken";

    count += 1;
    progressBar.attr("value", count);
};

var rightOrWrong = function (boolean, choiceID) {
    listItems = document.getElementsByTagName("li");

    if (boolean) {
        document.getElementById(choiceID).setAttribute("class", "well correct");

        //give the tester thier points
        for (var i = 0; i < listItems.length; i++) {
            listItems[i].removeAttribute("onclick");
        }
        fiftyButton.attr("disabled", "disabled");
        nextBtn.removeAttr("disabled", "enable");
        Points += 20;
        
    } else {
        document.getElementById(choiceID).setAttribute("class", "well wrong");
        //0 points

        for (var i = 0; i < listItems.length; i++) {
            listItems[i].removeAttribute("onclick");
        }
        fiftyButton.attr("disabled","disabled")
        nextBtn.removeAttr("disabled", "enable");
    }
};

var narrowChoices = function () {
    listItems = document.getElementsByTagName("li");
    var falseAnswers = []
    var trueAnswer;
    var option2;

    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].getAttribute("data-option") == "false") {
            falseAnswers.push(listItems[i]);
            listItems[i].setAttribute("class", "blacken well");
            listItems[i].setAttribute("disabled", "disabled");
        } else {
            trueAnswer = listItems[i];
            listItems[i].setAttribute("class", "blacken well");
            listItems[i].setAttribute("disabled", "disabled");
        }
    }

    option2 = falseAnswers[Math.floor(Math.random() * falseAnswers.length)];

    trueAnswer.removeAttribute("disabled");
    trueAnswer.setAttribute("class", "well");
    option2.removeAttribute("disabled");
    option2.setAttribute("class", "well");

    console.log(falseAnswers);
};

//cheat button show answer
var showAnswer = function () {
    var listItems = document.getElementsByTagName("li");

    for (var i = 0; i < listItems.length; i++) {
        if (listItems[i].getAttribute("data-option") === "false") {
            listItems[i].setAttribute("class", "well wrong");
        } else {
            listItems[i].setAttribute("class", "well correct");
        }
    }

}

//cheat button toggle 
var toggleShowAnswer = function () {
    var listItems = document.getElementsByTagName("li");

    for (var i = 0; i < listItems.length; i++) {
        listItems[i].setAttribute("class", "well");
    }

}

//do something
button.on("click", startQuiz);
fiftyButton.on("click", narrowChoices);
nextBtn.on("click", nextQuestion);

cheatButton.mouseenter(showAnswer);
cheatButton.mouseleave(toggleShowAnswer);


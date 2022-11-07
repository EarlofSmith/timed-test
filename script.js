var containerStartE1 = document.getElementById("start-container");
var containerQuestionE1 = document.getElementById("questions-container");
var containerEndE1 = document.getElementById("end-container");
var containerScoreE1 = document.getElementById("score-container");
var containerInitialsE1 = document.getElementById("initials-container");
var containerScoreResultsE1 = document.getElementById("score-results");
var scoreListE1 = document.getElementById("score-list");

var btnStartE1 = document.querySelector("#start-quiz");
var btnBackE1 = document.querySelector("#back");
var btnClearE1 = document.querySelector("#clear-scores");

var questionsE1 = document.getElementById("question");
var answerButtonsE1 = document.getElementById("answer-btns");
var timerE1 = document.querySelector("#timer");
var score = 0;
var timeleft;
var gameover;
timerE1.innerText =0;
var highScores = [];
var arrayRandomQuestions;
var questionIndex = 0;


// Questions for the quiz
var questions = [
    { q: 'Arrays in Javascript can be used to store what type of values?', 
    a: '4. all of the above', 
    choices: [{choice: '1. numbers'}, {choice: '2. booleans'}, {choice: '3. strings'}, {choice: '4. all of the above'}]
  },
  { q: 'In the code -- setinterval(time(),1000) -- what is time()?', 
    a: '1. callback function', 
    choices: [{choice: '1. callback function'}, {choice: '2. undefined'}, {choice: '3. variable'}, {choice: '4. all of the above'}]
  },
  { q: 'What syntax would call a function?', 
    a: '4. function()', 
    choices: [{choice: '1. var function'}, {choice: '2. function'}, {choice: '3. call function'}, {choice: '4. function()'}]
  },
  { q: 'What does the acronym DOM stand for?', 
    a: '1. Document Object Model', 
    choices: [{choice: '1. Document Object Model'}, {choice: '2. Digital Object Mold'}, {choice: '3. Days Over Mode'}, {choice: '4. Disply Orginal Mockup'}]
  },
  { q: 'What is getItem commonly used for?', 
    a: '2. local storage', 
    choices: [{choice: '1. adding photos'}, {choice: '2. local storage'}, {choice: '3. link to website'}, {choice: '4. naming a variable'}]
  },
 { q: 'JavaScript was invented by Brendan Eich in what year?', 
    a: '1. 1995', 
    choices: [{choice: '1. 1995'}, {choice: '2. 1987'}, {choice: '3. 2005'}, {choice: '4. 2000'}]
  },
 { q: 'Inside which HTML element do we put the javascript?', 
    a: '3. <script>', 
    choices: [{choice: '1. <h1>'}, {choice: '2. <js>'}, {choice: '3. <script>'}, {choice: '4. <head>'}]
  },
{ q: 'Which array method adds new elements to the end of an array and returns the new length?',
  a: '2. push()',
  choices: [{choice: '1. pop()'}, {choice: '2. push()'}, {choice: '3. map()'}, {choice: '4. join()'}]
},
];


 //if go back button is hit on high score page
 var resetQuiz = function () {
    containerScoreResultsE1.removeChild(containerScoreResultsE1.lastChild)
    questionIndex = 0
    gameover = ""
    timerE1.textContent = 0 
    score = 0
 }

//  timmer function for quiz set to 20 seconds
 var setTime = function () {
    timeleft = 20;
  
  var timercheck = setInterval(function() {
    timerE1.textContent = timeleft;
    timeleft--
  
    if (gameover) {
        clearInterval(timercheck)
    }
   
    if (timeleft < 0) {
        showScore()
        timerE1.textContent = 0
        clearInterval(timercheck)
        resetAnswers()
        questionsE1.innerText = ("You're out of time!!");
        timerE1.style.color = 'red';

    }
  
    }, 1000)
  }

  var startGame = function() {

    // resetQuiz
    //Shuffle the questions so they show in random order
    arrayRandomQuestions = questions.sort(() => Math.random() - 0.5)
    setTime()
    gitQuestion()
  }
// show question
  var gitQuestion = function() {
    resetAnswers()
    showQuestions(arrayRandomQuestions[questionIndex])
  }
//   clear buttons
  var resetAnswers = function() {
    while (answerButtonsE1.firstChild) {
        answerButtonsE1.removeChild(answerButtonsE1.firstChild)
    };
  };
// show the questions index as well as creates the answer buttons
  var showQuestions = function(index) {
    questionsE1.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", answerCheck)
        answerButtonsE1.appendChild(answerbutton)
    }
  }
// check for correct answers
  var answerCheck = function(event) {
    var userPick = event.target
        if(arrayRandomQuestions[questionIndex].a === userPick.innerText){
            // correct answer
            score = score + 20
            timeleft = timeleft +5;
        } else {
            // wrong answer
            score = score -5;
            timeleft = timeleft -5;
        };
        // get shuffled questions and displys them till they are done then ends game.
        questionIndex++
            if (arrayRandomQuestions.length > questionIndex + 1) {
                gitQuestion()
            } else {
                gameover = "true";
                showScore()
                resetAnswers()
                questionsE1.innerText = ("Quiz Complete!!")
            }
  }
  // shows users score
  var showScore = function() {
    var userScore = document.createElement("p");
    userScore.innerText = ("Your score is " + score + "!");
    containerScoreResultsE1.appendChild(userScore);
  }
// creates scores and stops page from clearing. prompts aleart if noting is entered
  var createScore = function(event) {
    event.preventDefault()
    var initials =document.querySelector("#initials").value;
    if (!initials) {
        alert("Please enter your initials!");
        return;
    }

    containerInitialsE1.reset();

    var highScore = {
        initials: initials,
        score: score
    }

// push and sort highscores
    highScores.push(highScore);
    highScores.sort((a,b) => {return b.score-a.score});

    while (scoreListE1.firstChild) {
        scoreListE1.removeChild(scoreListE1.firstChild)
    }
    // creates elements in order of scores
    for (var i = 0; i< highScores.length; i++) {
        var highScoreEl = document.createElement("li");
        highScoreEl.className = "score";
        highScoreEl.innerHTML = highScores[i].initials + " - " + highScores[i].score;
        scoreListE1.appendChild(highScoreEl);
    }

  }

// delete high scores
  var clearScore = function() {
    highScores = [];
    while (scoreListE1.firstChild) {
        scoreListE1.removeChild(scoreListE1.firstChild);
    }

    localStorage.clear(highScores)
  }
//   start button
  btnStartE1.addEventListener("click", startGame,)
//   reset button
  btnBackE1.addEventListener("click", resetQuiz )
// submit button for initials
  containerInitialsE1.addEventListener("submit", createScore)
// delete high scores button
  btnClearE1.addEventListener("click", clearScore)


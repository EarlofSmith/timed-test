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
    choices: [{choice: '1. adding drama'}, {choice: '2. local storage'}, {choice: '3. online shopping'}, {choice: '4. naming a variable'}]
  },
 { q: 'JavaScript was invented by Brendan Eich in what year?', 
    a: '1. 1995', 
    choices: [{choice: '1. 1995'}, {choice: '2. Roaring twenties'}, {choice: '3. 2005'}, {choice: '4. 2000'}]
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
    containerScoreE1.classList.add("hide")
    containerScoreE1.classList.remove("show")
    containerStartE1.classList.remove("hide")
    containerStartE1.classList.add("show")
    containerScoreResultsE1.removeChild(containerScoreResultsE1.lastChild)
    questionIndex = 0
    gameover = ""
    timerE1.textContent = 0 
    score = 0
 }

//  timmer function for quiz set to 60 seconds
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
        questionsE1.innerText = ("You're out of time!!")

    }
  
    }, 1000)
  }

  var startGame = function() {
    //add classes to show/hide start and quiz screen
    // containerStartE1.classList.add('hide');
    // containerStartE1.classList.remove('show');
    // containerQuestionE1.classList.remove('hide');
    // containerQuestionE1.classList.add('show');
    resetQuiz
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
  var correct = function(){};
  var wrong = function(){};

  var answerCheck = function(event) {
    var userPick = event.target
        if(arrayRandomQuestions[questionIndex].a === userPick.innerText){
            correct()
            score = score + 20
            timeleft = timeleft +5;
        } else {
            wrong()
            score = score -5;
            timeleft = timeleft -5;
        };
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
  
  var showScore = function() {
    // containerQuestionE1.classList.add("hide");
    // containerEndE1.classList.remove("hide");
    // containerEndE1.classList.add("show");

    var userScore = document.createElement("p");
    userScore.innerText = ("Your score is " + score + "!");
    containerScoreResultsE1.appendChild(userScore);
  }

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

    saveScore();
    // displayScore();
  }
// saves score to local storage
  var saveScore = function() {
    localStorage.setItem("highScores", JSON.stringify(highScores))
  }

  var clearScore = function() {
    highScores = [];
    while (scoreListE1.firstChild) {
        scoreListE1.removeChild(scoreListE1.firstChild);
    }

    localStorage.clear(highScores)
  }
  btnStartE1.addEventListener("click", startGame)
  btnBackE1.addEventListener("click", resetQuiz )
  containerInitialsE1.addEventListener("submit", createScore)
  btnClearE1.addEventListener("click", clearScore)


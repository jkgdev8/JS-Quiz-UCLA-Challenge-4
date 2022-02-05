const quizChallengePage = document.querySelector(".quizChallengePage");
const startBtn = document.querySelector("#startBtn");

const quizQuestionsPage = document.querySelector("#quizQuestionsPage");
const quizQuestionHeader = document.querySelector("#quizQuestionHeader");
const choice1 = document.getElementById("one");
const choice2 = document.getElementById("two");
const choice3 = document.getElementById("three");
const choice4 = document.getElementById("four");

const answerResponse = document.querySelector("#answerResponse");
const finalScorePage = document.querySelector(".finalScorePage");
const finalScoreIs = document.querySelector("#finalScoreIs");

const hrDiv = document.getElementById('div-hr');
const hrElem = document.createElement('HR');
let arrayOfHighscores = localStorage.getItem("saveUserScoreLocal");

let secondsLeft = 75;
let startScore = 0;
let questionIndex = 0;
let timer = document.getElementById("timer");
let timerInterval;
let timerRunning = true;

const submitBtn = document.querySelector("#submitBtn");
const initials = document.querySelector("#initials");
const initialInput = document.querySelector("#initialInput");

// List of quiz questions
let quizQuestions = [
    {
        "quizQuestionHeader":"How many NBA championships does Lebron James Have 2021?",
        "one": "1. 2",
        "two": "2. 3",
        "three": "3. 4",
        "four": "4. 6",
        "correct": "3. 4",
    }, {
        "quizQuestionHeader": "Which team did NFL star Odel Beckham Jr. sign with?",
        "one": "1. Rams",
        "two": "2. Chiefs",
        "three": "3. Bucs",
        "four": "4. Packers",
        "correct": "1. Rams",
    }, {
        "quizQuestionHeader": "Whats the capital of Bolivia?",
        "one": "1. Oruro",
        "two": "2. Pando",
        "three": "3. La Paz",
        "four": "4. Cochabamba",
        "correct": "3. La Paz",
    }, {
        "quizQuestionHeader": "How many islands are there in the Phillipines in 2021?",
        "one": "1. 350",
        "two": "2. 7640",
        "three": "3. 2986",
        "four": "4. 6588",
        "correct": "2. 7640",
    }, {
        "quizQuestionHeader": "In 2021, how many total Marvel MCU movies have been made to date?",
        "one": "1. 18",
        "two": "2. 22",
        "three": "3. 30",
        "four": "4. 26",
        "correct": "4. 26",
    },
];

document.addEventListener('readystatechange', () => {
    if (document.readyState === 'interactive') {
        init();
    }
});

function init() {
    const goBackBtn = document.getElementById("goBack");
    const ol = document.getElementById('list');
    const clearHighScoreBtn = document.getElementById("clearHighScore");
    const highScoreList = document.getElementById('highScoreList');
    const scoreContainer = document.querySelector('#score-container');

    // Go back to coding quiz challenge page
    goBackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/index.html';

    });

    // clear the local storage and the list of high scores
    clearHighScoreBtn.addEventListener('click', () => {
        localStorage.clear();

        while (ol.firstChild) {
            ol.removeChild(ol.firstChild);
        }

        if (!ol.hasChildNodes()) {
            clearHighScoreBtn.disabled = true;
            scoreContainer.removeChild(highScoreList);
        }
    });

    // Create a list item and display the details for each submitted score
    arrayOfHighscores = JSON.parse(arrayOfHighscores);

    for (let i = 0; i < arrayOfHighscores.length; i++) {
        let highscoreLine = arrayOfHighscores[i];
        let li = document.createElement('li');
        li.textContent = `${i + 1}. ${highscoreLine.name} - ${highscoreLine.score}`;
        ol.appendChild(li);
    }
}

quizQuestionsPage.style.display = "none";
finalScorePage.style.display = "none";

// holder text in nav bar
timer.textContent = `Time: ${startScore}`;

function startQuiz() {
    finalScorePage.style.display = "none";
    quizChallengePage.style.display = "none";
    quizQuestionsPage.style.display = "block";

    showQuestions();

    timerInterval = setInterval(function () {
        timer.textContent = `Time: ${secondsLeft}`;
        if (timerRunning === false) {
            clearInterval(timerInterval);
        }
        if (secondsLeft === 0) {
            showFinalScore();
        } else {
            secondsLeft--;
        }
    }, 1000);
}

function showQuestions() {
    let q = quizQuestions[questionIndex];

    quizQuestionHeader.innerHTML = q.quizQuestionHeader;
    choice1.innerHTML = q.one;
    choice1.setAttribute("data-answer", q.one);
    choice2.innerHTML = q.two;
    choice2.setAttribute("data-answer", q.two);
    choice3.innerHTML = q.three;
    choice3.setAttribute("data-answer", q.three);
    choice4.innerHTML = q.four;
    choice4.setAttribute("data-answer", q.four);
}

function checkAnswer(event) {
    event.preventDefault();

    let answer = event.currentTarget.dataset.answer;
    let correctAnswer = null;
    hrElem.classList.add('hr-style');
    hrDiv.appendChild(hrElem);

    if (quizQuestions[questionIndex].correct === answer) {
        correctAnswer = answer;
    }

    if (answer === correctAnswer) {
        answerResponse.textContent = "Correct!";
    } else {
        answerResponse.textContent = "Wrong!";
        secondsLeft -= 10;

        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    }

    if (quizQuestions.length === questionIndex + 1) {
        showFinalScore();
        return;
    }

    questionIndex++;
    showQuestions();
}

function showFinalScore() {
    quizChallengePage.style.display = "none";
    quizQuestionsPage.style.display = "none";
    answerResponse.style.display = "none";
    finalScorePage.style.display = "block";
    hrDiv.removeChild(hrElem);

    if (startScore === 0 || quizQuestions.length - 1) {
        finalScoreIs.textContent = `Your final score is ${secondsLeft}`;
        timerRunning = false;
    }
}

submitBtn.textContent = "Submit";
initials.textContent = "Enter Your Initials: ";

function saveHighScores() {
    window.location.href = './score.html';
    let getInitials = initialInput.value;
    secondsLeft = secondsLeft + 1;

    localStorage.setItem("initials", getInitials);
    localStorage.setItem("secondsLeft", secondsLeft);

    let userScore = {
        name: `${getInitials}`,
        score: `${secondsLeft}`
    };

    arrayOfHighscores.push(userScore);
    localStorage.setItem("saveUserScoreLocal", JSON.stringify(arrayOfHighscores));
}

function loadHighScores() {
    if (!arrayOfHighscores) {
        arrayOfHighscores = [];
    } else {
        arrayOfHighscores = JSON.parse(arrayOfHighscores);
    }
}

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', saveHighScores);
choice1.addEventListener('click', (event) => {
    checkAnswer(event);
});

choice2.addEventListener('click', (event) => {
    checkAnswer(event);
});

choice3.addEventListener('click', (event) => {
    checkAnswer(event);
});

choice4.addEventListener('click', (event) => {
    checkAnswer(event);
});

loadHighScores();

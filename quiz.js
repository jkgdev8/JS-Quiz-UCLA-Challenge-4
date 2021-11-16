var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');


var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availbleQuestion = [];
var questions = [
    {
        question:"How many NBA championships does Lebron James Have?",
        choice1:"2",
        choice2:"3",
        choice3:"4",
        choice4:"6",
        answer:"4",
    }
    {
        question:"Which team did NFL star Odel Beckham Jr. sign with?",
        choice1:"Rams",
        choice2:"Chiefs",
        choice3:"Bucs",
        choice4:"Packers",
        answer:"Rams",
    }
    {
        question:"Whats the capital of Bolivia?",
        choice1:"Oruro",
        choice2:"Pando",
        choice3:"La Paz",
        choice4:"Cochabamba",
        answer:"La Paz",
    }
    {
        question:"How many islands are there in the Phillipines in 2021?",
        choice1:"350",
        choice2:"7640",
        choice3:"2986",
        choice4:"6588",
        answer:"7640",
    }
    {
        question:"In 2021, how many total Marvel MCU movies have been made to date?",
        choice1:"18",
        choice2:"22",
        choice3:"30",
        choice4:"26",
        answer:"26",
    }
]
var SCORE_POINTS = 100
var MAX_QUESTIONS = 5


startGame = () => {
    questionCounter = 0
    score = 0
    availbleQuestions = [...questions]
    getNewquestion()
}

getNewquestion = () => {
    if(availQuestions.length === 0 || questionsCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("/end.html")

    }

    questionCounter++
    progressText.innerText = "Question ${questionCounter} of ${MAX_QUESTIONS}"


}

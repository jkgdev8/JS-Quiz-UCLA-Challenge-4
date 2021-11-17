const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');


var currentQuestion = {};
var acceptingAnswers = true;
var score = 0
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question:"How many NBA championships does Lebron James Have?",
        choice1:"2",
        choice2:"3",
        choice3:"4",
        choice4:"6",
        answer: 3,
    },

    {
        question:"Which team did NFL star Odel Beckham Jr. sign with?",
        choice1:"Rams",
        choice2:"Chiefs",
        choice3:"Bucs",
        choice4:"Packers",
        answer: 1,
    },
    
    {
        question:"Whats the capital of Bolivia?",
        choice1:"Oruro",
        choice2:"Pando",
        choice3:"La Paz",
        choice4:"Cochabamba",
        answer: 3,
    },
    {
        question:"How many islands are there in the Phillipines in 2021?",
        choice1:"350",
        choice2:"7640",
        choice3:"2986",
        choice4:"6588",
        answer: 2,
    },
    {
        question:"In 2021, how many total Marvel MCU movies have been made to date?",
        choice1:"18",
        choice2:"22",
        choice3:"30",
        choice4:"26",
        answer: 4,
    }

]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;


startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewquestion()
}

getNewquestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("end.html")

    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true


}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? "correct" : 
        "incorrect"

        if(classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewquestion()

        }, 1000)
        
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


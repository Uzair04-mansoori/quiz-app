var questions = [
    {
        question: 'What does HTML stand for?',
        option1: 'Hyperlinks and Text Markup Language',
        option2: 'Hypertext Markup Language',
        option3: 'Home Tool Markup Language',
        correctOption: "Hypertext Markup Language"
    },
    {
        question: 'Who is making the Web standards?',
        option1: 'Google',
        option2: 'The World Wide Web Consortium',
        option3: 'Microsoft',
        correctOption: "The World Wide Web Consortium"
    },
    {
        question: 'Choose the correct HTML element for the largest heading:',
        option1: '<heading>',
        option2: '<h6>',
        option3: '<h1>',
        correctOption: "<h1>"
    },
    {
        question: 'What is the correct HTML element for inserting a line break?',
        option1: '<linebreak>',
        option2: '<br>',
        option3: '<break>',
        correctOption: "<br>"
    }
];

var getQues = document.querySelector("#ques");
var opt1 = document.querySelector("#opt1");
var opt2 = document.querySelector("#opt2");
var opt3 = document.querySelector("#opt3");

var index = 0;
var getBtn = document.getElementById('btn');

/* ───────── QUIZ FUNCTION ───────── */

function nextQues() {

    var getOptions = document.getElementsByName('ans');

    for (var i = 0; i < getOptions.length; i++) {
        getOptions[i].checked = false;
    }

    if (index >= questions.length) {
        alert("Question end");
        stopTimer();
        return;
    }

    getQues.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;

    index++;

    startTimer(); 
/* ───────── TIMER CODE ───────── */

const TIMER_MAX = 15;
let timeLeft = TIMER_MAX;
let timerID = null;

const CIRCUMFERENCE = 94.2;

function $(id) {
    return document.getElementById(id);
}

function startTimer() {
    clearInterval(timerID);

    timeLeft = TIMER_MAX;
    renderTimer();

    timerID = setInterval(() => {
        timeLeft--;
        renderTimer();

        if (timeLeft <= 0) {
            clearInterval(timerID);
            handleTimeout();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerID);
}

function handleTimeout() {

    var getOptions = document.getElementsByName('ans');

    for (var i = 0; i < getOptions.length; i++) {
        getOptions[i].checked = false;
    }

    nextQues();
}

function renderTimer() {

    const fill = $("timer-ring-fill");
    const num = $("timer-num");

    if (!fill || !num) return;

    const ratio = timeLeft / TIMER_MAX;
    const offset = CIRCUMFERENCE * (1 - ratio);

    fill.style.strokeDashoffset = offset;
    num.textContent = timeLeft;

    fill.classList.remove("warn", "danger");
    num.classList.remove("warn", "danger");

    if (timeLeft <= 5) {
        fill.classList.add("danger");
        num.classList.add("danger");
    }
    else if (timeLeft <= 8) {
        fill.classList.add("warn");
        num.classList.add("warn");
    }
}

/* ───────── START QUIZ ───────── */

nextQues();
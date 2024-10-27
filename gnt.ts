// DOM Elements
let checkAnswerButton = document.getElementById('check');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let userInput = document.getElementById('userInput');
let operatorElement = document.getElementById('operator');
let scoreElement = document.getElementById('score');
let countDownElement = document.getElementById('countDown');

// Game Variables
let userScore = 0;
let countDown = 20000; // 20 seconds
let inputted = false;

// Questions Array
let questions = [
    { num1: 5, num2: 19, operator: '+' },
    { num1: 15, num2: 3, operator: '-' },
    { num1: 7, num2: 8, operator: '*' },
    { num1: 20, num2: 5, operator: '%' },
    { num1: 10, num2: 2, operator: '/' }
];
let currentQuestionIndex = 0; // Track the current question

// Display current question
function display() {
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        input1.value = currentQuestion.num1;
        input2.value = currentQuestion.num2;
        operatorElement.innerHTML = currentQuestion.operator;
    } else {
        endGame();
    }
}

// Validate the user's answer
function validate() {
    let currentQuestion = questions[currentQuestionIndex];
    let correctAnswer = eval(`${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2}`);
    let userValue = parseFloat(userInput.value);

    if (userValue === correctAnswer) {
        userScore++;
        scoreElement.innerHTML = `Score: ${userScore}`;
        currentQuestionIndex++; // Move to the next question
        display();
    } else if (isNaN(userValue)) {
        alert('Enter a value');
    } else {
        alert(`Incorrect, it was ${correctAnswer}`);
        userScore--;
        scoreElement.innerHTML = `Score: ${userScore}`;
        currentQuestionIndex++; // Move to the next question regardless of incorrect answer
        display();
    }
    userInput.value = "";
}

// Run the countdown timer
function runInterval() {
    let timerInterval = setInterval(() => {
        countDown -= 100;
        countDownElement.innerHTML = countDown;

        if (countDown <= 0) {
            clearInterval(timerInterval);
            alert(`Game over. You scored ${userScore} points`);
            location.reload();
        }
    }, 100);
}

// End the game
function endGame() {
    alert(`Game over. You completed all questions. You scored ${userScore} points`);
    location.reload();
}

// Event Listeners
checkAnswerButton.addEventListener('click', validate);
userInput.addEventListener('keyup', (e) => {
    if (!inputted) {
        runInterval();
        inputted = true;
    }
    if (e.keyCode === 13) { // Enter key
        validate();
    }
});

// Initialize the game
display();

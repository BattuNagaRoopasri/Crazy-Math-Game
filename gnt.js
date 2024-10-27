// DOM Elements
let checkAnswerButton = document.getElementById('check');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let userInput = document.getElementById('userInput');
let operatorElement = document.getElementById('operator');
let scoreElement = document.getElementById('score');
let feedbackElement = document.getElementById('feedback');
let countDownElement = document.getElementById('countDown');

// Game Variables
let userScore = 0;
// Questions Array
let questions = [
    { num1: 5, num2: 19, operator: '+' },
    { num1: 15, num2: 3, operator: '-' },
    { num1: 7, num2: 8, operator: '*' },
    { num1: 20, num2: 5, operator: '/' },
    { num1: 10, num2: 2, operator: '%' }
];
let currentQuestionIndex = 0; // Track the current question

// Display current question
function display() {
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        input1.value = currentQuestion.num1;
        input2.value = currentQuestion.num2;
        operatorElement.innerHTML = currentQuestion.operator;
        feedbackElement.innerText = ''; // Clear feedback
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
        feedbackElement.innerText = "Correct! 🎉";
    } else if (isNaN(userValue)) {
        feedbackElement.innerText = 'Please enter a valid number.';
    } else {
        feedbackElement.innerText = `Incorrect, it was ${correctAnswer}.`;
        userScore--;
    }

    scoreElement.innerHTML = `Score: ${userScore}`;
    currentQuestionIndex++; // Move to the next question
    display();
    userInput.value = "";
}

// Run the countdown timer
function runInterval() {
    let timerInterval = setInterval(() => {
        countDown--;
        countDownElement.innerHTML = `Time: ${countDown}`;

        if (countDown <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// End the game
function endGame() {
    feedbackElement.innerText = `Game over! You scored ${userScore} points.`;
    checkAnswerButton.disabled = true; // Disable the check button
    userInput.disabled = true; // Disable input
}

// Event Listeners
checkAnswerButton.addEventListener('click', validate);
userInput.addEventListener('keyup', (e) => {
    if (!inputted) {
        runInterval();
        inputted = true;
    }
    if (e.key === 'Enter') { // Enter key
        validate();
    }
});

// Initialize the game
display();
let checkAnswerButton = document.getElementById('check');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
let userInput = document.getElementById('userInput');
let operator_element = document.getElementById('operator');
let scoreElement = document.getElementById('score');
let count_down_element = document.getElementById('countDown');
let messageElement = document.getElementById('message'); // Message element

let user_score = 0;
let count_down = 40000; // 40 seconds
let inputted = false;
let questions = [
    { num1: 5, num2: 19, operator: '+' },
    { num1: 15, num2: 3, operator: '-' },
    { num1: 7, num2: 8, operator: '*' },
    { num1: 20, num2: 5, operator: '%' },
    { num1: 10, num2: 2, operator: '/' }
];
let currentQuestionIndex = 0; // Track the current question

function display() {
    if (currentQuestionIndex < questions.length) {
        let currentQuestion = questions[currentQuestionIndex];
        input1.value = currentQuestion.num1;
        input2.value = currentQuestion.num2;
        operator_element.innerHTML = currentQuestion.operator;
        messageElement.innerHTML = ""; // Clear previous messages
    } else {
        endGame();
    }
}

function validate() {
    let currentQuestion = questions[currentQuestionIndex];
    let correct_answer = eval(`${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2}`);
    let user_value = parseFloat(userInput.value);

    if (user_value === correct_answer) {
        user_score++;
        scoreElement.innerHTML = `Score: ${user_score}`;
        currentQuestionIndex++; // Move to the next question
        display();
    } else if (isNaN(user_value)) {
        messageElement.innerHTML = 'Please enter a valid number.';
    } else {
        messageElement.innerHTML = `Incorrect, it was ${correct_answer}.`;
        user_score--;
        scoreElement.innerHTML = `Score: ${user_score}`;
        currentQuestionIndex++; // Move to the next question regardless of incorrect answer
        display();
    }
    userInput.value = "";
}

function runInterval() {
    let timerInterval = setInterval(() => {
        count_down -= 1000;
        count_down_element.innerHTML = (count_down / 1000).toFixed(0); // Display seconds

        if (count_down <= 0) {
            clearInterval(timerInterval);
            messageElement.innerHTML = `Game over. You scored ${user_score} points.`;
            setTimeout(() => {
                location.reload();
            }, 3000); // Reload after 3 seconds
        }
    }, 1000); // Update every second
}

function endGame() {
    messageElement.innerHTML = `Game over. You completed all questions. You scored ${user_score} points.`;
    setTimeout(() => {
        location.reload();
    }, 3000); // Reload after 3 seconds
}

checkAnswerButton.addEventListener('click', validate);
userInput.addEventListener('keyup', (e) => {
    if (!inputted) {
        runInterval();
        inputted = true;
    }
    if (e.keyCode === 13) {
        validate();
    }
});

// Initialize the game
display();
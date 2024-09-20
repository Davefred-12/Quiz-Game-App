const questions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What is the color of the sky?", answer: "Blue" },
    { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
    { question: "What is the capital of Japan?", answer: "Tokyo" },
    { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" },
    { question: "What is the boiling point of water?", answer: "100°C" },
    { question: "What is the largest mammal?", answer: "Blue Whale" },
    { question: "What is the square root of 64?", answer: "8" },
    { question: "What is the fastest land animal?", answer: "Cheetah" },
    { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
    { question: "What is the capital of Australia?", answer: "Canberra" },
    { question: "What is the currency of the United States?", answer: "Dollar" },
    { question: "What is the smallest prime number?", answer: "2" },
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is the capital of Canada?", answer: "Ottawa" },
    { question: "What element does 'O' represent on the periodic table?", answer: "Oxygen" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { question: "What is the longest river in the world?", answer: "Nile" },
    { question: "What is the capital of Italy?", answer: "Rome" },
];

let currentQuestionIndex = 0;
let timeLeft = 3;
let scores = [0, 0, 0, 0, 0, 0, 0, 0];

// Background sounds
const questionSound = new Audio('question-sound.mp3');
const answerSound = new Audio('answer-sound.mp3');
const winnerSound = new Audio('winner-sound.mp3');

function startGame() {
    displayQuestion();
    startTimer();
    setupScoreInputs();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = `Question: ${currentQuestion.question}`;
    document.getElementById('answer').style.display = 'none';
    document.getElementById('next-question').style.display = 'none';
    questionSound.play();
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showAnswer();
        }
    }, 1000);
}

function showAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('answer').textContent = `Answer: ${currentQuestion.answer}`;
    document.getElementById('answer').style.display = 'block';
    document.getElementById('next-question').style.display = 'block';
    questionSound.pause();
    answerSound.play();
}

function nextQuestion() {
    timeLeft = 3;
    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        declareWinner();
    } else {
        displayQuestion();
        startTimer();
    }
}

function declareWinner() {
    const maxScore = Math.max(...scores);
    const winnerIndex = scores.indexOf(maxScore);
    alert(`Game over! The winner is Player ${winnerIndex + 1} with a score of ${maxScore}!`);
    winnerSound.play();
    resetGame();
}

function resetGame() {
    currentQuestionIndex = 0;
    scores = [0, 0, 0, 0, 0, 0, 0, 0];
    updateScoreboard();
    startGame();
}

function setupScoreInputs() {
    for (let i = 0; i < scores.length; i++) {
        const scoreInput = document.getElementById(`score-input-${i+1}`);
        if (scoreInput) {
            scoreInput.addEventListener('input', function() {
                const scoreValue = parseInt(this.value) || 0;
                scores[i] += scoreValue; // Add the new score to the existing score
                updateScoreboard();
                this.value = ''; // Clear the input field after updating the score
            });
        }
    }
}

function updateScoreboard() {
    for (let i = 0; i < scores.length; i++) {
        const scoreElement = document.querySelector(`#player-${i+1} .score`);
        if (scoreElement) {
            scoreElement.textContent = scores[i];
        }
    }
}


startGame();

function declareWinner() {
    const maxScore = Math.max(...scores);
    const winnerIndices = scores
        .map((score, index) => (score === maxScore ? index : -1))
        .filter(index => index !== -1);

    const winnerText = winnerIndices.length > 1 
        ? `It's a tie! The winners are Players ${winnerIndices.map(index => index + 1).join(", ")} with a score of ${maxScore}!`
        : `Game over! The winner is Player ${winnerIndices[0] + 1} with a score of ${maxScore}!`;

    document.getElementById('winner-text').textContent = winnerText;
    document.getElementById('winner-announcement').style.display = 'block';
    winnerSound.play();
    resetGame();
}

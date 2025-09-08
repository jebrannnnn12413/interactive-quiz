const questions = [{
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C++", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheets", correct: false },
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style System", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used for headings?",
        answers: [
            { text: "<h1> to <h6>", correct: true },
            { text: "<head>", correct: false },
            { text: "<header>", correct: false },
            { text: "<heading>", correct: false }
        ]
    },
    {
        question: "Which operator is used for assignment in JavaScript?",
        answers: [
            { text: "==", correct: false },
            { text: "=", correct: true },
            { text: "===", correct: false },
            { text: "+=", correct: false }
        ]
    },
];

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score');
const totalText = document.getElementById('total');
const restartBtn = document.getElementById('restart-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    nextBtn.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === "true";
    if (correct) score++;
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    nextBtn.style.display = 'inline-block';
}

function setStatusClass(element, correct) {
    element.classList.remove('correct', 'wrong');
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreText.innerText = score;
    totalText.innerText = questions.length;
}

restartBtn.addEventListener('click', startQuiz);

// Start the quiz on load
startQuiz();
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

//Quiz data
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Abuja"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "5", "4", "7"],
    answer: "4",
  },
  {
    question: "Which is the programming language used for Web Development?",
    options: ["Python", "Javascript", "Java", "C++"],
    answer: "Javascript",
  },
];

let currentQuestionIndex = 0;
let score = 0;

let timerInterval;
let timeLeft = 10;

// Start Quiz
startBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
});

const progressTracker = document.createElement("p");
progressTracker.id = "progress";
quizScreen.insertBefore(progressTracker, questionContainer);

//Load a question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  progressTracker.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
  questionContainer.querySelector("h3").textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => selectAnswer(button, option));
    optionsContainer.appendChild(button);
  });
  nextBtn.style.display = "none";

  resetTimer();
  startTimer();
}

function selectAnswer(button, selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }

  Array.from(optionsContainer.children).forEach((optionBtn) => {
    optionBtn.classList.add("disabled");
    optionBtn.disabled = true;

    if (optionBtn.textContent === currentQuestion.answer) {
      optionBtn.classList.add("correct");
    }
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";
  scoreDisplay.textContent = `Your score: ${score}`;
}

restartBtn.addEventListener("click", () => {
  welcomeScreen.style.display = "block";
  resultScreen.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
});

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 10;
  document.getElementById("timer").textContent = timeLeft;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoMoveToNext();
    }
  }, 1000);
}

function autoMoveToNext() {
  Array.from(optionsContainer.children).forEach((optionBtn) => {
    optionBtn.classList.add("disabled");
    optionBtn.disabled = true;
  });
  nextBtn.style.display = "block";
}


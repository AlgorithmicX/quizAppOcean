const questions = [
    {
        question: "Which of the following ocean currents is the fastest and helps regulate the climate of Western Europe?",
        answers: [
            {text: "Canary Current", correct: false},
            {text: "Gulf Stream", correct: true},
            {text: "Benguela Current", correct: false},
            {text: "California Current", correct: false},
        ]
    },
    {
        question: "What is the term for the large-scale phenomenon caused by the differences in salinity and temperature, leading to a global circulation pattern that plays a crucial role in regulating Earth’s climate?",
        answers: [
            {text: "Thermohaline Circulation", correct: true},
            {text: "Ekman Transport", correct: false},
            {text: "Upwelling", correct: false},
            {text: "El Niño-Southern Oscillation", correct: false},
        ]
    },
    {
        question: "Which of the following is the most abundant dissolved gas in the ocean?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Carbon Dioxide", correct: false},
            {text: "Nitrogen", correct: true},
            {text: "Hydrogen", correct: false},
        ]
    },
    {
        question: "The deepest part of the world's oceans is located in the Mariana Trench. What is the name of this specific point, and approximately how deep is it?",
        answers: [
            {text: "Challenger Deep, 10,994 meters (36,070 feet)", correct: true},
            {text: "Horizon Deep, 10,800 meters (35,433 feet)", correct: false},
            {text: "Sirena Deep, 10,732 meters (35,170 feet)", correct: false},
            {text: "Tonga Trench, 10,882 meters (35,702 feet)", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");

let currentQuestCount = 0;
let score = 0;

function startQuiz(){
    currentQuestCount = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestCount];
    let questionNo = currentQuestCount + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion
        .question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("buttons");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)

    });

}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect){
        selectedButton.classList.add("correct");
        score++;
    }else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestCount++;
    if(currentQuestCount < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestCount < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
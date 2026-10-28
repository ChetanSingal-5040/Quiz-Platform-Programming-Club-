let currentQuiz = null;

let currentQuestionIndex = 0;

let userAnswers = [];

function startScreen(){
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
}

function startQuiz(quizName) {

    currentQuiz = quizzes[quizName];
    selectedquiz=quizName;

    currentQuestionIndex = 0;
   userAnswers = Array(currentQuiz.questions.length).fill(-1);
    


    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("question-screen").classList.remove("hidden");
    document.getElementById("result-screen").classList.add("hidden");
    document.getElementById("quiz-title").innerText = currentQuiz.title;

    showQuestion();
}





// DISPLAY QUESTION
function showQuestion() {

    let question = currentQuiz.questions[currentQuestionIndex];
    let totalQuestions = currentQuiz.questions.length;
    

    // Display question number
    document.getElementById("progress").innerText =
        "Question " + (currentQuestionIndex + 1) + " of " + totalQuestions;

    // Display question
    document.getElementById("question-text").innerText = question.question;

    // Get options container
    let optionsContainer = document.getElementById("options-container");

    // Remove previous options
    optionsContainer.innerHTML = "";

    // Create option buttons
    for (let i = 0; i < question.options.length; i++) {

         let option= document.createElement("button");
         option.classList.add("option");
         option.innerText=question.options[i];


        // Highlight already selected answer
        if (userAnswers[currentQuestionIndex] === i) {
            option.classList.add("selected");
        }

        // Select answer when clicked
        option.addEventListener("click", function () {
            selectAnswer(i);
        });

        optionsContainer.appendChild(option);
    }


    // Previous button
    if (currentQuestionIndex === 0) {
        document.getElementById("prev-btn").style.display = "none";
    } else {
        document.getElementById("prev-btn").style.display = "inline-block";
    }

    // Next and Submit buttons
    if (currentQuestionIndex === totalQuestions - 1) {

        document.getElementById("next-btn").style.display = "none";
        document.getElementById("submit-btn").style.display = "inline-block";
        

    } else {

        document.getElementById("next-btn").style.display = "inline-block";
        document.getElementById("submit-btn").style.display = "none";
        
    }
}



// SELECT ANSWER
function selectAnswer(optionIndex) {

    userAnswers[currentQuestionIndex] = optionIndex;
    let options = document.querySelectorAll(".option");
    

    for (let i = 0; i < options.length; i++) {

        if (i === optionIndex) {
            options[i].classList.add("selected");
        } else {
            options[i].classList.remove("selected");
        }
    }
}


// NEXT QUESTION
function nextQuestion(){

    if(currentQuestionIndex<currentQuiz.questions.length-1){
        currentQuestionIndex++;
        showQuestion();
    }
}


// PREVIOUS QUESTION
function previousQuestion(){
    if(currentQuestionIndex>0){
        currentQuestionIndex--;
        showQuestion();
    }
}



// SUBMIT QUIZ
function submitQuiz() {

    let unanswered = 0;

    // Count unanswered questions
    for (let i = 0; i < userAnswers.length; i++) {

        if (userAnswers[i] === -1) {
            unanswered++;
        }
    }

    if (unanswered > 0) {

        let confirmation = confirm(
            "You have " + unanswered + " unanswered questions. Submit anyway?"
        );

        if (confirmation === false) {
            return;
        }
    }

    let score = 0;

    let totalQuestions = currentQuiz.questions.length;

    // Calculate score
    for (let i = 0; i < totalQuestions; i++) {

        if (userAnswers[i] === currentQuiz.questions[i].answer) {
            score++;
        }
    }

    let percentage = (score / totalQuestions) * 100;

    // Hide question screen
    document.getElementById("question-screen").classList.add("hidden");

    // Show result screen
    document.getElementById("result-screen").classList.remove("hidden");

    // Display score
    document.getElementById("score").innerText =
        "Your Score: " + score + " / " + totalQuestions;

    document.getElementById("percentage").innerText =
        "Percentage: " + percentage.toFixed(1) + "%";

    showReview();
}




//RESTART QUIZ
function restartQuiz(){
    startQuiz(selectedquiz);
}

// CHOOSE ANOTHER QUIZ
function goHome() {

    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("question-screen").classList.add("hidden");
    document.getElementById("result-screen").classList.add("hidden");
}

    

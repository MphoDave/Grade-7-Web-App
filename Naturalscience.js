  
// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const Img = document.getElementById("Img");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Who was the first person to use the term nanotechnology …",
        imgSrc : "images/ns.jpg",
        choiceA : "Richard feynman",
        choiceB : "Albert einsstein",
        correctC : "Gordon gloud",
		correct :"C"
    },{
        question : "A tissue paper has its thickness meansured to be o,3 mm. what is the thickness of the tissue paper in nanumeters...?",
        imgSrc : "images/ns.jpg",
        choiceA : "0,003 nm",
        choiceB : "300 nm",
        choiceC : "300 000 nm",
		correct :"B"
    },{
        question : "The word atom is a greek word meaning.....",
        imgSrc : "images/ns.jpg",
        choiceA : "small",
        choiceB : "visible",
        choiceC : "unseen",
		correct :"A"
    },{
        question : "How many naturally occaring elements exist on earth (as of 2016)......",
        imgSrc : "images/ns.jpg",
        choiceA : "94",
        choiceB : "92",
        choiceC : "118",
		correct :"C"
    },{
        question : "In which year South Africa became a democratic country?.",
        imgSrc : "images/ns.jpg",
        choiceA : "2004",
        choiceB : "1994",
        choiceC : "2014",
		correct :"B"
    },{
        question : "Rules what would be the chemical symbol for bieberium",
        imgSrc : "images/ns.jpg",
        choiceA : "Bu",
        choiceB : "BU",
        choiceC : "bu",
		correct :"C"
    },{
        question : "Soluble mel oxides are?",
        imgSrc : "images/ns.jpg",
        choiceA : "Neutral",
        choiceB : "Basic",
        choiceC : "Acidic",
		correct :"B"
    },{
        question : "What animal has the shortest lifespan of any animal on earth.",
        imgSrc : "images/ns.jpg",
        choiceA : "Dragon fly",
        choiceB : "Snake",
        choiceC : "mayfly",
		correct :"A"
    },{
        question : "If a bulb conneted between DE blows out the the ammeter reading between  AB will",
        imgSrc : "images/ns.jpg",
        choiceA :"Be zero amperes",
        choiceB : "Increase.",
		correct :"B"
    },{
        question : "Which one of the following is an egg laying mammal...?",
        imgSrc : "images/ns.jpg",
        choiceA : "Crocodile",
        choiceB : "Chicken",
        correctC : "Whale",
		correct :"B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 30; // 30s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
	
		
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
		show_alert();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
function show_alert()
{
    alert();
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "Images/ee.png" :
              (scorePerCent >= 60) ? "Images/dd.png" :
              (scorePerCent >= 40) ? "Images/cc.png" :
              (scorePerCent >= 20) ? "Images/bb.png" :
              "Images/aa.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

}
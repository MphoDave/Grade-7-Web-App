
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
		question :"People who like to be in control and be independent think and learn:_",
        imgSrc : "images/LO.jpg",
        choiceA :"Realistic",
        choiceB : "Investigative.",
		choiseC :"Enterprising",
		correct :"B",
	},{
	   question :"_____is very important to maintain a good relationship:_",
        imgSrc :"images/LO.jpg",
        choiceA :"Money",
        choiceB : "People.",
		choiseC :"communication",
		correct :"C", 
	},{
		question :"Artist career category include_",
        imgSrc : "images/LO.jpg",
        choiceA :"Draw a mind map",
        choiceB : "Do calculations.",
		choiseC :"Singing and dancing",
		correct :"C",
		
    },{
		question :"____do not come with a list of ingredients on the packaging because it will kill you or harm you.",
        imgSrc : "images/LO.jpg",
        choiceA :"Panado",
        choiceB : "illegal drugs.",
		choiseC :"alcohol",
		correct :"B",
	},{
		question :"Your_________is the social setting or surrounding you live in.",
        imgSrc : "images/LO.jpg",
        choiceA :"Culture",
        choiceB : "Religion.",
		choiceC :"Environment",
		correct :"C",
	},{
		question :"The following qualities are necessarily for a successful,long-lasting relationship.",
        imgSrc : "images/LO.jpg",
        choiceA :"Respect,honesty,love and faithfulness",
        choiceB : "Respect,wealth,faithfulness and status .",
		choiceC :"Honesty,respect,status and faithfulness",
		correct :"A",
	},{
		question :"A physical fit and healthy person should have a body-mass index.",
        imgSrc : "images/LO.jpg",
        choiceA :"16,5 and 24",
		choiceB : "19,5 and 26",
		choiceC :"18,5 and 25",
		correct :"C",
	},{
		question :"Factors that contribute to lifestyle disease include diet,sexual behaviour,",
        imgSrc : "images/LO.jpg",
        choiceA :"Physical activity and substance abuse",
        choiceB :"hypertension and cultural practices.",
		choiceC :"Cancer and cultural practices ",
		correct :"A",
	},{
		question :"It is very important to obtain a National Senior Certificate (NCS) because it gives you the opportunity to......",
        imgSrc : "images/LO.jpg",
        choiceA :"Track your progress and shows what you need to focus on ",
        choiceB : "Use your time effectively and to focus on studying .",
		choiceC :"Develop through further studies and find employment ",
		correct :"C",
	},{
		question :"One of the main benefits of an independent media in a country is that .",
        imgSrc : "images/LO.jpg",
        choiceA :"It is free to conduct propaganda and incite violence",
        choiceB : "It can freely criticize the state 's policies and activities.",
		choiseC :"All of the above ",
		correct :"C",
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
		show_alert ();
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
    let img = (scorePerCent >= 80) ? "images/ee.png" :
              (scorePerCent >= 60) ? "images/dd.png" :
              (scorePerCent >= 40) ? "images/cc.png" :
              (scorePerCent >= 20) ? "images/bb.png" :
              "images/aa.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

}
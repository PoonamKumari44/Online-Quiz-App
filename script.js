// html
// https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=uncategorized&difficulty=Easy&limit=10&tags=HTML
// entermainment
//https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple

const questions=[
    {
        question: "If a leaf falls to the ground in a jungle, and no one hears it, will it make a sound?",answers :[
            {text:"no", correct:false},
            {text:"yes", correct:true},
            {text:"Depends on how heavy the leaf was.", correct:false},
            {text:"Depends on the place it landed.", correct:false},
        ]
    },
    {
        question: "A farmer has 17 goats. All of them but 8 die. How many goats are alive?",answers :[
            {text:"35", correct:false},
            {text:"9", correct:false},
            {text:"25", correct:false},
            {text:"8", correct:true},
        ]
    },
    {
        question: "Divide 30 by half and add ten.",answers :[
            {text:"40.5", correct:false},
            {text:"50", correct:false},
            {text:"70", correct:true},
            {text:"I know this is a trick question, so NONE. Ha!", correct:false},
        ]
    },
    {
        question: "The answer is really big.",answers :[
            {text:"An elephant.", correct:false},
            {text:"THE ANSWER.", correct:true},
            {text:"Really big.", correct:false},
            {text:"The data given is insufficient.", correct:false},
        ]
    },
    {
        question: "Jimmy's father has three sons- Paul I and Paul II. Can you guess the name of the third son?",answers :[
            {text:"Jimmy", correct:true},
            {text:"Jerin", correct:false},
            {text:"Paul III", correct:false},
            {text:"None", correct:false},
        ]
    }
];

const qnsElement = document.getElementById("question");
const ansButton = document.getElementById("ans-btns");
const nextButton = document.getElementById("next-btn");

let curQsnIndex=0;
let score=0;

function startQuiz(){
    curQsnIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQsn= questions[curQsnIndex];
    let qsnNo=curQsnIndex+1;
    qnsElement.innerHTML=qsnNo+". "+currentQsn.question;

    currentQsn.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        ansButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(ansButton.firstChild){
        ansButton.removeChild(ansButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    qnsElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="play Again";
    nextButton.style.display="block";
}
function handleNextBtn(){
    curQsnIndex++;
    if(curQsnIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click",()=>{
    if(curQsnIndex<questions.length){
        handleNextBtn();
    }else{
        startQuiz();
    }
})

startQuiz();
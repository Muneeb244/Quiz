let quiz = [
    {
        ques_no: 1,
        question: "What is the capital of Pakistan?",
        answers: ["Multan", "Islamabad", "Karachi", "Lahore"],
        correct: "Islamabad"
    },
    {
        ques_no: 2,
        question: "What is Style Sheet languagea used for styling web pages?",
        answers: ["HTML", "CSS", "Javascript", "PHP"],
        correct: "CSS"
    },
    {
        ques_no: 3,
        question: "Which of the following is used to mark a begining of a javascript code?",
        answers: ["script", "body", "html", "head"],
        correct: "script"
    },
    {
        ques_no: 4,
        question: "Which of the following is used to mark a end of a javascript code?",
        answers: ["script", "body", "html", "head"],
        correct: "script"
    },
    {
        ques_no: 5,
        question: "How do you write 'Hello World' in an alert box?",
        answers: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
        correct: "alert('Hello World');"
    },
    {
        ques_no: 6,
        question: "How do you create a function in javascript?",
        answers: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function == myFunction()"],
        correct: "function myFunction()"
    },
]



let heading = document.querySelector(".heading");

let str = "come to Quiz";
let animation = str.split('');
let n = 0;
let stop = setInterval(() => {
    heading.innerHTML += animation[n]
    n++;
    if(n == animation.length){
        clearInterval(stop);
    }
}, 150);



let main = document.getElementsByClassName('main')[0];
let main_btn = document.getElementsByClassName('start')[0];
let info = document.getElementsByClassName('info')[0];
let exit = document.getElementsByClassName('info-exit')[0];
let cont = document.getElementsByClassName('info-con')[0];
let exit_quiz = document.getElementsByClassName('exit-quiz')[0];
let res = document.getElementsByClassName('res')[0];
let question = document.getElementsByClassName('question')[0];
let ques_no = document.getElementById('ques-no');
let ques = document.getElementsByClassName('ques')[0];
let options = document.getElementsByClassName('options');
let left = document.getElementById('left');
let sec = document.getElementById('sec');
let next_btn = document.getElementsByClassName('next-btn')[0];
let end = document.getElementsByClassName('end')[0];
let obtained = document.getElementById('obtained');
let total_ques = document.getElementsByClassName('total-ques');
total_ques[0].innerHTML = quiz.length;
total_ques[1].innerHTML = quiz.length;
console.log(total_ques[0], total_ques[1]);
let i = 0;
let stop_time = 0;
let score = 0;
let chk_next = false;




main_btn.addEventListener('click', () => {
    heading.style.display = 'none';
    main.style.display = 'none';
    info.style.display = 'block';
});


exit.addEventListener('click', () => {
    main.style.display = 'block';
    info.style.display = 'none';
});


cont.addEventListener('click', () => {
    info.style.display = 'none';
    question.style.display = 'block';
    startQuiz(i);
});


res.addEventListener('click', () => {
    question.style.display = 'block';
    resetter();
    startQuiz(i);
});


next_btn.addEventListener('click', () => {
    if(chk_next){
        ColorSetter();
        optionEnabler();
        i++;
        if(i == quiz.length){
            question.style.display = 'none';
            end.style.display = 'block';
        }else{
            startQuiz(i);
            chk_next = false;
        }
    }
    else alert("Please select an option!!!");
});

function ColorSetter(){
    for(let j = 0; j<options.length; j++){
        options[j].style.backgroundColor = '#1e8fff28';
    }
}

function optionDisabler(){
    for(let j = 0; j<options.length; j++){
        options[j].classList.add('disable');
    }
}

function optionEnabler(){
    for(let j = 0; j<options.length; j++){
        options[j].classList.remove('disable');
    }
}

function resetter(){
    end.style.display = 'none';
    score = 0;
    i = 0;
}

for(let j = 0; j<options.length; j++){
    options[j].addEventListener('click', () => {
        chk_next = true;
        if(options[j].innerHTML == quiz[i].correct){
            options[j].innerHTML += `<i class="fa fa-check-circle" style="color:green"></i>`;
            // options[j].classList.add('correct');
            options[j].style.backgroundColor = `rgba(0, 128, 0, 0.217)`;
            score++;
        }
        else{
            options[j].innerHTML += `<i class="fa fa-times-circle" style="color:red"></i>`;
            // options[j].classList.add('wrong');
            options[j].style.backgroundColor = `rgba(255, 0, 0, 0.215)`;
            let index = quiz[i].answers.indexOf(quiz[i].correct);
            options[index].innerHTML += `<i class="fa fa-check-circle" style="color:green"></i>`;
            options[index].style.backgroundColor = `rgba(0, 128, 0, 0.217)`;
        }
        optionDisabler();
        obtained.innerHTML = score;
    });
}

function startQuiz(i) {
    clearInterval(stop_time);
    
    let seconds = 15;
    ques_no.innerHTML = quiz[i].ques_no;
    ques.innerHTML = quiz[i].question;
    left.innerHTML = quiz[i].ques_no;
    for (let j = 0; j < quiz[i].answers.length; j++) {
        options[j].innerHTML = quiz[i].answers[j];
    }
    stop_time = setInterval(() => {
        sec.innerHTML = seconds;
        seconds--;
        if (seconds == -1) {
            optionDisabler();
            clearInterval(stop_time);
            if(!chk_next){
                let index = quiz[i].answers.indexOf(quiz[i].correct);
                options[index].innerHTML += `<i class="fa fa-check-circle" style="color:green"></i>`;
                options[index].style.backgroundColor = `rgba(0, 128, 0, 0.217)`;
            }
            chk_next = true;
        }
    }, 1000);
}



exit_quiz.addEventListener('click', () => {
    resetter();
    heading.style.display = 'block'
    main.style.display = 'block';
});
// step:1 first we have Game sequence and usersequence to track the game color and user activity
 //step2: keypress then start the Game
// Now when keypress then Button flash will happen+ Level 1;
// user now pressed the button then check user sequence Matches the Game sequence;
// after check if Same then Level up else Game over;

let gameSeq=[];
let userSeq=[];
// make buttons array so that system can randomly choose color;
let btns=["red","yellow","green","purple"];
let highest_score=0;

// game start 
let started=false;
let level=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is started");
        started=true;

        levelUp();
    }
});

// step3 button flash and levelUp;
function gameflash(btn){ //it flashes button when system randomly chooses the button;
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  },250);
}

function userflash(btn){ //it flashes the button when user click on button;
    btn.classList.add("userflash");
    setTimeout(function(){
      btn.classList.remove("userflash");
    },250);
  }



function levelUp(){
  userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    // system chooses random button then flash it on screen;
    let randIdx=Math.floor(Math.random()*3);
    let randcolor=btns[randIdx];
    let randbtn=document.querySelector(`.${randcolor}`);
    // console.log(randIdx);
    // console.log(randcolor);
    // console.log(randbtn);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameflash(randbtn);
}

// step 4 user input taking ;
function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
      if(userSeq.length==gameSeq.length){
         setTimeout(levelUp,1000);
      }
    }
    else{
      if(highest_score<level*10){
        highest_score=level*10;
      }
      h2.innerHTML=`Game Over! Your score was <b>${level*10}.</b> <br>Your Highest Score till now is ${highest_score}. Press Any key to start.`;

      document.querySelector("body").style.backgroundColor="red";
      setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
      },150);
      reset();
    }
}

function btnPress(){
     console.log(this);//it generally tells which button is pressed by user;
     let btn=this;//stores user's presed button;
    //if users presses button then we flash the button;
    userflash(btn); 
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}   
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
  started=false;
  gameSeq=[];
  userSeq=[];
  level=0;
}


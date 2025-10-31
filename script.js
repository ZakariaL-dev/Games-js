// number guessing

const phrase = document.getElementById("phrase")
const Attemptspan = document.getElementById("attemptsnumb")
const NumberInput = document.getElementById("numberinp")
const guessbtn = document.getElementById("guessbtn")
const hintbtn = document.getElementById("hintbtn")
const displayguesses = document.getElementById("displayguesses")
const guesses = document.getElementById("guesses")
const newgamebtn = document.getElementById("newgamebtn")


let computerGuess = Math.floor(Math.random()*100)+1;
let Attempts = 0;

guessbtn.addEventListener("click",handelGuess)
// handel guess
function handelGuess() {
    const Guess = Number(NumberInput.value);

    if(Guess <= 0 || Guess > 100){
        alert("Please enter a number between 1 and 100 !!!")
        return
    }

    displayguesses.style.display = "block";

    Attempts++;
    Attemptspan.textContent = Attempts;
    console.log("Computer Guess: "+ computerGuess, " / " ,"My Guess: " + Guess)
    if(Guess === computerGuess){
        guesses.innerHTML += `
            <p id="correct">${Guess}</p>
        `;
        phrase.innerHTML = `
            🎉 Congratulations! You guessed it in ${Attempts} attempts!
        `;
        hintbtn.style.display = "none";

        guessbtn.removeEventListener("click", handelGuess);
        NumberInput.setAttribute('readonly', 'readonly');
    }else if(Guess < computerGuess){
        guesses.innerHTML += `
            <p id="upper">${Guess}</p>`;
        phrase.innerHTML = `
            Too low! Try a higher number. (Attempt ${Attempts})
        `
        
    }else{
        guesses.innerHTML += `
            <p id="lower">${Guess}</p>
        `;
        phrase.innerHTML = `
            Too high! Try a lower number. (Attempt ${Attempts})
        `
    }
}
// hint
hintbtn.addEventListener("click", () =>{
    const Guess = Number(NumberInput.value);

    if(Guess <= 0 || Guess > 100){
        alert("Please enter a number between 1 and 100 !!!")
        return
    }

    if (computerGuess <= 100 && computerGuess > 75) {
        phrase.innerHTML = `
            Hint: The number is in the upper quarter (76-100)
        `;
    }else if (computerGuess <= 75 && computerGuess > 50) {
        phrase.innerHTML = `
            Hint: The number is in the third quarter (51-75)
        `;
    }else if (computerGuess <= 50 && computerGuess > 25) {
        phrase.innerHTML = `
            Hint: The number is in the second quarter (26-50)
        `;
    }else{
        phrase.innerHTML = `
            Hint: The number is in the lower quarter (1-25)
        `;
    }
})
// New game
newgamebtn.addEventListener("click", ()=>{
    window.location.reload(); 
})



// wack a mole
const startgamebtn = document.getElementById("startmolebtn");
const resetgamebtn = document.getElementById("resetbtn");
const runninggamebtn = document.getElementById("running");
const timecountdown = document.getElementById("timer");
const hitmoles = document.getElementById("hits");
const scoremoles = document.getElementById("score");
const moleEye = document.getElementById("eye")
const mole = document.getElementsByClassName("mole");
let hits = 0;
let score = 0;
let count = 30;
let molestiming;

// Reset button
resetgamebtn.addEventListener("click", ()=>{
    window.location.reload(); 
})

// Start button
startgamebtn.addEventListener("click", ()=>{
    startgamebtn.style.display = "none";
    runninggamebtn.style.display = "inline";

    timergame();

    molestiming = setInterval(() => {
        moletiming()
    }, 1500);
})

function timergame() {
    let timergame = setInterval(() => {
        count--;
        timecountdown.innerHTML = count;

        if(count === 0){
            clearInterval(timergame);
            startgamebtn.style.display = "inline";
            runninggamebtn.style.display = "none";

            for (let i = 0; i < mole.length; i++) {
                mole[i].removeEventListener("click", scoreandhits)
            }
            document.getElementById("result").innerHTML = `
                <h3>Game Over! Final Score: ${score} ${scoreEvaluation(score)}!</h3>
            `
            clearInterval(molestiming)
        }
    }, 1000);
}

function scoreandhits(){
    hits++;
    hitmoles.innerHTML = hits;

    score = score + 10;
    scoremoles.innerHTML = score;
}

function scoreEvaluation(scr) {
    if(scr >= 0 && scr < 100){
        return "🥉 Good try"
    }else if(scr < 200 && scr >= 100){
        return "🥈 Great job"
    }else if(scr< 300 && scr >= 200){
        return "🥇 Excellent"
    }else{
        return "🏆 Amazing"
    }
}

function moletiming() {

    let random = Math.floor(Math.random() * 9);

    mole[random].style.animationName = "appear";
    mole[random].addEventListener("click", scoreandhits)
    
    setTimeout(() => {
        mole[random].style.top = "10px";
    }, 500);

    setTimeout(() => {
        mole[random].style.animationName = "disappear";

        setTimeout(() => {
            mole[random].removeEventListener("click", scoreandhits)
        }, 320);

        setTimeout(() => {
            mole[random].style.top = "76px";
        }, 500);
    }, 1000);
    
}



// Tic-Tac-Toe
const Turn = document.getElementById("xo");
const Xscore = document.getElementById("Xscr");
const Oscore = document.getElementById("Oscr");
const TitleXO = document.getElementById("playerdisplay")
const GameNumbers = document.getElementById("gmXO");
const NewGamebtnXO = document.getElementById("newgameXO");
const ResetbtnXO = document.getElementById("resetXO");
const WinnerDisplay = document.getElementById("resultXO");

let cubes = []
let turnXO = "X";
let Xscr = 0;
let Oscr = 0;
let gamenumb = 1;
let gameXOended = false;

function gameXO(id){
    if(gameXOended){
        return;
    }


    const element = document.getElementById(id);
    if(turnXO === "X" && element.innerHTML == ""){
        element.innerHTML = "X";
        turnXO = "O"
        Turn.innerHTML = "O"
    }else if(turnXO === "O" && element.innerHTML == ""){
        element.innerHTML = "O";
        turnXO = "X"
        Turn.innerHTML = "X"
    }
    winnerXO()
}

function winnerXO() {
    for (let i = 1; i < 10; i++) {
        cubes[i] = document.getElementById('c'+i).innerHTML;
    }
    winnerCheck()
}


function winnerCheck() {
    // Rows
    if (cubes[1] == cubes[2] && cubes[2] == cubes[3] && cubes[1] != "") {
        winnerstatus(1,2,3)
    }else if (cubes[4] == cubes[5] && cubes[5] == cubes[6] && cubes[5] != "") {
        winnerstatus(4,5,6)
    }else if (cubes[7] == cubes[8] && cubes[8] == cubes[9] && cubes[8] != "") {
        winnerstatus(7,8,9)
    }
    // columns
    else if (cubes[1] == cubes[4] && cubes[4] == cubes[7] && cubes[7] != "") {
        winnerstatus(1,4,7)
    }else if (cubes[2] == cubes[5] && cubes[5] == cubes[8] && cubes[5] != "") {
        winnerstatus(2,5,8)
    }else if (cubes[3] == cubes[6] && cubes[6] == cubes[9] && cubes[3] != "") {
        winnerstatus(3,6,9)
    }
    // digonale
    else if (cubes[1] == cubes[5] && cubes[5] == cubes[9] && cubes[5] != "") {
        winnerstatus(1,5,9)
    }else if (cubes[3] == cubes[5] && cubes[5] == cubes[7] && cubes[5] != "") {
        winnerstatus(3,5,7)
    }

    else {
        checkDraw();
    }
}



function winnerstatus(num1, num2, num3) {
    gameXOended = true;
    TitleXO.innerHTML = `🎉 Player ${cubes[num1]} wins!`
    document.getElementById('c'+num1).classList.add("winnercube")

    document.getElementById('c'+num2).classList.add("winnercube")

    document.getElementById('c'+num3).classList.add("winnercube")

    WinnerDisplay.style.display = "block";


    if (cubes[num1] === "X") {
        Xscr++
        Xscore.innerHTML = Xscr
    }else if(cubes[num1] === "O") {
        Oscr++
        Oscore.innerHTML = Oscr
    }
}

// ta3 draw
function checkDraw() {
    let filledSquares = 0;
    for (let i = 1; i < 10; i++) {
        if (cubes[i] !== "") {
            filledSquares++;
        }
    }
    
    if (filledSquares === 9) {
        gameXOended = true;
        TitleXO.innerHTML = "🤝 It's a Draw!"
    }
}


NewGamebtnXO.addEventListener("click", function() {
    gamenumb++;
    GameNumbers.innerHTML = gamenumb;
    WinnerDisplay.style.display = "none";
    turnXO = "X"
    document.getElementById("playerdisplay").innerHTML = `Player ${turnXO}'s turn`;
    gameXOended = false;
    
    for (let i = 1; i < 10; i++) {
        document.getElementById('c'+i).innerHTML = "";
        document.getElementById('c'+i).classList.remove("winnercube")
    }

})

ResetbtnXO.addEventListener("click", ()=>{
    window.location.reload(); 
})







































































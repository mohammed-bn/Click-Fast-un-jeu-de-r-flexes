const startBtn = document.getElementById("startBtn");
const startGame = document.getElementById("startGame");
const board = document.getElementById("board");
const next = document.getElementById("next");
const timer = document.getElementById("timer");


let CmpLevel = 1;
let targetTimer = null;
let gameTimer = null;
let boutonCible = null;



let score = 0;
let totalAttempts = 0;
let correctClicks = 0;
let missClicks = 0;



let gameActive = false;

let currentGame = null;
let games = JSON.parse(localStorage.getItem("games")) || [];

function data(level, score, totalAttempts, missClicks, correctClicks) {
    this.level = level;
    this.score = score;
    this.totalAttempts = totalAttempts;
    this.missClicks = missClicks;
    this.correctClicks = correctClicks;
}

function resetScore() {
    score = 0;
    totalAttempts = 0;
    correctClicks = 0;
    missClicks = 0;
}

function ajouterScore() {
    score++;
    correctClicks++;

    // console.log("scor->", score);
    // console.log("click shiha->", correctClicks);
}

function mauvaisClic() {
    missClicks++;
    // console.log("click ghleet :", missClicks);
}

function makeTheBoard(size) {
    clearTimeout(targetTimer);

    board.textContent = "";

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        let btn = document.createElement("button");

        btn.style.padding = "20px";
        btn.style.backgroundColor = "white";

        board.appendChild(btn);

        btn.disabled = false;

        btn.addEventListener("click", function () {

            if (!gameActive) {
                return;
            }

            totalAttempts++;

            if (btn === boutonCible) {
                ajouterScore();

                btn.style.backgroundColor = "white";
            } else {
                mauvaisClic();
            }
        });
    }

    choisirCible();
}

function choisirCible() {
    if (!gameActive) {
        return;
    }

    const boutons = board.querySelectorAll("button");

    if (boutons.length === 0) {
        return;
    }

    boutons.forEach(function (btn) {
        btn.style.backgroundColor = "white";
    });

    const indexAleatoire =
        Math.floor(Math.random() * boutons.length);

    boutonCible = boutons[indexAleatoire];

    boutonCible.style.backgroundColor = "red";

    clearTimeout(targetTimer);

    targetTimer = setTimeout(function () {
        choisirCible();
    }, 1000);
}

function chrono(time) {
    clearInterval(gameTimer);

    timer.textContent = time;

    gameTimer = setInterval(function () {

        time--;

        timer.textContent = time;

        if (time <= 0) {

            clearInterval(gameTimer);

            gameActive = false;

            clearTimeout(targetTimer);

            if (boutonCible) {
                boutonCible.style.backgroundColor = "white";
            }

            boutonCible = null;

            currentGame.score = score;
            currentGame.totalAttempts = totalAttempts;
            currentGame.missClicks = missClicks;
            currentGame.correctClicks = correctClicks;

            games.push(currentGame);

            localStorage.setItem("games", JSON.stringify(games));

            afficherResultat();
        }

    }, 1000);
}

function afficherResultat() {

    const resultCard = document.getElementById("resultCard");
    const resultScore = document.getElementById("resultScore");
    const resultCorrect = document.getElementById("resultCorrect");
    const resultMiss = document.getElementById("resultMiss");
    const resultAttempts = document.getElementById("resultAttempts");

    if (!currentGame) {
        return;
    }

    resultScore.textContent = currentGame.score;
    resultCorrect.textContent = currentGame.correctClicks;
    resultMiss.textContent = currentGame.missClicks;
    resultAttempts.textContent = currentGame.totalAttempts;

    resultCard.style.display = "block";
}

function levelGame() {

    if (CmpLevel > 3) {
      //afficher un message 
        return;
    }

    resetScore();

    const resultCard = document.getElementById("resultCard");

    if (resultCard) {
        resultCard.style.display = "none";
    }

    currentGame = new data(
        CmpLevel,
        0,
        0,
        0,
        0
    );

    gameActive = true;

    if (CmpLevel === 1) {

        console.log("Level 1");

        makeTheBoard(4);

        chrono(10);

        CmpLevel++;
    }

    else if (CmpLevel === 2) {

        console.log("Level 2");

        makeTheBoard(6);

        chrono(20);

        CmpLevel++;
    }

    else if (CmpLevel === 3) {

        console.log("Level 3");

        makeTheBoard(8);

        chrono(25);

        CmpLevel++;
    }

}

if (startGame) {

    startGame.addEventListener("click", function () {
        levelGame();
    });
}

if (next) {

    next.addEventListener("click", function () {
        levelGame();
    });
}

if (startBtn) {

    startBtn.addEventListener("click", function () {

        console.log("Start");

        window.location.href = "jeux.html";

    });
}
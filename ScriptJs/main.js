const startBtn = document.getElementById("startBtn");
const startGame = document.getElementById("startGame");
const board = document.getElementById("board");
const next = document.getElementById("next");
let timer = document.getElementById("timer");
var CmpLevel = 1;
let time = 10;
//4an9ad function kola mara 4at tb4i tbda lgame 4at traj3 les variablel9ima dyalhom lbidya
//function pour score
//application dyal les conceptes prototype et synchrone et 

function chrono() {
  let gameTimer = setInterval(function () {
    time--;
    // console.log(time);
    timer.textContent = time;
    if (time == 0) {
      clearInterval(gameTimer);
    }
  }, 1000);
}

if (next) {
  next.addEventListener("click", () => {
    levelGame(CmpLevel);
  });
}
if (startBtn) {
  startBtn.addEventListener("click", function () {
    console.log("zzz");
    window.location.href = "jeux.html";
  });
}

function makeTheBoard(size) {
  board.textContent = "";
  for (let i = 0; i < size * size; i++) {
    let btn = document.createElement("button");
    btn.style.padding = "30px";
    btn.style.backgroundColor = "white";
    board.appendChild(btn);
    btn.disabled = true;
  }
}

function levelGame() {
  if (CmpLevel === 1) {
    makeTheBoard(4);
    CmpLevel++;
  } else if (CmpLevel === 2) {
    makeTheBoard(6);
    CmpLevel++;
  } else if (CmpLevel === 3) {
    makeTheBoard(8);
  }
}

if (startGame) {
  startGame.addEventListener("click", () => {
    levelGame();
    chrono();
  });
}

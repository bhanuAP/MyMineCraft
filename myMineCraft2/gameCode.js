const Game = function(path) {
  this.path = path;
  this.playedMoves = [];
  this.wrongMovesCount = 40;
}

Game.prototype.isCorrectMove = function(move) {
  currentMoveIndex = this.playedMoves.length;
  return this.path[currentMoveIndex] == move;
}

Game.prototype.pushPlayedMove = function(move) {
  this.playedMoves.push(move);
  return '';
}

Game.prototype.giveWrongMoveCount = function() {
  --this.wrongMovesCount;
  return this.wrongMovesCount;
}

Game.prototype.isWrongMove = function(move) {
  let previousMove = this.playedMoves[this.playedMoves.length-1]
  return isWrongMove(move,previousMove,20);
}

Game.prototype.hasWonGame = function() {
  return this.playedMoves[this.playedMoves.length-1] <= 20;
}

Game.prototype.hasLostGame = function() {
  return this.wrongMovesCount == 0;
}

//
//
//
//
//

let action = {};
action['correctMove'] = function(cell) {
  document.getElementById('notification').innerText = "";
  cell.style.background = "green";
}

action['wrongMove'] = function(cell) {
  let wrongMoveCount = game.giveWrongMoveCount();
  document.getElementById('chances').innerText = "chances left";
  if(wrongMoveCount >= 0) {
    document.getElementById('wrongMovesCount').innerText = wrongMoveCount;
  }
  cell.style.background = "red";
  setTimeout(function() {cell.style.background = ""},600);
}

action['invalidMove'] = function(cell) {
  cell.style.background = "blue";
  setTimeout(function() {cell.style.background = ""},200);
}

action['won'] = function() {
  display("you won the game");
  document.getElementById('playNextLevel').style.visibility = "visible";
}

action['lost'] = function() {
  display("you lost the game");
  setTimeout(function(){location.reload()},800);
}

action['continueGame'] = function() {
  return;
}

let display = function(text) {
  document.getElementById('display').innerText = text;
}

//
//
//
//
//

let changeLevel = function() {
  location.href = '../myMineCraft3/index.html';
}

//
//
//
//
//

let startingNumbers = [400,399,398,397,396,395,394,393,392,391,390,389,388,387,386,385,384,383,382,381]
let index = Math.floor(Math.random()*startingNumbers.length);
let path = giveGamePath(20,startingNumbers[index]);
game = new Game(path);


const giveGameStatus = function() {
  if(game.hasWonGame()) {
    return 'won';
  } else if(game.hasLostGame()) {
    return 'lost';
  }
  return 'continueGame';
}

let checkMove = function(event) {
  let correctMove = game.isCorrectMove(event.target.id);
  let cell = document.getElementById(event.target.id);
  if(correctMove) {
    action['correctMove'](cell);
    game.pushPlayedMove(event.target.id);
    action[giveGameStatus()]();
  } else if(game.isWrongMove(event.target.id)  && !game.playedMoves.includes(event.target.id)) {
    action['wrongMove'](cell);
    action[giveGameStatus()]();
  } else if(!game.playedMoves.includes(event.target.id)){
    action['invalidMove'](cell);
  } else {
    return '';
  }
}

let addClickListenerToButton=function(){
  let table = document.getElementById('mineCraft');
  table.onclick = checkMove;
}

let startGame = function() {
  document.getElementById('playNextLevel').style.visibility = "hidden";
  addClickListenerToButton();
}

window.onload = startGame;

const Game = function(path) {
  this.path = path;
  this.playedMoves = [];
  this.wrongMovesCount = 10;
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
  return isWrongMove(move,previousMove,10);
}

Game.prototype.hasWonGame = function() {
  return this.playedMoves[this.playedMoves.length-1] <= 10;
}

Game.prototype.hasLostGame = function() {
  return this.wrongMovesCount == 0;
}

//
//
//
//
//

let giveGamePath = function(width,number,path = [number]) {
  if(path[path.length-1] <= width) {
    return path;
  }
  path = pushNextElement(width,number,path);
  return giveGamePath(width,path[path.length-1],path);
}

let pushNextElement = function(width,number,path) {
  if(isRightEdgeOption(path[path.length-1],width)) {
    let rightEdgeOptions = [number - width, number - 1];
    let index = Math.floor(Math.random()*rightEdgeOptions.length);
    if(!path.includes(rightEdgeOptions[index])){
      path.push(rightEdgeOptions[index]);
    }
  } else if(isLeftEdgeOption(path[path.length-1],width)) {
    let leftEdgeOptions = [number - width, number + 1];
    let index = Math.floor(Math.random()*leftEdgeOptions.length);
    if(!path.includes(leftEdgeOptions[index])) {
      path.push(leftEdgeOptions[index]);
    }
  } else {
    let generalOptions = [number - width, number - 1, number + 1];
    let index = Math.floor(Math.random()*generalOptions.length);
    if(!path.includes(generalOptions[index])) {
      path.push(generalOptions[index]);
    }
  }
  return path;
}

let isRightEdgeOption = function(number,width) {
  return number % width == 0;
}

let isLeftEdgeOption = function(number,width) {
  return (number - 1) % width == 0;
}

let isWrongMove = function(move,previousMove,width) {
  let leftEdgeOptions = [previousMove-width, +previousMove+1];
  let rightEdgeOptions = [previousMove-width, previousMove-1];
  let generalOptions = [previousMove-width, previousMove-1, +previousMove+1];
  if(isRightEdgeOption(previousMove,width)&&rightEdgeOptions.includes(+move)) {
    return true;
  } else if(isLeftEdgeOption(previousMove,width)&&leftEdgeOptions.includes(+move)) {
    return true;
  } else if(generalOptions.includes(+move)) {
    return true;
  }
  return false;
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
  location.href = '../myMineCraft2/index.html';
}

//
//
//
//
//

let startingNumbers = [91,92,93,94,95,96,97,98,99,100]
let index = Math.floor(Math.random()*startingNumbers.length);
let path = giveGamePath(10,startingNumbers[index]);
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

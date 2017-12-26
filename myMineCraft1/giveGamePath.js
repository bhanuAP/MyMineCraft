let giveGamePath = function(width,number,path = [number]) {
  if(path[path.length-1] <= width) {
    return path.slice(1);
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

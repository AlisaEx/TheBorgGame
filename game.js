var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var clickCount = 0;
var animate = null;
var federation = [];

borgShip = new Entity(0,0,400,400);
borgShip.imageLocation = 'images/borg.png';
  // loop to create federation ships
for (i=0; i<3; i++){
  federation[i] = new Entity(600, (i+1)*75, 50, 10);
  federation[i+3] = new Entity((i+1)*75, 600, 10, 50);
}

function clickMouse(){
  if(clickCount===0){
    tractorBeam(context);
    clickCount += 1;
    animate = setInterval(attackBorg, 500);
  }
}
function tractorBeam(context){
  federation.forEach(function(ship){
    context.beginPath();
    context.moveTo(220,95);
    context.lineTo(ship.x, ship.y);
    context.lineWidth = 3;
    context.strokeStyle = 'green';
    context.stroke();
  })
};
function gameDraw(){
  context.clearRect(0,0,spaceCanvas.width, spaceCanvas.height);
  federation.forEach(function(ships){
    ships.draw(context);
  })
  borgShip.drawImg(borgShip.imageLocation)
  spaceCanvas.addEventListener('click', clickMouse, false);
};

function startGame(){
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("Defeat the BORG",400,300);
  context.fillText("Click the mouse to attack",350,400);
};

function loseGame(){
  clearInterval(animate);
  spaceCanvas.removeEventListener('click', clickMouse);
  context.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height)
  borgShip.drawImg(borgShip.imageLocation);
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("You have been assimilated.",300,400);
};
function attackBorg(){
  for (var i = 0; i < 3; i++) {
    if (collides(federation[i], borgShip)===true){
      loseGame();
    }
    else{
    movement.up(federation[i+3]);
    movement.left(federation[i]);
    }
  }
};
function shipMovement(dx, dy){
  return function (ship){
    context.clearRect(ship.x, ship.y, ship.width, ship.height);
    ship.x += dx;
    ship.y += dy;
    ship.draw(context);
  }
};

  // moves ships towards BORG
movement = {
  left: shipMovement(-30,-1),
  up: shipMovement(1, -30)
};

  ///GAME///
startGame();
setTimeout(gameDraw,1000);
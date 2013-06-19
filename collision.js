function collides(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
};
function attackBorg(){
  for (var i = federation.length - 1; i >= 3; i--) {
    if (collides(federation[i], borgShip)===true){
      loseGame();
    }
    else{
    movement.up(federation[i]);
    }
  }
  for (var i = federation.length - 4; i >= 0; i--) {
    if (collides(federation[i], borgShip)===true){
      loseGame();
    }
    else{
    movement.left(federation[i]);
    }
  }
};
  // moves ships towards BORG
movement = {
  left: function(ship){
    context.clearRect(ship.x, ship.y, ship.width, ship.height);
    ship.x -= 10;
    ship.y -= 1;
    ship.draw(context);
  },
  up: function(ship){
    context.clearRect(ship.x, ship.y, ship.width, ship.height);
    ship.y -= 10;
    ship.x += 1;
    ship.draw(context);
  }
};

function startGame(){
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("Defeat the BORG",400,400);
  context.fillText("Click the mouse to attack",400,500);
};

function loseGame(){
	spaceCanvas.removeEventListener('click', clickMouse);
	context.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height)
	drawBorg();
	context.font = '30pt Ariel';
	context.fillStyle = 'white';
	context.fillText("Resistance is futile.",400,400);
	context.fillText("Your life as it has been is over.",300,500);
	context.fillText("From this time forward you will service us.",200,600);
};
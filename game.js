var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var clickCount = 0;

function clickMouse(){
  if(clickCount===0){
    tractorBeam(context);
    clickCount += 1;
    setTimeout(attackBorg, 500);
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
function drawBorg(){
  borgShip = new Image();
  borgShip.src = 'images/borg.png';
  borgShip.onload = function(){
    context.drawImage(borgShip,0,0);
  }
};
function gameDraw(){
context.clearRect(0,0,spaceCanvas.width, spaceCanvas.height);
federation.forEach(function(ships){
  ships.draw(context);
})
drawBorg();
spaceCanvas.addEventListener('click', clickMouse, false);
}

function startGame(){
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("Defeat the BORG",400,300);
  context.fillText("Click the mouse to attack",350,400);
};

function loseGame(){
  clearTimeout(animate);
  spaceCanvas.removeEventListener('click', clickMouse);
  context.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height)
  drawBorg();
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("You have been assimilated.",300,400);
  context.fillText("Resistance is futile.",350,500);

};

  ///GAME///
startGame();
setTimeout(gameDraw,2000);
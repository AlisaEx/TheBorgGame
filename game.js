(function(){
var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var clickCount = 0;
var animate = null;
var federation = [];
var start = false;
function collides(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
};

function Entity(x,y,width,height,speed){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
};
Entity.prototype.draw = function(){
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = 'black';
  context.closePath();
  context.fill();   

};
borg = {
x: 0, y:0, width: 400, height: 400, dx: 0, dy: 0, imageLocation: 'images/borg.png'};

  // loop to create federation ships
for (i=0; i<5; i++){
  federation[i] = new Entity(600, (i+1)*75, 50, 10, 0.003);
  federation[i+5] = new Entity((i+1)*75, 600, 10, 50, 0.003);
}

function clickMouse(){
  if(clickCount===0){
    tractorBeam(context);
    clickCount += 1;
    animate = setInterval(attackBorg, 50);
  }
}
function tractorBeam(context){
  federation.forEach(function(ship){
    context.beginPath();
    context.moveTo(220,95);
    context.lineTo(ship.x+(ship.width/2), ship.y+(ship.height/2));
    context.lineWidth = 3;
    context.strokeStyle = 'green';
    context.stroke();
  })
};
drawBorg = function() {
  borgShip = new Image();
  borgShip.src = borg.imageLocation;
  borgShip.onload = function(){
    context.drawImage(borgShip, borg.x, borg.y);
  }
};

function whichKeyPress(e){
  if(e.keyCode==13){
    start = true;
    gameDraw();
  }
}
function gameDraw(){
  if (start === false){
    startGame();
  }
  else{
    context.clearRect(0,0,spaceCanvas.width, spaceCanvas.height);
    federation.forEach(function(ships){
      ships.draw();
    })
    drawBorg();
    spaceCanvas.addEventListener('click', clickMouse, false);
  }
};

function startGame(){
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("Defeat the BORG",400,300);
  context.fillText("Click the mouse to attack",350,400);
  document.onkeypress = whichKeyPress;
};

function loseGame(){
  clearInterval(animate);
  spaceCanvas.removeEventListener('click', clickMouse);
  context.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height)
  drawBorg();
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("You have been assimilated.",300,400);
};
function attackBorg(){
  for (var i = 0; i < 5; i++) {
    if (collides(federation[i], borgShip)===true || collides(federation[i+5], borgShip)===true){
      loseGame();
    }

    else{
    movement(federation[i+5]);
    movement(federation[i]);
    }
  }
};

  // moves ships towards BORG
movement = function(ship){
  context.clearRect(ship.x, ship.y, ship.width+20, ship.height+20);
  ship.x += (220-ship.x)*ship.speed;
  ship.y += (95-ship.y)*ship.speed;
  ship.draw(context);
};

  ///GAME///
gameDraw();
}())
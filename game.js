(function(){
var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var clickCount = 0;
var animate = null;
var federation = [];
var bullets = [];

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
  context.fillStyle = 'white';
  context.closePath();
  context.fill();   
};

borg = {x: 0, y:0, width: 400, height: 400, dx: 0, dy: 0, imageLocation: 'images/borg.png'};

  // loop to create federation ships
for (i=0; i<5; i++){
  federation[i] = new Entity(600, (i+1)*75, 50, 10, 0.003);
  federation[i+5] = new Entity((i+1)*75, 600, 10, 50, 0.003);
};


function tractorBeam(context){
  if(clickCount===0){
    federation.forEach(function(ship){
      context.beginPath();
      context.moveTo(220,95);
      context.lineTo(ship.x+(ship.width/2), ship.y+(ship.height/2));
      context.lineWidth = 3;
      context.strokeStyle = 'green';
      context.stroke();
      clickCount += 1;
    })
  }
};


drawBorg = function() {
  borgShip = new Image();
  borgShip.src = borg.imageLocation;
  borgShip.onload = function(){
    context.drawImage(borgShip, borg.x, borg.y);
  }
};

function fireMissile(){
  if(bullets.length < 20){
    federation.forEach(function(ship){
      pew = new Entity(ship.x, ship.y, 10,10,0.05);
      bullets.push(pew);
    })
  }
  else{
    moveMissile();
  }
};

function moveMissile(){
  for (var i = 0; i < 5; i++){
    movement.left(bullets[i]);
    movement.up(bullets[i+5]);
  }
  animate = setInterval(moveMissile, 1000);
};


function whichKeyPress(e){
  if(e.keyCode === 32){
    fireMissile();
  }
};

function attackBorg(){
  if(clickCount===0){
    federation.forEach(function(ship){
      context.beginPath();
      context.moveTo(220,95);
      context.lineTo(ship.x+(ship.width/2), ship.y+(ship.height/2));
      context.lineWidth = 3;
      context.strokeStyle = 'green';
      context.stroke();
      clickCount += 1;
    })
  }
  else{
  for (var i = 0; i < 5; i++) {
    if (collides(federation[i], borgShip)===true || collides(federation[i+5], borgShip)===true){
      loseGame();
    }

    else{
    movement.capture(federation[i+5]);
    movement.capture(federation[i]);
    }
  }
  }
  animate = setInterval(attackBorg,500);
};



  // moves ships towards BORG
movement = {
  capture: function(ship){
    context.clearRect(ship.x, ship.y, ship.width+20, ship.height+20);
    ship.x += (220-ship.x)*ship.speed;
    ship.y += (95-ship.y)*ship.speed;
    ship.draw(context); 
  },
  left: function(pew){
    context.clearRect(pew.x, pew.y, pew.width, pew.height);
    pew.x -= 50;
    pew.draw(context);
  },
  up: function(pew){
    context.clearRect(pew.x, pew.y, pew.width, pew.height);
    pew.y -= 50;
    pew.draw(context);    
  }
};


function loseGame(){
  clearInterval(animate);
  spaceCanvas.removeEventListener('click', attackBorg);
  context.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height)
  context.font = '30pt Ariel';
  context.fillStyle = 'white';
  context.fillText("You have been assimilated.",300,500);
};


function gameDraw(){
    context.clearRect(0,0,spaceCanvas.width, spaceCanvas.height);
    federation.forEach(function(ships){
      ships.draw();
    })
    drawBorg();
};

function gameLoop(){
  federation.forEach(function(ships){
    ships.draw();
  })
  drawBorg();
  spaceCanvas.addEventListener('click', attackBorg, false);
  document.onkeypress = whichKeyPress;
}


  ///GAME///
setTimeout(gameLoop,20000);

}());
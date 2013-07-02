(function(){
var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var loop = null;
var animate = null;
var drawables = [];
var federation = [];
var bullets = [];

function collides(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x &&
         a.y < b.y + b.height && a.y + a.height > b.y;
};

function Entity(x,y,width,height,speed,color){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = speed;
  this.color = color;
};
Entity.prototype.draw = function(){
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = this.color;
  context.closePath();
  context.fill();   
};

borg = {x: 0, y:0, width: 400, height: 400, imageLocation: 'images/borg.png'};
borgHealth = new Entity(spaceCanvas.width-200, 50, 200, 20, 30, 'green');
drawables.push(borgHealth);


  // loop to create federation ships
for (i=0; i<5; i++){
  federation[i] = new Entity(600, (i+1)*75, 50, 10, 3, 'white');
  federation[i+5] = new Entity((i+1)*75, 600, 10, 50, 3, 'white');
};
federation.forEach(function(ship){
  drawables.push(ship);
});


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

function fireMissile(){
  federation.forEach(function(ship){
    missile = new Entity(ship.x-(ship.width/2), ship.y-(ship.height/2), 10, 10, 1, 'white');
    bullets.push(missile);
  })
  bullets.forEach(function(pew){
    drawables.push(pew);
  });
};

// function moveMissile(){
//   if(bullets.length>0){
//     for (var i = 0; i < 5; i++){
//       if(collides(bullets[i],borgShip)===true || collides(bullets[i+5], borgShip)===true){
//         clearInterval(animate);
//         bullets.length = 0;
//         if (borgHealth.width<60){
//           borgAttack();
//         }
//         else{
//           borgHealth.width -= borgHealth.speed;
//         }
//       }
//       else{
//         movement(-1,0)(bullets[i]);
//         movement(0,-1)(bullets[i+5]);
//         animate = setInterval(moveMissile, 50);
//       }
//     }
// }
// };

function detectSpace(e){
  if(e.keyCode === 32){
    fireMissile();
  }
};

function borgAttack(){
  tractorBeam();
  federation.forEach(function(ship){ 
    if (collides(ship, borgShip)===true){
      loseGame();
    }
    else{
    movement((220-ship.x), (95-ship.y))(ship);
    }
  })
};
  // moves ships towards BORG
movement = function(dx,dy){
  return function(ent){
    ent.x += dx*ent.speed;
    ent.y += dy*ent.speed;
  }
};
function loseGame(){
  clearInterval(animate);
  context.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height)
  context.font = '30pt Courier New';
  context.fillStyle = 'white';
  context.fillText("Resistance is futile.",250,300);
  context.fillText("You have been assimilated.",200,400);
  context.fillText("GAME OVER.",350,500);
};

function initializeGame(){
  document.addEventListener('keypress', detectSpace, false);
  gameDraw();
}

function gameDraw(){
  drawables.forEach(function(ent){
    context.clearRect(ent.x, ent.y, ent.width, ent.height);
    ent.draw();
  })
  context.font = '13pt Courier New';
  context.fillStyle = 'white';
  context.fillText("BORG shield level: ", borgHealth.x, borgHealth.y-borgHealth.height);
  loop = setInterval(gameLoop,1);
}

function gameLoop(){
  if (bullets.length>0){
    for (var i = 0; i < 5; i++){
      if(collides(bullets[i],borgShip)===true || collides(bullets[i+5], borgShip)===true){
        bullets.length = 0;
        if (borgHealth.width<60){
          document.removeEventListener('keypress', detectSpace);
          borgAttack();
        }
        else{
          borgHealth.width -= borgHealth.speed;
        }
      }
      else{
        movement(-1,0)(bullets[i]);
        movement(0,-1)(bullets[i+5]);
      }
    }
  }
  drawBorg();
  gameDraw();
}

setTimeout(initializeGame, 50);
}());
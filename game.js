var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var clickCount = 0;

  // array for federation ships
var federation = [];

  // ship constructor initialization
function Ship(x, y, width, height){
  this.x = x; this.y = y; this.width = width; this.height = height;
}
  // add draw function to ships
Ship.prototype.draw = function(context){
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = 'black';
  context.fill();
};
  // moves ships towards BORG
movement = {
  left: function(ship){
    context.clearRect(ship.x, ship.y, ship.width, ship.height);
    ship.x -= 25;
    ship.y -= 1;
    ship.draw(context);
  },
  up: function(ship){
    context.clearRect(ship.x, ship.y, ship.width, ship.height);
    ship.y -= 25;
    ship.x += 1;
    ship.draw(context);
  }
}
  // Collision detection function
function collides(a, b) {
  return a.x < b.x + b.width && 
         a.x + a.width > b.x &&
         a.y < b.y + b.height && 
         a.y + a.height > b.y;
}
  // create the BORG ship
function drawBorg(){
  borgShip = new Image();
  borgShip.src = 'images/borg.png';
  borgShip.onload = function(){
    context.drawImage(borgShip,0,0);
  }
};
function tractorBeam(context){
  if (clickCount === 0){
  federation.forEach(function(ship){
    context.clearRect(spaceCanvas.width, spaceCanvas.height);
    context.beginPath();
    context.moveTo(220,95);
    context.lineTo(ship.x, ship.y);
    context.lineWidth = 3;
    context.strokeStyle = 'green';
    context.stroke();
})}
  }

drawBorg();
  // loop to create federation ships
for (i=0; i<3; i++){
  federation[i] = new Ship(600, (i+1)*75, 50, 10);
  federation[i+3] = new Ship((i+1)*75, 600, 10, 50);
}
  // draw the ships
federation.forEach(function(ships){
  ships.draw(context);
})
  // event handler
spaceCanvas.addEventListener('click', function() {
    tractorBeam(context);
    clickCount+=1;
    setInterval(function(){
      for (var i = federation.length - 1; i >= 3; i--) {
        if (collides(borgShip, federation[i])===true){
          context.clearRect(federation[i].x, federation[i].y, federation[i].width, federation[i].height);      
          federation[i].destroy = true;
        }        
        else{
          movement.up(federation[i]);
        }
      };
      for (var i = federation.length - 4; i >= 0; i--) {
        if (collides(borgShip, federation[i])===true){
          context.clearRect(federation[i].x, federation[i].y, federation[i].width, federation[i].height);     
          federation[i].destroy = true;
        }
        else{
          movement.left(federation[i]);
        }
      };
      window.removeEventListener('click', false );
    }, 500);
}, true);

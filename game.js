var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');

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
  // loop to create federation ships
for (i=0; i<3; i++){
  federation[i] = new Ship(600, (i+1)*75, 10,10);
  federation[i+3] = new Ship((i+1)*75, 600, 10, 10);
}
  // moves ships towards BORG
movement = {
  left: function(ship){
    context.clearRect(ship.x, ship.y, ship.width, ship.height);
    ship.x -= 10;
    ship.draw(context);
  },
  up: function(ship){
    context.clearRect(ship.x, ship.y, ship.width, ship.height);
    ship.y -= 10;
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
drawBorg();
function drawBorg(){
  borgShip = new Image();
  borgShip.src = 'images/borg.png';
  borgShip.onload = function(){
    context.drawImage(borgShip, 50, 50);
  }
};

  // draw the ships
federation.forEach(function(ships){
  ships.draw(context);
})
  // event handler
spaceCanvas.addEventListener('click', function() {
      // GAME LOOP
    setInterval(function(){
      for (var i = federation.length - 1; i >= 3; i--) {
        if (collides(federation[i], borgShip)===true){
          federation[i].destroy = true;      
        }        
        else{
          movement.up(federation[i]);
        }
      };
      for (var i = federation.length - 4; i >= 0; i--) {
        if (collides(federation[i], borgShip)===true){
          federation[i].destroy = true;      
        }
        else{
          movement.left(federation[i]);
        }
      };
    }, 500);
}, false);
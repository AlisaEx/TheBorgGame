var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
  // array for federation ships
var federation = [];
  // ship constructor initialization
function Ship(x, y, width, height){
  this.x = x; this.y = y; this.width = width; this.height = height;
}
function moveLeft(ship){
  context.clearRect(ship.x, ship.y, ship.width, ship.height);
  ship.x -= 10;
  ship.draw(context);
}
function moveUp(ship){
  context.clearRect(ship.x, ship.y, ship.width, ship.height);
  ship.y -= 10;
  ship.draw(context);
}
function moveAcross(ship){
  context.clearRect(ship.x, ship.y, ship.width, ship.height);
  ship.x += 10;
  ship.y += 10;
  ship.draw(context);
}
function collides(a, b) {
  return a.x < b.x + b.width && 
         a.x + a.width > b.x &&
         a.y < b.y + b.height && 
         a.y + a.height > b.y;
}
  // add draw function to ships
Ship.prototype.draw = function(context){
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = 'black';
  context.fill();
};
  // create the BORG ship
var borgShip = new Ship(50,50,300,300);
  // loop to create federation ships
for (i=0; i<3; i++){
  federation[i] = new Ship(600, (i+1)*75, 10,10);
  federation[i+3] = new Ship((i+1)*75, 600, 10, 10);
}
  // draw the ships
borgShip.draw(context);
federation.forEach(function(ships){
  ships.draw(context);
})
  // event handler
spaceCanvas.addEventListener('click', function() {
    setInterval(function(){
      for (var i = federation.length - 1; i >= 3; i--) {
      if (collides(federation[i], borgShip)===true){
        federation[i].destroy = true;      
      }        
      else{
        moveUp(federation[i]);
      }
      };
      for (var i = federation.length - 4; i >= 0; i--) {
      if (collides(federation[i], borgShip)===true){
        federation[i].destroy = true;      
      }
      else{
        moveLeft(federation[i]);
      }
      };
    }, 500);
}, false);
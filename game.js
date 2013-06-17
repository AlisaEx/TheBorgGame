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
  // create the BORG ship
var borgShip = new Ship(100,100,200,200);
  // loop to create federation ships
var shipY = 100;
for (i=0; i<5; i++){
  federation[i] = new Ship(600,shipY, 10,10);
  shipY += 100;
}
  // draw the ships
borgShip.draw(context);
federation.forEach(function(ships){
  ships.draw(context);
})
  // event handler
spaceCanvas.addEventListener('click', function() {
  context.clearRect(borgShip.x, borgShip.y, borgShip.width, borgShip.height);
  borgShip.x +=5;
  borgShip.draw(context);
}, false);
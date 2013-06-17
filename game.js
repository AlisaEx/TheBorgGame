var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var federation = [];
function Ship(x, y, width, height){
  this.x = x; this.y = y; this.width = width; this.height = height;
}
Ship.prototype.draw = function(context){
  context.beginPath();
  context.rect(this.x, this.y, this.width, this.height);
  context.fillStyle = 'black';
  context.fill();
};
var borgShip = new Ship(100,100,200,200);

var shipY = 100;
for (i=0; i<5; i++){
  federation[i] = new Ship(600,shipY, 10,10);
  shipY += 100;
}

borgShip.draw(context);

federation.forEach(function(ships){
  ships.draw(context);
})

spaceCanvas.addEventListener('click', function() {
  context.clearRect(borgShip.x, borgShip.y, borgShip.width, borgShip.height);
  borgShip.x +=5;
  borgShip.draw(context);
}, false);
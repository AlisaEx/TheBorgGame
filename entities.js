
function Ship(x, y, width, height){
  this.x = x; this.y = y; this.width = width; this.height = height;
};
  Ship.prototype.draw = function(context){
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'black';
    context.fill();
};
var federation = [];

  // loop to create federation ships
for (i=0; i<3; i++){
  federation[i] = new Ship(600, (i+1)*75, 50, 10);
  federation[i+3] = new Ship((i+1)*75, 600, 10, 50);
}
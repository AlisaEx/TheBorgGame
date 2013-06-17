var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var federation = [];
var borgShip = {
  x: 200, y: 100, width: 200, height: 200,
  draw: function(context)
    {context.beginPath();
    context.rect(borgShip.x, borgShip.y, borgShip.width, borgShip.height);
    context.fillStyle = 'black';
    context.fill();}
};
var federationShip = {
  x: 600,
  y: 100,
  draw: function(context)
    {context.beginPath();
    context.rect(this.x, this.y, 10, 10);
    context.fillStyle = 'black';
    context.fill();}
};



borgShip.draw(context);
federationShip.draw(context);


spaceCanvas.addEventListener('click', function() {
  context.clearRect(borgShip.x, borgShip.y, borgShip.width, borgShip.height);
  borgShip.x +=5;
  borgShip.draw(context);
}, false);
function Ship(x, y, width, height){
  this.x = x; this.y = y; this.width = width; this.height = height;
};
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
};


function attackBorg(){
  for (var i = federation.length - 1; i >= 3; i--) {
    movement.up(federation[i]);
  }
  for (var i = federation.length - 4; i >= 0; i--) {
    movement.left(federation[i]);
  }
  setTimeout(attackBorg,500);
};


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
		})
	}
 };
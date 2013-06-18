function collides(a, b) {
  return a.x < b.x + b.width && 
         a.x + a.width > b.x &&
         a.y < b.y + b.height && 
         a.y + a.height > b.y;
};

function loseGame(){
	federation.forEach(function(ship){
		context.clearRect(ship.x, ship.y, ship.width, ship.height);      
		ship.destroy = true;		
	})
	context.clearRect(0,0,spaceCanvas.width, spaceCanvas.height);
	drawBorg();
	context.font = '30pt Ariel';
	context.fillStyle = 'white';
	context.fillText("Resistance is futile.",400,400);
	context.fillText("Your life as it has been is over.",300,500);
	context.fillText("From this time forward you will service us.",200,600);
};
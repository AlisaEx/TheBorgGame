var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var clickCount = 0;
var federation = [];

  // loop to create federation ships
for (i=0; i<3; i++){
  federation[i] = new Ship(600, (i+1)*75, 50, 10);
  federation[i+3] = new Ship((i+1)*75, 600, 10, 50);
}

  /// draw the ships ///
drawBorg();
federation.forEach(function(ships){
  ships.draw(context);
})
  // event handler
spaceCanvas.addEventListener('click', function() {
    tractorBeam(context);
    clickCount+=1;
    federation.forEach(function(ships){
      if (collides(borgShip, ships)===true){
        loseGame();
        context.clearRect(0,0,spaceCanvas.width, spaceCanvas.height);
        drawBorg();
      }
        setTimeout(attackBorg, 500);
      // }
    })
}, false);
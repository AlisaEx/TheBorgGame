var spaceCanvas = document.getElementById('space');
var context = spaceCanvas.getContext('2d');
var clickCount = 0;

function clickMouse(){
  if(clickCount===0){
    tractorBeam(context);
    clickCount += 1;
    setTimeout(attackBorg, 500);
  }
}

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
        context.beginPath();
        context.moveTo(220,95);
        context.lineTo(ship.x, ship.y);
        context.lineWidth = 3;
        context.strokeStyle = 'green';
        context.stroke();
    })
  }
 };
function gameDraw(){
context.clearRect(0,0,spaceCanvas.width, spaceCanvas.height);
federation.forEach(function(ships){
  ships.draw(context);
})
drawBorg();
spaceCanvas.addEventListener('click', clickMouse, false);
}


// spaceCanvas.addEventListener('keydown', function(e){
//   if(e.keyCode==13){
//     start = true;
//   }
// },false);
// spaceCanvas.addEventListener('click', clickMouse, false);

startGame();

setTimeout(gameDraw,1000);
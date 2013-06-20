function Entity(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};

Entity.prototype.drawImg = function(imgLocation) {
	this.Entity = new Image();
	this.Entity.src = imgLocation;
	this.Entity.onload = function(){
		context.drawImage(this, this.x, this.y);
	}
};
Entity.prototype.draw = function() {
	context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'black';
    context.lineCap = 'round'
    context.lineWidth = 10;
    context.closePath();
    context.fill();
};
function Entity(x,y,width,height,speed){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.speed = speed;
};
Entity.prototype.draw = function(){
	context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'black';
    context.closePath();
    context.fill();		

};


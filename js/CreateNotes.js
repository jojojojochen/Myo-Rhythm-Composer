var c=document.getElementById("randomCanvas");
var ctx = c.getContext("2d");
var ctx2 = c.getContext("2d");

var left=false;
var right=false;
var enter=false;
var shift=false;
var previousTime;
var currentTime;
var timeDifference;
var numOfNote=0;
const tempo=60;
const epsilon=0.1;

function drawNote(){
	ctx.beginPath();
	ctx.rect(x,y,10,10);
	ctx.fillStyle="white";
	ctx.fill();
	ctx.closePath();
}
function drawRest(){
	ctx2.beginPath();
	ctx2.rect(restx,resty,10,10);
	ctx2.fillStyle="black";
	ctx2.fill();
	ctx2.closePath();
}

function draw(){
	var d=new Date();
	if(!enter){
		previousTime=d.getTime();
	}
	if(enter){
		if(right){numOfNote++;} //if input key p
		currentTime=d.getTime();
		timeDifference=(currentTime-previousTime)*0.001;
		var quarterLength=timeDifference*tempo/60*0.001;
		if(timeDifference<=quarterLength+epsilon && timeDifference>=quarterLength-epsilon){
			if(numOfNote==2){
				drawEighthNote();
			}
			else if(numOfNote==1){
				drawQuarterNote();
			}
			else if(numOfNote==0){
				drawOneQuarterRest();
			}
			previousTime=currentTime;
			numOfNote=0;
		}
	}
}


document.addEventListener("keydown",keyDown,false);
document.addEventListener("keyup",keyUp,false);
function keyDown(e){
	if(e.keyCode==80){
		right=true;
	}
	else if(e.keyCode==81){
		left=true;
	}
	else if(e.keyCode==13){
		enter=!enter;
	}
}
function keyUp(e){
	if(e.keyCode==80){
		right=false;
	}
	else if(e.keyCode==81){
		left=false;
	}
}
setInterval(draw,10);
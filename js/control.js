
var row = 1;
var left=false;
var right=false;
var enter=false;

var previousTime;
var currentTime;
var timeDifference;
var numOfNoteL=0;
var numOfNoteR=0;
var counter=0;
const tempo=120;
const epsilon=0.1;



$(document).on("keydown", function (e) {
    // use e.which
    sound(e.which);
});




function sound(key) {
    var audio = new Audio('beat1.wav');
    var audio2 = new Audio('beat2.wav');
    if(key == 70) audio.play();
    if(key == 74) audio2.play();
}

var drawQuarterNote =  function(index) {

    if (index == 2) {

        $("#bigRow" + row.toString() + ">#row1").append("<div class = 'note4_1'></div>");

    }

    if (index == 1) {
        $("#bigRow"+row.toString()+">#row2").append("<div class = 'note4_2'></div>");

    }

}

var drawEighthNote =  function(index) {

    if (index == 2) {
        $("#bigRow"+row.toString()+">#row1").append("<div class = 'note8_1'></div>");
    }

    if (index == 1) {
        $("#bigRow"+row.toString()+">#row2").append("<div class = 'note8_2'></div>");
    }

}

var drawRest = function (index) {
    if (index == 2) {
        $("#bigRow"+row.toString()+">#row1").append("<div class = 'stop4_1'></div>");
    }

    if (index == 1) {
        $("#bigRow"+row.toString()+">#row2").append("<div class = 'stop4_2'></div>");
    }
}

var addBigRow = function() {
    row++;
    $("#scores").append("<div class = 'bigRow' id = 'bigRow"+row.toString()+"'"+"><div id = 'row1'> </div><div id = 'row2'></div></div>");

}

function draw(){
    var d=new Date();

    if(!enter){
        previousTime=d.getTime();
    }
    if(enter){
        if(right){numOfNoteR++; right=false;} //if input key p
        if(left) {numOfNoteL++; left=false;}
        currentTime=d.getTime();
        console.log(previousTime);
        timeDifference=(currentTime-previousTime)*0.001;

        var quarterLength=60/tempo;

        if(timeDifference<=quarterLength+epsilon && timeDifference>=quarterLength-epsilon){
            counter++;
            if(numOfNoteL>=2){
                drawEighthNote(1);

            }
            else if(numOfNoteL==1){
                drawQuarterNote(1);
            }
            else if(numOfNoteL==0){
                drawRest(1);
            }

            if(numOfNoteR>=2){
                drawEighthNote(2);

            }
            else if(numOfNoteR==1){
                drawQuarterNote(2);
            }
            else if(numOfNoteR==0){
                drawRest(2);
            }

            previousTime+=quarterLength*1000;
            numOfNoteR=0;
            numOfNoteL=0;
        }
    }
    if(counter==4*4){
        addBigRow();
        counter=0;
    }
}


document.addEventListener("keydown",keyDown,false);
//document.addEventListener("keyup",keyUp,false);
function keyDown(e){
    if(e.keyCode==70){
        left=true;
    }
    else if(e.keyCode==74){
        right=true;
    }
    else if(e.keyCode==13){
        enter=!enter;
    }
}

//function keyUp(e){
//    if(e.keyCode==80){
//        right=false;
//    }
//    else if(e.keyCode==81){
//        left=false;
//    }
//}

setInterval(draw,10);


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");              // the 2D rendering context — the actual tool we can use to paint on the Canvas.


let x = canvas.width/2;
let y = canvas.height - 30;

dx = 4;
dy = -4;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width / 2) - (paddleWidth/2);

// drawing ball function
var ballRadius = 10;

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks(3,2);

    drawBall();
    drawPaddle();
    checkCollision();
    movePaddle();
    x+=dx;
    y+=dy;

}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "maroon";
    ctx.fill();
    ctx.closePath();
}


function drawPaddle() {
    ctx.beginPath();
    
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(bPerRow, numRows) {
    var brickWidth = Math.floor((canvas.width * .8) / bPerRow);
    // var brickHeight = Math.floor((canvas.height * .35) / numRows);
    const xGap = (canvas.width * .2) / (bPerRow + 1);
    // const yGap = (canvas.height * .1) / (numRows);
    // for (const i=0; i<numRows;i++) {
        for (var j=0; j<bPerRow;j++) {
            var rectangle = {
                x1: Math.floor( (j * brickWidth) + (xGap * (j+1)) * 1) /1,
                x2: Math.floor( (this.x1 + brickWidth) * 1),
                // y1: (i+1) * yGap + (numRows * i),
                // y2: (y1 + brickHeight)
             }
            //  console.log(brickWidth);
            //  console.log("Box# " + j +" :" + rectangle.x2);
             console.log(rectangle);

            // ctx.beginPath();
            // ctx.rect(rectangle.x1, rectangle.x2, rectangle.y1, rectangle.y2);
            // ctx.fillStyle = "#0084DD";
            // ctx.fill();
            // ctx.closePath();    
    //     }
 
    }
}


function checkCollision() {
    topCollision();
    bottomCollision();
    sideCollision();
}

function topCollision() {
    if (y-ballRadius + dy < 0)         //dy is negative when moving up
        dy = -dy;           
}


function bottomCollision() {
    if (y + dy + ballRadius > canvas.height) // dy is positive when moving down
        dy = -dy;
}

function sideCollision() {
    if (x + dx - ballRadius < 0 || x + dx + ballRadius > canvas.width)
        dx = -dx;
}


var deltaP = 7;

function movePaddle() {
    if (leftPress) {
        paddleX = (paddleX - deltaP) > 0 ? paddleX - deltaP : 0; 
    } else if (rightPress) {
        paddleX = (paddleX + deltaP) < canvas.width ? paddleX + deltaP : canvas.width; 
    }
}


/* controls */

var leftPress = false;
var rightPress = false;

document.addEventListener("keydown", keyDownAction, false);
document.addEventListener('keyup', keyUpAction, false);

function keyDownAction(e) {
    console.log( "cheers ");
    if (e.key == "ArrowLeft" || e.key == "Left") {
        leftPress = true;
        // movePaddle();
    } else if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = true;
        // movePaddle();
    }   
}

function keyUpAction(e) {
    console.log("casey");
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPress = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPress = false;
    }
}


setInterval(draw, 10);



// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();



// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
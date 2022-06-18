var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");              // the 2D rendering context — the actual tool we can use to paint on the Canvas.


let x = canvas.width/2;
let y = canvas.height - 30;

dx = 4;
dy = -4;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width / 2) - (paddleWidth/2);

var bricks = [];
var bPerRow = 6;
var numRows = 4;
var brickWidth = Math.floor((canvas.width * .8) / bPerRow);
var brickHeight = Math.floor((canvas.height * .35) / numRows);
const xGap = (canvas.width * .2) / (bPerRow + 1);
const yGap = (canvas.height * .1) / (numRows);

// drawing ball function
var ballRadius = 10;
var score = 0;

for (var i=0; i<numRows;i++) {
    bricks[i] = [];
    for (var j=0; j<bPerRow;j++) {
        bricks[i][j] = { 
            x: 0,
            y: 0,
            status: 1
        }
    }
}



function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    drawBricks(3,2);
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();   // brick detection
    checkCollision();       // includes paddle, and side boundary detection
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

function drawBricks() {    
    for (var i=0; i<numRows;i++) {
        for (var j=0; j<bPerRow;j++) {
            if (bricks[i][j].status == 1) {
                var brickX = Math.floor( (j * brickWidth) + (xGap * (j+1)) * 1) /1;
                var brickY =  (i+1) * yGap + (brickHeight * i);
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                ctx.beginPath();
                ctx.rect( brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0084DD";
                ctx.fill();
                ctx.closePath();    
            }
        }
    }
    
}


function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "Chartreuse";
    ctx.fillText("Score: "+score, canvas.width / 2.1 , 12);
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
    if (y + dy + ballRadius > canvas.height) {// dy is positive when moving down
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        } else  {
        alert("game over");
        document.location.reload();
        clearInterval(myInterval);
        }

    }
}

function sideCollision() {
    if (x + dx - ballRadius < 0 || x + dx + ballRadius > canvas.width)
        dx = -dx;
}

// each time a new frame is drawn, check the coordinates of the ball against EACH brick
function collisionDetection() {
    for (var i=0;i<numRows;i++) {
        for (var j=0; j<bPerRow; j++) {
            var b = bricks[i][j];
            if (b.status == 1) {    
                if ( (x > b.x) && (x < b.x + brickWidth) && (y < b.y + brickHeight) && (y > b.y)) {
                    console.log("IMPACT: ");
                    dy = -dy;
                    b.status = 0;
                    score ++;
                }


            }
        }
    }

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


// var brickColumnCount = 5; // Height of 5
// var brickRowCount = 3; //width    of 3 
// var myAr = [];
// for (var c = 0; c < brickColumnCount; c++) {
//     myAr[c] = [];
//     for (var r = 0; r < brickRowCount; r++) {
//         myAr[c][r] = (c+1) * (r+1   );
//     }
// }

// console.log(myAr);

var myInterval = setInterval(draw, 10);


const rocket = document.querySelector('.rocket');
const fire = document.querySelector('.fire');
const explosion = document.querySelector('.explosion-container');
const smoke = document.querySelector('.smoke-container');
const fuelBar = document.querySelector('.fuel-level');
const start = document.getElementById('start');
const tryagain = document.getElementById('tryagain');
const playagain = document.getElementById('playagain');
const lossMessage = document.getElementById('gameLossScreen');
const winMessage = document.getElementById('gameWinScreen');
const maxHeight = window.innerHeight;
const gravity = 0.008;
let fuel = 200; // Initial fuel amount
document.getElementById('fuelPercentage').innerHTML=parseInt(fuel / 2);
let rocketPosition = 100;
let rocketVelocity = 0;
let isThrusting = false;
let isGameStarted = false;
let isGameOver= false;
let animationId = null;
var thrustSound1 = document.getElementById("thrustSound1");
var thrustSound2 = document.getElementById("thrustSound2");
var explosionSound = document.getElementById("explosionSound");
var landingSound = document.getElementById("landingSound");
var clickSound = document.getElementById("clickSound");
var bgSound = document.getElementById("bgSound");
var countdownSound = document.getElementById("countdownSound");

//spacebar input controls//
document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && fuel > 0 &! isGameOver) {
        isThrusting = true;
        fire.style.display = 'block';
        thrustSound1.play();
        thrustSound2.play();
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key === ' ') {
        isThrusting = false;
        fire.style.display = 'none';
        thrustSound1.pause();
        thrustSound1.load();
        thrustSound2.pause();
        thrustSound2.load();
    }
});

//button functions// 
start.onmouseover = function mouseoverstart(){
    start.style.scale=1.1;
    start.style.backgroundColor='white';
    start.style.color='black';
}
start.onmouseout = function mouseoutstart(){
    start.style.scale=1;
    start.style.backgroundColor='transparent';
    start.style.color='white';
}
start.onmousedown = function mousedownstart(){
    clickSound.play();
    start.style.display = 'none';
    controls.style.display='none';
    document.body.style.cursor='none';
    initialize();
}

tryagain.onmouseover = function mouseovertryagain(){
    tryagain.style.scale=1.1;
    tryagain.style.backgroundColor='white';
    tryagain.style.color='black';
}
tryagain.onmouseout = function mouseouttryagain(){
    tryagain.style.scale=1;
    tryagain.style.backgroundColor='transparent';
    tryagain.style.color='white';
}
tryagain.onmousedown = function mousedowntryagain(){
    clickSound.play();
    restart()
}

playagain.onmouseover = function mouseoverplayagain(){
    playagain.style.scale=1.1;
    playagain.style.backgroundColor='white';
    playagain.style.color='black';
}
playagain.onmouseout = function mouseoutplayagain(){
    playagain.style.scale=1;
    playagain.style.backgroundColor='transparent';
    playagain.style.color='white';
}
playagain.onmousedown = function mouseclickplayagain(){
    clickSound.play();
    restart()
}

//game starts here//
function initialize(){
    isGameStarted=true
    isGameOver=false

    //countdown//
    startMessage.style.display='block'
    setTimeout(function hideStartMessage(){
        startMessage.style.display='none';
    },4000);
    setTimeout(function displayThree(){
        three.style.display='inline-block';
        countdownSound.play();
    },1000)
    setTimeout(function hideThree(){
        three.style.display='none';
    },2000);
    setTimeout(function displayTwo(){
        two.style.display='inline-block';
    },2000);
    setTimeout(function hideTwo(){
        two.style.display='none';
    },3000);
    setTimeout(function displayOne(){
        one.style.display='inline-block';
    },3000);
    setTimeout(function hideOne(){
        one.style.display='none';
    },4000);

    //rocket enters moon's atmosphere//
    setTimeout(function startGame() {

        function update() {

            //background music//
            bgSound.play();
            bgSound.loop=true;
            bgSound.volume=0.5;
            
            //thrusters on//
            if (isThrusting && isGameStarted && fuel>0) {
                rocketVelocity -= 0.01;
                rocketVelocity += gravity;
                fuel -= 0.275; // Adjusted fuel consumption rate
                document.getElementById('fuelPercentage').innerHTML=parseInt(fuel / 2)
            }

            //thrusters off//
            else {
                rocketVelocity += gravity;
            }

            //calculating rocket position//
            rocketPosition += rocketVelocity;

            //calling to update fuel level in the fuel bar//
            updateFuelBar();

            //rocket crashes//
            if (rocketPosition > maxHeight - window.innerHeight / 3.5 && rocketVelocity >= 1) {
                rocketPosition = maxHeight - window.innerHeight / 3.5;
                document.body.style.cursor='auto'
                rocket.style.display = 'None';
                explosion.style.display = 'block';
                lossMessage.style.display = 'block';
                cancelAnimationFrame(animationId);
                isGameStarted=false;
                isGameOver=true;
                explosionSound.play();
                bgSound.volume=0.1
            }
            //rocket lands//
            else if (rocketPosition > maxHeight - window.innerHeight / 3.5 && rocketVelocity < 1) {
                rocketPosition = maxHeight - window.innerHeight / 3.5;
                rocketVelocity = 0;
                document.body.style.cursor='auto'
                smoke.style.display = 'block';
                winMessage.style.display = 'block';
                cancelAnimationFrame(animationId);
                isGameStarted=false;
                isGameOver=true;
                landingSound.play();
                bgSound.volume=0.1
            }

            //updating rocket position//
            rocket.style.top = rocketPosition + 'px';

            //calling current animation frame//
            if (rocketVelocity !== 0 && rocketPosition < maxHeight - window.innerHeight / 3.5) {
                animationId = requestAnimationFrame(update);
            }
        }
        
        //ending current animation frame//
        cancelAnimationFrame(animationId);

        //calling next animation frame//0
        animationId = requestAnimationFrame(update);

    },4000)
}

//updating the fuel level in fuel bar//
function updateFuelBar() {
    fuelBar.style.width = (fuel / 2) + '%'; 
    if (fuel <= 0){
        fire.style.display = 'none';
    }
}

//resetting settings before restart//
function restart() {
    isGameStarted=true;
    isGameOver=false;
    document.body.style.cursor='none';
    rocketPosition = 100;
    rocketVelocity = 0;
    fuel = 200; // Initial fuel amount
    document.getElementById('fuelPercentage').innerHTML=parseInt(fuel / 2);
    updateFuelBar();

    rocket.style.top = rocketPosition + 'px';
    rocket.style.display = 'block';
    explosion.style.display = 'none';
    smoke.style.display = 'none';
    lossMessage.style.display = 'none'; 
    winMessage.style.display = 'none'; 

    initialize();
}
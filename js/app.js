// This code implements the original Frogger game.
// Author: Martin Edson, August 25, 2015, Udacity front-end class project.

// Initiates enemy objects
// Parameters: takes enemy coordinates and enemy speed.
// Creates an enemy with coordinates, speed,  and image.
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > CANVASWIDTH) {
        this.x = 0;
    }
    this.x = Math.round(this.x + BLOCKWIDTH * dt * this.speed);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Intializes the player object.
// Sets the player's location and image.
var Player = function() {
    this.x= BLOCKWIDTH * 2;
    this.y = BOTTOM;
    this.sprite = 'images/char-boy.png';
};

// Updates the position of the player.
// If player reaches end, he wins and enemies disappear.
// Player is kept from going off the canvas.
// If player and enemy are too near, the game resets.
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;

    for (var e in allEnemies) {
        if (Math.abs(allEnemies[e].x - this.x) < BLOCKWIDTH / 2){
            if (Math.abs(allEnemies[e].y - this.y) < BLOCKHEIGHT / 2){
              this.beginGame();
            }
        }
    }

    if (this.y <= 0){
        allEnemies = [];
        this.y = -BLOCKHEIGHT / 2;
    }
    else if (this.x < 0){
        this.x = 0;
    }
    else if (this.x > CANVASWIDTH - BLOCKWIDTH){
        this.x = CANVASWIDTH - BLOCKWIDTH;
    }
    else if (this.y > BOTTOM){
        this.y = BOTTOM;
    }
};

// Renders player on the canvas and displays winner message if player hsa won.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y <= 0) {
        ctx.font = "20pt arial";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeText("WINNER", 150, 250);
        ctx.strokeText("Refresh page to play again.", 150, 350);
    }
};

// Takes they user's key input and updates the player's position accordingly.
Player.prototype.handleInput = function(key) {
    if (key === "up") {
        this.y-=BLOCKHEIGHT;
    }
    else if (key === "down") {
        this.y+=BLOCKHEIGHT;
    }
    else if (key === "right") {
        this.x+=BLOCKWIDTH;
    }
    else if (key === "left"){
        this.x-=BLOCKWIDTH;
    }
    this.update();
};

// Initiates all enemy objects with coordinates and speed and adds to array.
// Initializes the player's coordinates to the start location.
Player.prototype.beginGame = function() {
    allEnemies = [];
    var enemy1 = new Enemy(0, BLOCKHEIGHT- BLOCKHEIGHT / 2, 0.5);
    var enemy2 = new Enemy(0, BLOCKHEIGHT * 3 - BLOCKHEIGHT / 2, 1);
    var enemy3 = new Enemy(0, BLOCKHEIGHT * 4 - BLOCKHEIGHT / 2, 1.5);
    allEnemies.push(enemy1, enemy2, enemy3);

    this.x = BLOCKWIDTH * 2;
    this.y = BOTTOM;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var allEnemies;
var CANVASWIDTH = 505;
var BLOCKWIDTH = 101;
var BLOCKHEIGHT = 84;
var BOTTOM =  BLOCKHEIGHT * 5 - BLOCKHEIGHT / 2;
var player = new Player();

player.beginGame();
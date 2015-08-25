// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 600) {
      this.x = 0;
    }
    this.x = Math.round(this.x + 100 * dt * this.speed);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x= 200;
    this.y = 425;
    this.increment = 50;
    this.sprite = 'images/char-boy.png';
};

// Updates the position of the player.
// If player reaches end, he wins and enemies dissapear.
// Player is kept from going off the canvas.
// If player and enemy are too near, the game resets.
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;

    console.log(this.x, this.y);
    if (this.y < -100){
      allEnemies = [];
    }
    else if (this.x < -50){
      this.x = -50;
    }
    else if (this.x > 450){
      this.x = 450;
    }
    else if (this.y > 425){
      this.y = 425;
    }

    for (e in allEnemies) {
      if (Math.abs(allEnemies[e].x - this.x) < 30){
        if (Math.abs(allEnemies[e].y - this.y) < 30){
          beginGame();
        }
      }
    }

};
// Renders player on the canvas and displays winner message if player hsa won.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y <-100) {
      ctx.font = "25pt Arial";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeText("WINNER!", 150, 250);
      ctx.strokeText("F5 to play again.", 150, 350);
    }

};

Player.prototype.handleInput = function(key) {
    if (key === "up") {
      this.y-=this.increment;
    }
    else if (key === "down") {
      this.y+=this.increment;
    }
    else if (key === "right") {
      this.x+=this.increment;
    }
    else if (key === "left"){
      this.x-=this.increment;
    }
    this.update();

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies, player;

var beginGame = function() {
  allEnemies = [];
  var enemy1 = new Enemy(0, 0, 0.5);
  var enemy2 = new Enemy(0, 200, 1);
  allEnemies.push(enemy1, enemy2);

  player = new Player();
};

beginGame();

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

// Created a GameEntity Superclass in order to further abstract out the common features of both the player enemy entities. 
var GameEntity = function(x, y, speed, sprite){
	// Set provided parameters to initialize GameEntity object.
	this.startX = x;
	this.startY = y;
	this.x = this.startX;
	this.y = this.startY;
	this.speed = speed;
	this.sprite = sprite;
}

// Adding the render method to GameEntity to make it accessible to subclasses.
// Render method draws entities to the canvas.
GameEntity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Adding the reset method to GameEntity to make it accessible to subclasses.
// Reset method sets current location to starting coordinates.
GameEntity.prototype.reset = function(){
	this.x = this.startX;
	this.y = this.startY;
}


// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite) {
	// Extend player from GameEntity.
    GameEntity.call(this, x, y, speed, sprite);
};

Enemy.prototype.__proto__ = GameEntity.prototype;
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt;
	
	// Implement position check, ensuring enemy position is reset after boundary is hit.
	// The boundary is at 505px but adding the extra 100px will make the enemy movement more realistic.
	if (this.x > 605) {
		this.reset();
    }
	
	// Reset player position if enemy collides with player character.
	if (player.x < this.x + 75 && player.x + 65 > this.x && player.y < this.y + 50 && 70 + player.y > this.y) {
        player.reset();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed, sprite) {
	// Extend player from GameEntity.
	GameEntity.call(this, x, y, speed, sprite);
};

Player.prototype.__proto__ = GameEntity.prototype;
Player.prototype.constructor = Player;

// Update player based on canvas boundaries.
Player.prototype.update = function() {
	//Keep player within Board
    if (this.x > 402) {
        this.x = 402;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 600) {
        this.y = 600;
    }
	if (this.y < 15) {
       this.reset()   
    }
};

// Handle user input to move the player.
Player.prototype.handleInput = function(allowedKey) {
    switch (allowedKey) {
        case 'up':
            this.y -= (83);
            break;
        case 'down':
            this.y += (83);
            break;
        case 'left':
            this.x -= (101);
            break;
        case 'right':
            this.x += (101);
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Add random number of enemies on board.
var rng = Math.floor(Math.random() * 9) + 1;
var y_coords = [60,145,234,319,408];
for(var i = 0; i < rng; i++){
	var randX = Math.floor(Math.random() * - 250);
	var randY = y_coords[Math.floor(Math.random() * 5)];
	var randSpeed =  100 + Math.floor(Math.random() * 125);
    var enemy = new Enemy(randX, randY, randSpeed, 'images/enemy-bug.png');
    allEnemies.push(enemy);
}
// Place the player object in a variable called player

var player = new Player(0, 600, 100, 'images/char-boy.png');

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

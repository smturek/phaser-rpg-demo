var Rpg = Rpg || {};

Rpg.Enemy = function(state, x, y, key, data) {
    Phaser.Sprite.call(this, state.game, x, y, key);

    this.state = state;
    this.game = state.game;
    this.data = Object.create(data);
    this.anchor.setTo(0.5);

    //make properties numbers
    this.data.attack = +this.data.attack;
    this.data.defense = +this.data.defense;
    this.data.health = +this.data.health;

    //adds health bar
    this.healthBar = new Phaser.Sprite(this.game, this.x, this.y, 'preloadbar');
    this.game.add.existing(this.healthBar);
    this.healthBar.anchor.setTo(0.5);
    this.refreshHealthBar();

    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this.healthBar);
    this.body.immovable = true;
};

Rpg.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Rpg.Enemy.prototype.constructor = Rpg.Enemy;

Rpg.Enemy.prototype.refreshHealthBar = function() {
    this.healthBar.scale.setTo(this.data.health, 0.5);
};

Rpg.Enemy.prototype.update = function() {
    this.healthBar.x = this.x;
    this.healthBar.y = this.y - 25;

    this.healthBar.body.velocity = this.body.velocity;
};

Rpg.Enemy.prototype.kill = function() {
    Phaser.Sprite.prototype.kill.call(this);
    this.healthBar.kill();
}

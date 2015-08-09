var Rpg = Rpg || {};

Rpg.Enemy = function(state, x, y, key, data) {
    Phaser.Sprite.call(this, state.game, x, y, key);

    this.state = state;
    this.game = state.game;
    this.data = data;
    this.anchor.setTo(0.5);

    //make properties numbers
    this.data.attack = +this.data.attack;
    this.data.defense = +this.data.defense;
    this.data.health = +this.data.health;

    this.game.physics.arcade.enable(this);
};

Rpg.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Rpg.Enemy.prototype.constructor = Rpg.Enemy;

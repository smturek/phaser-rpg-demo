var Rpg = Rpg || {};

Rpg.Player = function(state, x, y, data) {
    Phaser.Sprite.call(this, state.game, x, y, 'player');

    this.state = state;
    this.game = state.game;
    this.data = data;

    this.anchor.setTo(0.5);

    this.animations.add('walk', [0, 1, 0], 6, false);

    this.game.physics.arcade.enable(this);
};

Rpg.Player.prototype = Object.create(Phaser.Sprite.prototype);
Rpg.Player.prototype.constructor = Rpg.Player;

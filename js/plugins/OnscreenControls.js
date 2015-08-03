Phaser.Plugin.OnscreenControls = function(game, parent) {
    Phaser.Plugin.call(this, game, parent);

    //add your own custom init logic
    this.game = game;

    console.log('Controller Plugin Ready');
};

Phaser.Plugin.OnscreenControls.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.OnscreenControls.prototype.constructor = Phaser.Plugin.OnscreenControls;

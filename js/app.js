var Rpg = Rpg || {};

Rpg.dim = Rpg.getGameLandscapeDimensions(440, 400);

Rpg.game = new Phaser.Game(Rpg.dim.w, Rpg.dim.h, Phaser.AUTO);

Rpg.game.state.add('Boot', Rpg.BootState);
Rpg.game.state.add('Preload', Rpg.PreloadState);
Rpg.game.state.add('Game', Rpg.GameState);

Rpg.game.state.start('Boot');

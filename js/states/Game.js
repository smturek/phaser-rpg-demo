var Rpg = Rpg || {};

Rpg.GameState = {
    init: function(currentLevel) {
        this.currentLevel = currentLevel ? currentLevel : 'map1';

        this.PLAYER_SPEED = 90;

        this.game.physics.arcade.gravity.y = 0;

        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    create: function() {
        this.game.OnscreenControls = this.game.plugins.add(Phaser.Plugin.OnscreenControls);

        this.loadLevel();
    },
    update: function() {

    },
    loadLevel: function() {
        this.map = this.add.tilemap(this.currentLevel);

        this.map.addTilesetImage('terrains', 'tilesheet');

        this.backgroundLayer = this.map.createLayer('backgroundLayer');
        this.collisionLayer = this.map.createLayer('collisionLayer');

        this.game.world.sendToBack(this.backgroundLayer);

        this.map.setCollisionBetween(1, 16, true, 'collisionLayer');

        this.collisionLayer.resizeWorld();

        var playerData = {
            items: [],
            health: 25,
            attack: 12,
            defense: 8,
            gold: 100,
            quests: [],
        };

        this.player = new Rpg.Player(this, 100, 100, playerData);

        this.add.existing(this.player);
    },
    gameOver: function() {
        this.game.state.start('Game', true, false, this.currentLevel);
    }
};

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
        //player stops each time
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        if(this.cursors.left.isDown || this.player.btnsPressed.left || this.player.btnsPressed.upleft || this.player.btnsPressed.downleft) {
            this.player.body.velocity.x = -this.PLAYER_SPEED;
            this.player.scale.setTo(1,1);
        }
        if(this.cursors.right.isDown || this.player.btnsPressed.right || this.player.btnsPressed.upright || this.player.btnsPressed.downright) {
            this.player.body.velocity.x = this.PLAYER_SPEED;
            this.player.scale.setTo(-1,1);
        }
        if(this.cursors.down.isDown || this.player.btnsPressed.down || this.player.btnsPressed.downright || this.player.btnsPressed.downleft) {
            this.player.body.velocity.y = this.PLAYER_SPEED;
        }
        if(this.cursors.up.isDown || this.player.btnsPressed.up || this.player.btnsPressed.upright || this.player.btnsPressed.upleft) {
            this.player.body.velocity.y = -this.PLAYER_SPEED;
        }

        //stop all movement if nothing is being pressed
        if(this.game.input.activePointer.isUp) {
            this.game.OnscreenControls.stopMovement();
        }

        //play walking animation while player is moving
        if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
            this.player.play('walk');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 0;
        }

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

        //group of items
        this.items = this.add.group();

        var potion = new Rpg.Item(this, 100, 150, 'potion', {health: 10});
        this.items.add(potion);

        var sword = new Rpg.Item(this, 100, 180, 'sword', {attack: 2});
        this.items.add(sword);

        var shield = new Rpg.Item(this, 100, 210, 'shield', {defense: 2});
        this.items.add(shield);

        var treasure = new Rpg.Item(this, 100, 240, 'chest', {gold: 100});
        this.items.add(sword);

        var questItem = new Rpg.Item(this, 100, 270, 'scroll', {isQuest: true, questCode: 'magic-scroll'});
        this.items.add(shield);

        this.initGUI();
    },
    gameOver: function() {
        this.game.state.start('Game', true, false, this.currentLevel);
    },
    initGUI: function() {
        //onscreen controls setup
        this.game.OnscreenControls.setup(this.player, {
            left: true,
            right: true,
            up: true,
            down: true,
            upleft: true,
            downleft: true,
            upright: true,
            downright: true,
            action: true
        });
    }
};

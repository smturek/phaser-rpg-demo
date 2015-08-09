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

        //player can't walk through walls
        this.game.physics.arcade.collide(this.player, this.collisionLayer);

        //items collection
        this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

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
        if(this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) {
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
            quests: [
                {
                    name: 'Find the Magic Scroll',
                    code: 'magic-scroll',
                    isCompleted: false
                },
                {
                    name: 'Find the Helmet of the Gods',
                    code: 'gods-helmet',
                    isCompleted: false
                }
            ],
        };

        this.player = new Rpg.Player(this, 100, 100, playerData);

        this.add.existing(this.player);

        //group of items
        this.items = this.add.group();
        this.loadItems();

        //group of enemies
        this.enemies = this.add.group();
        this.loadEnemies();

        this.battle = new Rpg.Battle(this.game);

        //follow player with camera
        this.game.camera.follow(this.player);

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

        this.showPlayerIcons();
    },
    collect: function(player, item) {
        this.player.collectItem(item);
    },
    showPlayerIcons: function() {
        var style = {font: '14px Arial', fill: '#fff'};

        //gold icon
        this.goldIcon = this.add.sprite(10, 10, 'coin');
        this.goldIcon.fixedToCamera = true;

        this.goldLabel = this.add.text(30,10, '0', style);
        this.goldLabel.fixedToCamera = true;

        //attack icon
        this.attackIcon = this.add.sprite(70, 10, 'sword');
        this.attackIcon.fixedToCamera = true;

        this.attackLabel = this.add.text(90,10, '0', style);
        this.attackLabel.fixedToCamera = true;

        //defense icon
        this.defenseIcon = this.add.sprite(130, 10, 'shield');
        this.defenseIcon.fixedToCamera = true;

        this.defenseLabel = this.add.text(150,10, '0', style);
        this.defenseLabel.fixedToCamera = true;

        this.refreshStats();
    },
    refreshStats: function() {
        this.goldLabel.text = this.player.data.gold;
        this.attackLabel.text = this.player.data.attack;
        this.defenseLabel.text = this.player.data.defense;
    },
    findObjectsByType: function(targetType, tilemap, layer) {
        var result = [];

        tilemap.objects[layer].forEach(function(element) {
            if(element.properties.type == targetType) {
                element.y -= tilemap.tileHeight/2;
                element.x += tilemap.tileHeight/2;
                result.push(element);
            }
        }, this);
        return result;
    },
    loadItems: function() {
        var elementsArray = this.findObjectsByType('item', this.map, 'objectsLayer');
        var elementObj;

        elementsArray.forEach(function(element) {
            elementObj = new Rpg.Item(this, element.x, element.y, element.properties.asset, element.properties);
            this.items.add(elementObj);
        }, this);
    }
};

var Rpg = Rpg || {};

Rpg.Player = function(state, x, y, data) {
    Phaser.Sprite.call(this, state.game, x, y, 'player');

    this.state = state;
    this.game = state.game;
    this.data = Object.create(data);

    this.anchor.setTo(0.5);

    this.animations.add('walk', [0, 1, 0], 6, false);

    //adds health bar
    this.healthBar = new Phaser.Sprite(this.game, this.x, this.y, 'preloadbar');
    this.game.add.existing(this.healthBar);
    this.healthBar.anchor.setTo(0.5);
    this.refreshHealthBar();

    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this.healthBar);
};

Rpg.Player.prototype = Object.create(Phaser.Sprite.prototype);
Rpg.Player.prototype.constructor = Rpg.Player;

Rpg.Player.prototype.collectItem = function(item) {
    //two types of items: quest items and consumables
    if(item.data.isQuest) {
        this.data.items.push(item);

        //check for quest completion
        this.checkQuestCompletion(item);
    }
    else {
        //consumable items

        //add properties
        this.data.health += item.data.health ? item.data.health : 0;
        this.data.attack += item.data.attack ? item.data.attack : 0;
        this.data.defense += item.data.defense ? item.data.defense : 0;
        this.data.gold += item.data.gold ? item.data.gold : 0;

        //refresh stats
        this.state.refreshStats();
    }
    item.kill();
};

Rpg.Player.prototype.checkQuestCompletion = function(item) {
    var i = 0;
    var length = this.data.quests.length;

    while(i < length) {
        if(this.data.quests[i].code == item.data.questCode) {
            this.data.quests[i].isCompleted = true;
            console.log(this.data.quests[i].name + ' has been completed');
            break;
        }
        i++;
    }
};

Rpg.Player.prototype.refreshHealthBar = function() {
    this.healthBar.scale.setTo(this.data.health, 0.5);
};

Rpg.Player.prototype.update = function() {
    this.healthBar.x = this.x;
    this.healthBar.y = this.y - 25;

    this.healthBar.body.velocity = this.body.velocity;
};

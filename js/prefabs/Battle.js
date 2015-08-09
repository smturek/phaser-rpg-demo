var Rpg = Rpg || {};

Rpg.Battle = function(game) {
    this.game = game;
};

Rpg.Battle.prototype.attack = function(attacker, attacked) {
    var damage = Math.max(0, attacker.data.attack * Math.random() - attacked.data.defense * Math.random());

    console.log(damage);

    attacked.data.health -= damage;

    if(attacked.data.health <= 0) {
        attacked.kill();
    }
};

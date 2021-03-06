class Totem {
    constructor(game, x, y, color, scale, velocity) {
        Object.assign(this, { game, x, y, color, scale, velocity});
        this.spritesheetBlue = ASSET_MANAGER.getAsset("./resources/sprites/BlueTotem.png");
        this.spritesheetRed = ASSET_MANAGER.getAsset("./resources/sprites/RedTotem.png");

        this.colors = { blue : 0, red : 1};
        this.actions = { appear : 0, idle : 1, attack : 2, disappear : 3};
        this.action = this.actions.appear;

        this.width = 64 * this.scale;
        this.height = 96 * this.scale;
        this.velocity = this.velocity * 0.91;

        this.dead = false;
        this.isHit = false;
        this.canHurt = true;

        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    update() {
        const TICK = this.game.clockTick;
        if (this.dead) {
            if (!this.deathSound) {
                this.deathSound = true;
                let audio = ASSET_MANAGER.cache["./resources/sfx/totemDeath.mp3"].cloneNode(true);
                audio.volume = document.getElementById("volume").value;
                audio.play();
            }
            this.action = this.actions.disappear;
            if (this.animations[this.color][this.action].isDone()) this.removeFromWorld = true;
        }
        if (this.action == this.actions.appear && this.animations[this.color][this.actions.appear].isDone()) this.action = this.color == this.colors.blue ? this.actions.idle : this.actions.attack;
        this.x -= this.velocity * TICK;
        if (this.x + this.width <= 0) this.removeFromWorld = true;
        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Totem) {
                    if ((that.BB.bottom < entity.BB.bottom && that.game.isBehind(that, entity)) || (that.BB.bottom >= entity.BB.bottom && !that.game.isBehind(that, entity))) that.game.swapEntity(that, entity);
                }
            }
        });
    };

    draw(ctx) {
        this.animations[this.color][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
            for (var j = 0; j < 4; j++) {
                this.animations[i].push([]);
            }
        }
        this.animations[this.colors.blue][this.actions.appear] = new Animator(this.spritesheetBlue, 0, 0, 64, 96, 8, 0.1, 0, false, false);
        this.animations[this.colors.blue][this.actions.idle] = new Animator(this.spritesheetBlue, 0, 96, 64, 96, 7, 0.1, 0, false, true);
        this.animations[this.colors.blue][this.actions.attack] = new Animator(this.spritesheetBlue, 0, 288, 64, 96, 7, 0.1, 0, false, true);
        this.animations[this.colors.blue][this.actions.disappear] = new Animator(this.spritesheetBlue, 0, 384, 64, 96, 14, 0.08, 0, false, false);

        this.animations[this.colors.red][this.actions.appear] = new Animator(this.spritesheetRed, 0, 0, 64, 96, 8, 0.1, 0, false, false);
        this.animations[this.colors.red][this.actions.idle] = new Animator(this.spritesheetRed, 0, 96, 64, 96, 7, 0.1, 0, false, true);
        this.animations[this.colors.red][this.actions.attack] = new Animator(this.spritesheetRed, 0, 288, 64, 96, 7, 0.1, 0, false, true);
        this.animations[this.colors.red][this.actions.disappear] = new Animator(this.spritesheetRed, 0, 384, 64, 96, 14, 0.08, 0, false, false);
    };

    updateBB() {
        this.getOffsets();
        this.BB = new BoundingBox(this.x + this.offsetx, this.y, this.width, this.height);
    };

    getOffsets() {
        switch (this.action) {
            case 1:
                this.offsetx = 15 * this.scale;
                this.width = 35 * this.scale;
                break;
            case 2:
                this.offsetx = 15 * this.scale;
                this.width = 35 * this.scale;
                break;
        }
    };
};

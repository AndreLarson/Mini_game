class Totem {
    constructor(game, x, y, color, scale) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.color = color; // 0 = blue, 1 = red
        this.scale = scale;
        this.spritesheetBlue = ASSET_MANAGER.getAsset("./resources/sprites/BlueTotem.png");
        this.spritesheetRed = ASSET_MANAGER.getAsset("./resources/sprites/RedTotem.png");
        this.action = 0; // 0 = appear, 1 = idle, 2 = attack, 3 = disappear
        this.width = 64 * this.scale;
        this.height = 96 * this.scale;
        this.velocity = { x : 520 };
        this.dead = false;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
            for (var j = 0; j < 4; j++) {
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(this.spritesheetBlue, 0, 0, 64, 96, 8, 0.1, 0, false, false, false); // loop false
        this.animations[0][1] = new Animator(this.spritesheetBlue, 0, 96, 64, 96, 7, 0.1, 0, false, true, false);
        this.animations[0][2] = new Animator(this.spritesheetBlue, 0, 288, 64, 96, 7, 0.1, 0, false, true, false); // loop false
        this.animations[0][3] = new Animator(this.spritesheetBlue, 0, 384, 64, 96, 14, 0.08, 0, false, false, false); // loop false

        this.animations[1][0] = new Animator(this.spritesheetRed, 0, 0, 64, 96, 8, 0.1, 0, false, false, false); // loop false
        this.animations[1][1] = new Animator(this.spritesheetRed, 0, 96, 64, 96, 7, 0.1, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheetRed, 0, 288, 64, 96, 7, 0.1, 0, false, true, false); // loop false
        this.animations[1][3] = new Animator(this.spritesheetRed, 0, 384, 64, 96, 14, 0.08, 0, false, false, false); // loop false
    };

    getOffsets() {
        switch (this.action) {
            case 1:
                this.offsetx = 15 * this.scale;
                this.offsety = 35 * this.scale;
                this.width = 35 * this.scale;
                this.height = 56 * this.scale;
                break;
            case 2:
                this.offsetx = 15 * this.scale;
                this.offsety = 35 * this.scale;
                this.width = 35 * this.scale;
                this.height = 56 * this.scale;
                break;
        }
    };

    updateBB() {
        this.BB = new BoundingBox(this.x + this.offsetx, this.y + this.offsety, this.width, this.height);
    };

    update() {
        const TICK = this.game.clockTick;
        if (this.dead) {
            this.action = 3;
            if (this.animations[this.color][this.action].isDone()) {
                this.removeFromWorld = true;
            }
        }
        if (this.action == 0 && this.animations[this.color][this.action].isDone()) {
            this.action = this.color == 0 ? 1 : 2;
        }
        this.x -= this.velocity.x * TICK;
        this.getOffsets();
        this.updateBB();
    };

    draw(ctx) {
        this.animations[this.color][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        // this.animations[0][0].drawFrame(this.game.clockTick, ctx, 0 * this.scale, 0 * this.scale, this.scale);
        // this.animations[0][1].drawFrame(this.game.clockTick, ctx, 64 * this.scale, 0 * this.scale, this.scale);
        // this.animations[0][2].drawFrame(this.game.clockTick, ctx, 128 * this.scale, 0 * this.scale, this.scale);
        // this.animations[0][3].drawFrame(this.game.clockTick, ctx, 192 * this.scale, 0 * this.scale, this.scale);
        //
        // this.animations[1][0].drawFrame(this.game.clockTick, ctx, 0 * this.scale, 96 * this.scale, this.scale);
        // this.animations[1][1].drawFrame(this.game.clockTick, ctx, 64 * this.scale, 96 * this.scale, this.scale);
        // this.animations[1][2].drawFrame(this.game.clockTick, ctx, 128 * this.scale, 96 * this.scale, this.scale);
        // this.animations[1][3].drawFrame(this.game.clockTick, ctx, 192 * this.scale, 96 * this.scale, this.scale);

        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };

}

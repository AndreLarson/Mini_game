class Totem {
    constructor(game, x, y, color) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.color = color; // 0 = blue, 1 = red
        this.spritesheetBlue = ASSET_MANAGER.getAsset("./resources/sprites/BlueTotem.png");
        this.spritesheetRed = ASSET_MANAGER.getAsset("./resources/sprites/RedTotem.png");
        this.action = 0; // 0 = appear, 1 = idle, 2 = attack, 3 = disappear
        this.scale = 2;
        this.width = 64 * this.scale;
        this.height = 96 * this.scale;
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
            for (var j = 0; j < 4; j++) {
                this.animations[i].push([]);
            }
        }

        this.animations[0][0] = new Animator(this.spritesheetBlue, 0, 0, 64, 96, 8, 0.1, 0, false, true, false); // loop false
        this.animations[0][1] = new Animator(this.spritesheetBlue, 0, 96, 64, 96, 7, 0.1, 0, false, true, false);
        this.animations[0][2] = new Animator(this.spritesheetBlue, 0, 288, 64, 96, 7, 0.1, 0, false, true, false); // loop false
        this.animations[0][3] = new Animator(this.spritesheetBlue, 0, 384, 64, 96, 14, 0.08, 0, false, true, false); // loop false

        this.animations[1][0] = new Animator(this.spritesheetRed, 0, 0, 64, 96, 8, 0.1, 0, false, true, false); // loop false
        this.animations[1][1] = new Animator(this.spritesheetRed, 0, 96, 64, 96, 7, 0.1, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheetRed, 0, 288, 64, 96, 7, 0.1, 0, false, true, false); // loop false
        this.animations[1][3] = new Animator(this.spritesheetRed, 0, 384, 64, 96, 14, 0.08, 0, false, true, false); // loop false
    };

    updateBB() {

    };

    update() {

    };

    draw(ctx) {
        this.animations[0][0].drawFrame(this.game.clockTick, ctx, 0 * this.scale, 0 * this.scale, this.scale);
        this.animations[0][1].drawFrame(this.game.clockTick, ctx, 64 * this.scale, 0 * this.scale, this.scale);
        this.animations[0][2].drawFrame(this.game.clockTick, ctx, 128 * this.scale, 0 * this.scale, this.scale);
        this.animations[0][3].drawFrame(this.game.clockTick, ctx, 192 * this.scale, 0 * this.scale, this.scale);

        this.animations[1][0].drawFrame(this.game.clockTick, ctx, 0 * this.scale, 96 * this.scale, this.scale);
        this.animations[1][1].drawFrame(this.game.clockTick, ctx, 64 * this.scale, 96 * this.scale, this.scale);
        this.animations[1][2].drawFrame(this.game.clockTick, ctx, 128 * this.scale, 96 * this.scale, this.scale);
        this.animations[1][3].drawFrame(this.game.clockTick, ctx, 192 * this.scale, 96 * this.scale, this.scale);
    };

}

class Background {
    constructor() {
        this.farLayer = ASSET_MANAGER.getAsset("./resources/background/far-buildings.png");
        this.backLayer = ASSET_MANAGER.getAsset("./resources/background/back-buildings.png");
        this.foregroundLayer = ASSET_MANAGER.getAsset("./resources/background/foreground.png");
        this.farAcc = 0.3;
        this.backAcc = 0.6;
        this.foregroundAcc = 0.9;
    };
};

class Layer {
    constructor(game, img, acceleration) {
        Object.assign(this, { game, img, acceleration});
        this.velocity = this.gameSpeed * this.acceleration;
        this.gameSpeed = PARAMS.INITIAL_GAME_SPEED;
        this.x = 0;
        this.y = 0;
        this.width = PARAMS.CANVAS_WIDTH;
        this.height = PARAMS.CANVAS_HEIGHT;
    };

    incrementGameSpeed(increment) {
        this.gameSpeed = increment;
    };

    update() {
        this.velocity = this.gameSpeed * this.acceleration;
        this.x -= this.velocity * this.game.clockTick;
        if (this.x < -this.width) this.x = 0;
    };

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
    };
};

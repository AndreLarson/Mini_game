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
    constructor(img, acceleration, gameSpeed) {
        this.img = img;
        this.acceleration = acceleration;
        this.gameSpeed = gameSpeed;
        this.speed = this.gameSpeed * this.acceleration;
        this.x = 0;
        this.y = 0;
        this.width = PARAMS.CANVAS_WIDTH;
        this.height = PARAMS.CANVAS_HEIGHT;
        this.frames = 0;
    };

    incrementGameSpeed(increment) {
        this.gameSpeed += increment;
    }

    update() {
        this.speed = this.gameSpeed * this.acceleration;
        this.x = this.speed != 0 ? this.frames * this.speed % this.width : this.x;
        this.frames--;
    };

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
    };
};

class SceneManager {

    constructor(game) {
        this.game = game;
        this.game.scene = this;
        this.gameSpeed = 4;
        var background = new Background();
        this.game.addEntity(new Layer(background.farLayer, background.farAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.backLayer, background.backAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.foregroundLayer, background.foregroundAcc, this.gameSpeed));
        this.game.addEntity(new NightBorne(this.game));
        this.spawnTimer = 0;
        this.pattern = new TotemPattern(this.game);
    };

    update() {
        this.spawnTimer += this.game.clockTick;
        if (this.spawnTimer >= 5) {
            this.pattern.bottomRow(1, 0);
            this.pattern.topRow(0, 2);
            this.spawnTimer = 0;
        }
    };

    draw(ctx) {

    };

}

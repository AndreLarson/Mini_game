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
        //this.loadLevel(someLevelName, mainCharStartX, mainCharStartY, isTransition, isTitle);
    };

    // loadLevel(level, x, y, transition, title) {
    //
    // };

    update() {
        this.spawnTimer += this.game.clockTick;
        const SCALE = 2;
        if (this.spawnTimer >= 5) {
            this.game.addEntity(new Totem(this.game, 1440, 720 - (96 * SCALE), 1, SCALE));
            this.game.addEntity(new Totem(this.game, 1440 + (64 * SCALE), 768 - (96 * SCALE), 0, SCALE));
            this.spawnTimer = 0;
        }
    };

    draw(ctx) {

    };

}

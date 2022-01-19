class SceneManager {
    constructor(game) {
        this.game = game;
        this.gameSpeed = 4;
        this.game.addEntity(new NightBorne(this.game));
        const SCALE = 2;
        this.game.addEntity(new Totem(this.game, 1024 - (64 * SCALE), 720 - (96 * SCALE), 0, SCALE));
        var background = new Background();
        this.game.addEntity(new Layer(background.foregroundLayer, background.foregroundAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.backLayer, background.backAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.farLayer, background.farAcc, this.gameSpeed));
        //this.loadLevel(someLevelName, mainCharStartX, mainCharStartY, isTransition, isTitle);
    };

    loadLevel(level, x, y, transition, title) {

    };

    update() {

    };

    draw(ctx) {

    };

}

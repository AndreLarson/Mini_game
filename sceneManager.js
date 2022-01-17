class SceneManager {
    constructor(game) {
        this.game = game;
        this.gameSpeed = 4;
        this.game.addEntity(new NightBorne(this.game));
        this.game.addEntity(new Totem(this.game, 0, 0, 0));
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

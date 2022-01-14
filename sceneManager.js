class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.addEntity(new Knight(this.game));
        //this.loadLevel(someLevelName, mainCharStartX, mainCharStartY, isTransition, isTitle);
    };

    loadLevel(level, x, y, transition, title) {

    };

    update() {

    };

    draw(ctx) {

    };

}

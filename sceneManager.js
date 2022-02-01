class SceneManager {

    constructor(game) {
        this.game = game;
        this.game.scene = this;
        this.gameSpeed = 4;
        this.spawnTimer = 0;
        this.loadStartMenu();
        // load start menu
    };

    loadStartMenu() {
        var background = new Background();
        this.game.addEntity(new Layer(background.farLayer, background.farAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.backLayer, background.backAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.foregroundLayer, background.foregroundAcc, this.gameSpeed));
        this.game.addEntity(new NightBorne(this.game));
        // have a start button in the middle of the screen
        // if clicked loadLevel()
    };

    loadLevel() {
        this.pattern = new TotemPattern(this.game);
        this.gameStart = true;
        // draw score on top right
            // update score on successful collisions
        // draw heath on top left
            // update health on unsuccessful collisions
            // if dead load death screen
    };

    loadDeathScreen() {

    };

    update() {
        if (this.gameStart) {
            this.spawnTimer += this.game.clockTick;
            if (this.spawnTimer >= 5) {
                this.pattern.bottomRow(1, 0);
                this.pattern.topRow(0, 2);
                this.spawnTimer = 0;
            }
        }
    };

    draw(ctx) {

    };

}

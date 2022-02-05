class SceneManager {

    constructor(game) {
        this.game = game;
        this.game.scene = this;
        this.gameSpeed = 4;
        this.spawnTimer = 0;
        this.deathScreen = false;
        this.deathScreenShown = false;
        this.gameStart = false;
        this.startMenu = false;
        this.endScore = 0;
        this.loadStartMenu();
        // load start menu
    };

    loadStartMenu() {
        this.startMenu = true;
        var background = new Background();
        this.game.addEntity(new Layer(background.farLayer, background.farAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.backLayer, background.backAcc, this.gameSpeed));
        this.game.addEntity(new Layer(background.foregroundLayer, background.foregroundAcc, this.gameSpeed));
        this.player = new NightBorne(this.game);
        this.game.addEntity(this.player);
    };

    loadLevel() {
        this.pattern = new TotemPattern(this.game);
        this.gameStart = true;
    };

    loadDeathScreen() {
        this.deathScreen = true;
        this.endScore = this.player.score;
    };

    update() {
        if (this.player.dead) {
            this.gameStart = false;
            this.loadDeathScreen();
        }
        if (this.game.keyPress) {
            if (this.startMenu) {
                this.startMenu = false;
                this.loadLevel();
            } else if (this.deathScreenShown) {
                this.deathScreen = false;
                this.deathScreenShown = false;
                this.loadStartMenu();
            }
        }
        if (this.gameStart) {
            this.spawnTimer += this.game.clockTick;
            if (this.spawnTimer >= 5) {
                this.pattern.bottomRow(1, 0);
                this.pattern.topRow(0, 2);
                this.spawnTimer = 0;
                // pattern generation here
            }
        }
    };

    draw(ctx) {
        if (this.startMenu) {
            ctx.font = '40px "Press Start 2P"';
            ctx.fillStyle = "White";
            ctx.fillText("Press any key to start", (PARAMS.CANVAS_WIDTH / 2) - ((40 * 22) / 2), PARAMS.CANVAS_HEIGHT / 2);
        }
        if (this.gameStart) {
            ctx.font = '30px "Press Start 2P"';
            ctx.fillStyle = "White";
            var digits = this.player.score == 0 ? 1 : Math.floor(Math.log10(this.player.score) + 1);
            ctx.fillText("Score:" + this.player.score, PARAMS.CANVAS_WIDTH - (30 * (6 + digits)), 35);
            // draw heath on top left
        }
        if (this.deathScreen) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            if (this.game.entities.length == 0) {
                var digits = this.endScore == 0 ? 1 : Math.floor(Math.log10(this.endScore) + 1);
                ctx.font = '40px "Press Start 2P"';
                ctx.fillStyle = "White";
                ctx.fillText("You died", (PARAMS.CANVAS_WIDTH / 2) - ((40 * 8) / 2), (PARAMS.CANVAS_HEIGHT / 2) - 40);
                ctx.fillText("Score:" + this.endScore, (PARAMS.CANVAS_WIDTH / 2) - ((40 * (6 + digits)) / 2), (PARAMS.CANVAS_HEIGHT / 2) + 40);
                ctx.fillText("Press any key to play again", (PARAMS.CANVAS_WIDTH / 2) - ((40 * 27) / 2), (PARAMS.CANVAS_HEIGHT / 2) + 120);
                this.deathScreenShown = true;
            }
        }
    };

}

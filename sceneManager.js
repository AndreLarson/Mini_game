class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.scene = this;

        this.deathScreen = false;
        this.deathScreenShown = false;
        this.gameStart = false;
        this.startMenu = false;
        this.loadPatterns();
        this.loadStartMenu();
    };

    update() {
        this.updateDebug();
        // if dead load death screen
        if (this.player.dead && this.gameStart) {
            this.gameStart = false;
            this.loadDeathScreen();
        }
        // start game if key pressed while on start menu or death screen
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
        // game logic for when the game has started
        if (this.gameStart) {
            this.incrementTimers();
            // gradually increase speed after the warmup time
            if (this.warmUpTimer >= 10) {
                if (this.gameSpeedTimer >= 0.005 && this.gameSpeed < 1040) {
                    var that = this;
                    this.game.entities.forEach(function (entity) {
                        if (entity instanceof Layer) {
                            that.gameSpeed += 0.01;
                            entity.incrementGameSpeed(that.gameSpeed);
                        }
                    });
                    this.gameSpeedTimer = 0;
                }
            }
            // decrease time between totem spawns over time
            if (this.spawnIntervalTimer >= 30 && this.spawnInterval >= 1) {
                this.spawnInterval -= 0.5;
                this.spawnIntervalTimer = 0;
            }
            // random generation of totem patterns
            if (this.spawnTimer >= this.spawnInterval) {
                this.color = randomInt(2);
                this.offset = 0;
                this.count = randomInt(5) + 3;
                this.patterns[randomInt(4)](this.color, this.offset, this.count, this.gameSpeed * 0.9);
                this.spawnTimer = 0;
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

    updateDebug() {
        if(this.game.debug) {
            this.game.debug = false;
            document.getElementById("debug").checked = !document.getElementById("debug").checked;
        }
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let mute = document.getElementById("mute").checked;
        let volume = document.getElementById("volume").value;
        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    loadPatterns() {
        this.pattern = new TotemPattern(this.game);
        let that = this;
        let topPattern = function() { that.pattern.topRow(that.color, that.offset, that.count, that.gameSpeed) };
        let bottomPattern = function() { that.pattern.bottomRow(that.color, that.offset, that.count, that.gameSpeed) };
        let zzPattern = function() { that.pattern.zigZag(that.color, that.offset, that.count, that.gameSpeed) };
        let wallPattern = function() { that.pattern.walls(that.color, that.offset, that.count, that.gameSpeed) };
        this.patterns = [topPattern, bottomPattern, zzPattern, wallPattern];
    };

    loadStartMenu() {
        var background = new Background();
        this.game.addEntity(new Layer(this.game, background.farLayer, background.farAcc));
        this.game.addEntity(new Layer(this.game, background.backLayer, background.backAcc));
        this.game.addEntity(new Layer(this.game, background.foregroundLayer, background.foregroundAcc));
        this.player = new NightBorne(this.game);
        this.game.addEntity(this.player);
        this.startMenu = true;
    };

    loadLevel() {
        this.resetGameState();
        ASSET_MANAGER.pauseBackgroundMusic();
        let bgm = [];
        bgm[0] = "./resources/sfx/bgm1.mp3";
        bgm[1] = "./resources/sfx/bgm2.mp3";
        ASSET_MANAGER.forcePlayMusic(bgm[randomInt(2)]);
        this.gameStart = true;
    };

    loadDeathScreen() {
        ASSET_MANAGER.playAsset("./resources/sfx/playerDeath.mp3");
        this.deathScreen = true;
        this.endScore = this.player.score;
    };

    resetGameState() {
        this.spawnIntervalTimer = 0;
        this.gameSpeedTimer = 0;
        this.warmUpTimer = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 5;
        this.gameSpeed = PARAMS.INITIAL_GAME_SPEED;
    };

    incrementTimers() {
        this.spawnIntervalTimer += this.game.clockTick;
        this.spawnTimer += this.game.clockTick;
        this.gameSpeedTimer += this.game.clockTick;
        this.warmUpTimer += this.game.clockTick;
    };

};

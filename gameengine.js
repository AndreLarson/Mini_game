// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011
class GameEngine {
    constructor(options) {
        this.ctx = null;
        this.entities = [];
        this.entitiesToAdd = [];
        this.up = null;
        this.down = null;
        this.attack = null;
        this.debug = null;
        this.running = false;
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        var that = this;
        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "KeyD":
                    that.keyPress = true;
                    that.down = true;
                    break;
                case "KeyA":
                    that.keyPress = true;
                    that.up = true;
                    break;
                case "KeyW":
                    that.keyPress = true;
                    that.attack = true;
                    break;
                default:
                    that.keyPress = true;
                    break;
            }
        }, false);
        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "KeyD":
                    that.keyPress = false;
                    that.down = false;
                    break;
                case "KeyA":
                    that.keyPress = false;
                    that.up = false;
                    break;
                default:
                    that.keyPress = false;
                    break;
            }
        }, false);
    };

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    swapEntity(entity1, entity2) {
        var a = this.entities.indexOf(entity1);
        var b = this.entities.indexOf(entity2);
        this.entities[a] = entity2;
        this.entities[b] = entity1;
    };

    isBehind(entity1, entity2) {
        var a = this.entities.indexOf(entity1);
        var b = this.entities.indexOf(entity2);
        return a < b;
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        if (this.scene.deathScreen) { // If deathScreen draw the scene first, then the entities
            this.scene.draw(this.ctx);
            for (let i = this.entities.length - 1; i >= 0; i--) {
                this.entities[i].draw(this.ctx, this);
            }
        } else { // else, entities, then scene
            for (let i = this.entities.length - 1; i >= 0; i--) {
                this.entities[i].draw(this.ctx, this);
            }
            this.scene.draw(this.ctx);
        }
    };

    update() {
        // Update Entities
        this.entities.forEach(entity => entity.update(this));
        // Remove dead things
        this.entities = this.entities.filter(entity => !entity.removeFromWorld);
        // Add new things
        this.entitiesToAdd.forEach(entity => this.entities.unshift(entity));
        // Clear entities to add
        this.entitiesToAdd = [];
        // Call sceneManager update
        this.scene.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    get["deltaTime"]() { return this.clockTick; }
};

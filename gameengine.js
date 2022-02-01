// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Context dimensions
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];

        // Information on the input
        this.click = null;
        // this.mouse = null;
        // this.wheel = null;
        this.up = null;
        this.down = null;
        this.attack = null;

        // THE KILL SWITCH
        this.running = false;

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
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

        const getXandY = e => ({
            x: e.clientX - that.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - that.ctx.canvas.getBoundingClientRect().top
        });

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "KeyD":
                    that.down = true;
                    break;
                case "KeyA":
                    that.up = true;
                    break;
                case "KeyW":
                    that.attack = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "KeyD":
                    that.down = false;
                    break;
                case "KeyA":
                    that.up = false;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            console.log("CLICK", getXandY(e));
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            if (this.options.prevent.scrolling) {
                e.preventDefault(); // Prevent Scrolling
            }
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            if (this.options.prevent.contextMenu) {
                e.preventDefault(); // Prevent Context Menu
            }
            this.rightclick = getXandY(e);
        });
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

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
        this.scene.draw(this.ctx);
    };

    update() {
        // Update Entities
        this.entities.forEach(entity => entity.update(this));

        // Remove dead things
        this.entities = this.entities.filter(entity => !entity.removeFromWorld);

        // Add new things
        this.entitiesToAdd.forEach(entity => this.entities.unshift(entity));
        //this.entities = this.entities.concat(this.entitiesToAdd);
        this.entitiesToAdd = [];
        this.scene.update();
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

    get["deltaTime"]() { return this.clockTick; }
};

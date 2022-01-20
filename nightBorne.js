class NightBorne {
    constructor(game) {
        this.game = game;
        this.scale = 3.5;
        this.animations = [];
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/sprites/NightBorne.png");
        this.action = 1;
        this.x = 150;
        this.y = 500;
        this.velocity = { x : 0, y : 0 };
        this.getOffsets(this.action);
        this.loadAnimations();
        this.updateBB();
    };

    updateBB() {
        this.BB = new BoundingBox(this.x + this.offsetx, this.y + this.offsety, this.width, this.height);
    };

    loadAnimations() {
        for (var i = 0; i < 5; i++) {
            this.animations.push([]);
        }
        this.animations[0] = new Animator(this.spritesheet, 0, 0, 80, 80, 9, 0.09, 0, false, true, false);
        this.animations[1] = new Animator(this.spritesheet, 0, 80, 80, 80, 6, 0.1, 0, false, true, false);
        this.animations[2] = new Animator(this.spritesheet, 0, 160, 80, 80, 12, 0.05, 0, false, false, false);
        this.animations[3] = new Animator(this.spritesheet, 0, 240, 80, 80, 5, 0.1, 0, false, false, false);
        this.animations[4] = new Animator(this.spritesheet, 0, 320, 80, 80, 23, 0.07, 0, false, true, false);

    };

    getOffsets() {
        switch (this.action) {
            case 0:
            case 1:
                this.offsetx = 19 * this.scale;
                this.offsety = 33 * this.scale;
                this.width = 35 * this.scale;
                this.height = 31 * this.scale;
                break;
            case 2:
                this.offsetx = 19 * this.scale;
                this.offsety = 9 * this.scale;
                this.width = 60 * this.scale;
                this.height = 55 * this.scale;
                break;
            case 3:
                this.offsetx = 19 * this.scale;
                this.offsety = 30 * this.scale;
                this.width = 35 * this.scale;
                this.height = 34 * this.scale;
                break;
            case 4:
                this.offsetx = 0;
                this.offsety = 10 * this.scale;
                this.width = 80 * this.scale;
                this.height = 70 * this.scale;
                break;
        }
    };

    update() {
        const TICK = this.game.clockTick;
        const MAX_WALK = 200;
        this.velocity.y = 0;

        if (this.animations[3].isDone()) {
            this.action = 1;
            this.animations[3].elapsedTime = 0;
        }
        if (this.game.down) {
            this.velocity.y += MAX_WALK;
        } else if (this.game.up) {
            this.velocity.y -= MAX_WALK;
        }
        if (this.game.attack) {
            this.action = 2;
            if (this.animations[this.action].isDone()) {
                this.action = 1;
                this.game.attack = false;
            }
        } else {
            this.animations[2].elapsedTime = 0;
        }
        this.y += this.velocity.y * TICK;
        this.getOffsets();
        this.updateBB();
        if (this.BB.bottom >= PARAMS.CANVAS_HEIGHT) {
            this.y = PARAMS.CANVAS_HEIGHT - this.height - this.offsety;
            this.updateBB();
        }
        if (this.BB.bottom <= 673) {
            this.y -= this.velocity.y * TICK;
        }
        var that = this;
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {
                if (entity instanceof Totem) {
                    if ((that.BB.bottom < entity.BB.bottom && that.game.isBehind(that, entity)) ||
                        (that.BB.bottom >= entity.BB.bottom && !that.game.isBehind(that, entity))) {
                        that.game.swapEntity(that, entity);
                    }
                    if (entity.color == 1 && that.action == 2 && that.BB.bottom < entity.BB.bottom) {
                        entity.dead = true;
                    } else if (entity.color == 1 && !entity.dead && that.BB.bottom < entity.BB.bottom) {
                        that.action = 3;
                    }
                    if (entity.color == 0 && that.action != && that.BB.bottom < entity.BB.bottom) {
                        entity.dead = true;
                    } else if (entity.color == 0 && that.action == 2 && that.BB.bottom < entity.BB.bottom) {
                        that.action = 3;
                    }
                    that.updateBB();
                }
            }
        });
    };

    draw(ctx) {
        this.animations[this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}

class NightBorne {
    constructor(game) {
        this.game = game;
        this.spritesheet = ASSET_MANAGER.getAsset("./resources/sprites/NightBorne.png");
        this.actions = { idle : 0, run : 1, attack : 2, hurt : 3, die : 4 };
        this.action = this.actions.run;
        this.scale = 3.5;
        this.x = 150;
        this.y = 500;
        this.velocity = { x : 0, y : 0 };
        this.score = 0;
        this.canScore = true;
        this.health = 100;
        this.healthWidth = 500;
        this.animations = [];
        this.loadAnimations();
        this.updateBB();
    };

    update() {
        const TICK = this.game.clockTick;
        const MAX_WALK = 300;
        this.velocity.y = 0;
        if (this.dead) {
            this.clearEntities();
            // Display death animation
            this.scale = 10;
            this.x = (PARAMS.CANVAS_WIDTH / 2) - ((80 * this.scale) / 2);
            this.y = (PARAMS.CANVAS_HEIGHT / 2) - ((80 * this.scale) / 2) - (10 * this.scale);
            this.action = this.actions.die;
            // Remove from world once the animation is finished
            if (this.animations[this.actions.die].isDone()) this.removeFromWorld = true;
        } else {
            if (this.animations[this.actions.hurt].isDone()) {
                this.action = this.actions.run;
                this.animations[this.actions.hurt].elapsedTime = 0;
            }
            // controls logic
            if (this.game.down) {
                this.velocity.y += MAX_WALK;
            } else if (this.game.up) {
                this.velocity.y -= MAX_WALK;
            }
            // attack logic
            if (this.game.attack && this.action != this.actions.hurt) {
                if (!this.attackSound) {
                    ASSET_MANAGER.playAsset("./resources/sfx/playerAttack.mp3");
                    this.attackSound = true;
                }
                this.action = this.actions.attack;
                if (this.animations[this.actions.attack].isDone()) {
                    this.action = this.actions.run;
                    this.game.attack = false;
                    this.attackSound = false;
                }
            } else {
                this.game.attack = false;
                this.animations[this.actions.attack].elapsedTime = 0;
            }

            this.y += this.velocity.y * TICK;
            this.updateBB();
            this.y = this.BB.bottom >= PARAMS.BOTTOM_PLAY_AREA ? PARAMS.CANVAS_HEIGHT - this.height - this.offsety : this.y;
            this.y = this.BB.bottom <= PARAMS.TOP_PLAY_AREA ? this.y - (this.velocity.y * TICK) : this.y;
            this.updateBB();
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (entity instanceof Totem) {
                        // draw in front or behind the totem if necessary
                        if ((that.BB.bottom < entity.BB.bottom && that.game.isBehind(that, entity)) ||
                            (that.BB.bottom >= entity.BB.bottom && !that.game.isBehind(that, entity))) {
                            that.game.swapEntity(that, entity);
                        }
                        var distance = entity.BB.bottom - that.BB.bottom;
                        var inRange = distance <= 50 && distance >= 0;
                        if (inRange && !entity.dead) {
                            if (entity.color == entity.colors.red && that.action == that.actions.attack) {
                                entity.dead = true;
                                entity.isHit = true;
                                that.score += 100;
                            } else if (entity.color == entity.colors.red && entity.canHurt) {
                                entity.canHurt = false;
                                that.action = that.actions.hurt;
                                that.health -= 7;
                            } else if (entity.color == entity.colors.blue && that.action == that.actions.attack && entity.canHurt) {
                                entity.canHurt = false;
                                entity.isHit = true;
                                that.action = that.actions.hurt;
                                that.health -= 7;
                            } else if (entity.color == entity.colors.blue && !entity.isHit) {
                                entity.dead = true;
                                that.score += 100;
                            }
                            if (that.health <= 0) that.dead = true;
                        }
                        that.updateBB();
                    }
                }
            });
        }
    };

    draw(ctx) {
        // Draw player
        this.animations[this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        // Draw health bar
        ctx.fillStyle = 'Green';
        ctx.fillRect(30, 30, this.healthWidth * (this.health * 0.01), 30);
        ctx.strokeStyle = 'Black';
        ctx.strokeRect(30, 30, this.healthWidth, 30);
        // Draw bounding box if debug mode is on
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

    loadAnimations() {
        for (var i = 0; i < 5; i++) {
            this.animations.push([]);
        }
        this.animations[this.actions.idle] = new Animator(this.spritesheet, 0, 0, 80, 80, 9, 0.09, 0, false, true);
        this.animations[this.actions.run] = new Animator(this.spritesheet, 0, 80, 80, 80, 6, 0.1, 0, false, true);
        this.animations[this.actions.attack] = new Animator(this.spritesheet, 0, 160, 80, 80, 12, 0.05, 0, false, false);
        this.animations[this.actions.hurt] = new Animator(this.spritesheet, 0, 240, 80, 80, 5, 0.1, 0, false, false);
        this.animations[this.actions.die] = new Animator(this.spritesheet, 0, 320, 80, 80, 23, 0.07, 0, false, false);
    };

    updateBB() {
        this.getOffsets();
        this.BB = new BoundingBox(this.x + this.offsetx, this.y + this.offsety, this.width, this.height);
    };

    getOffsets() {
        switch (this.action) {
            case 0:
            case 1:
                this.offsetx = 37 * this.scale;
                this.offsety = 33 * this.scale;
                this.width = 17 * this.scale;
                this.height = 31 * this.scale;
                break;
            case 2:
                this.offsetx = 49 * this.scale;
                this.offsety = 9 * this.scale;
                this.width = 30 * this.scale;
                this.height = 55 * this.scale;
                break;
            case 3:
                this.offsetx = 19 * this.scale;
                this.offsety = 30 * this.scale;
                this.width = 17 * this.scale;
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

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            if (!(entity instanceof NightBorne)) {
                entity.removeFromWorld = true;
            }
        });
    };
};

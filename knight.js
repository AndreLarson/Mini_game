class Knight {
    constructor(game) {
        this.game = game;
        this.loadAssets();
        this.animations = [];
        this.loadProperties();
        this.loadAnimations();
        this.updateBB();
    };

    loadProperties() {
        this.scale = 3;
        this.facing = 1; // 0 : right, 1 : left;
        this.action = 0;
        this.defaultWidth = 21 * this.scale;
        this.defaultHeight = 38 * this.scale;
        this.x = 0;
        this.y = 100;
        this.width = this.defaultWidth;
        this.height = this.defaultHeight;
        this.offsetx = 44 * this.scale;
        this.offsety = 0;
        this.offsetwidth = 0;
        this.offsetheight = 0;
        this.velocity = { x : 0, y : 0};
        this.fallAcc = 562.5;
    };

    loadAssets() {
        this.ssIdle = ASSET_MANAGER.getAsset("./resources/knight_sprites/_Idle.png");
        this.ssRun = ASSET_MANAGER.getAsset("./resources/knight_sprites/_Run.png");
        this.ssCrouchAll = ASSET_MANAGER.getAsset("./resources/knight_sprites/_CrouchAll.png");
        this.ssCrouchWalk = ASSET_MANAGER.getAsset("./resources/knight_sprites/_CrouchWalk.png");
        this.ssJump = ASSET_MANAGER.getAsset("./resources/knight_sprites/_JumpAll.png");
        this.ssAttackCombo = ASSET_MANAGER.getAsset("./resources/knight_sprites/_AttackCombo.png");
        this.ssSlide = ASSET_MANAGER.getAsset("./resources/knight_sprites/_SlideAll.png");
        this.ssCrouchAttack = ASSET_MANAGER.getAsset("./resources/knight_sprites/_CrouchAttack.png");
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
            for (var j = 0; j < 8; j++) {
                this.animations[i].push([]);
            }
        }
        // idle
        this.animations[0][0] = new Animator(this.ssIdle, 0, 42, 120, 38, 10, 0.1, 0, false, true, false);
        this.animations[1][0] = new Animator(this.ssIdle, 0, 42, 120, 38, 10, 0.1, 0, false, true, true);
        // run
        this.animations[0][1] = new Animator(this.ssRun, 0, 42, 120, 38, 10, 0.1, 0, false, true, false);
        this.animations[1][1] = new Animator(this.ssRun, 0, 42, 120, 38, 10, 0.1, 0, false, true, true);
        // crouch idle
        this.animations[0][2] = new Animator(this.ssCrouchAll, 120, 42, 120, 38, 1, 1, 0, false, false, false);
        this.animations[1][2] = new Animator(this.ssCrouchAll, 120, 42, 120, 38, 1, 1, 0, false, false, true);
        // crouch walk
        this.animations[0][3] = new Animator(this.ssCrouchWalk, 0, 42, 120, 38, 8, 0.125, 0, false, true, false);
        this.animations[1][3] = new Animator(this.ssCrouchWalk, 0, 42, 120, 38, 8, 0.125, 0, false, true, true);
        // jump
        this.animations[0][4] = new Animator(this.ssJump, 0, 42, 120, 38, 5, 0.1, 0, false, false, false);
        this.animations[1][4] = new Animator(this.ssJump, 0, 42, 120, 38, 5, 0.1, 0, false, false, true);
        // attack
        this.animations[0][5] = new Animator(this.ssAttackCombo, 0, 36, 120, 44, 10, 0.1, 0, false, false, false);
        this.animations[1][5] = new Animator(this.ssAttackCombo, 0, 36, 120, 44, 10, 0.1, 0, false, false, true);
        // slide
        this.animations[0][6] = new Animator(this.ssSlide, 0, 42, 120, 38, 4, 0.2, 0, false, false, false);
        this.animations[1][6] = new Animator(this.ssSlide, 0, 42, 120, 38, 4, 0.2, 0, false, false, true);
        // crouch attack
        this.animations[0][7] = new Animator(this.ssCrouchAttack, 0, 42, 120, 38, 4, 0.1, 0, false, false, false);
        this.animations[1][7] = new Animator(this.ssCrouchAttack, 0, 42, 120, 38, 4, 0.1, 0, false, false, true);
    };

    updateBB() {
        this.BB = new BoundingBox(this.x + this.offsetx, this.y + this.offsety, this.width + this.offsetwidth, this.height);
    };

    update() {
        const TICK = this.game.clockTick;
        const MAX_WALK = 200;
        const WALK_FALL = 2500;
        this.width = this.defaultWidth;
        this.height = this.defaultHeight;
        this.offsetx = 44 * this.scale;
        this.offsety = 0;
        this.offsetwidth = 0;
        this.offsetheight = 0;
        this.velocity.x = 0;

        // horizontal physics
        if (this.game.down) {
            this.action = 2;
            this.offsety = 5 * this.scale;
            this.height -= 10 * this.scale;
            if (this.game.right) {
                this.facing = 0;
                this.action = 3;
                this.velocity.x += MAX_WALK * 0.75;
            } else if (this.game.left) {
                this.facing = 1;
                this.action = 3;
                this.velocity.x -= MAX_WALK * 0.75;
            }
        } else if (this.game.right) {
            this.facing = 0;
            this.action = 1;
            this.velocity.x += MAX_WALK;
        } else if (this.game.left) {
            this.facing = 1;
            this.action = 1;
            this.velocity.x -= MAX_WALK;
        } else {
            this.action = 0;
        }
        if (this.game.slide && !this.game.down && !this.game.attack1) {
            this.action = 6;
            this.offsety = 5 * this.scale;
            this.height -= 10 * this.scale;
            if (this.facing == 1) {
                this.velocity.x -= MAX_WALK * 1.25;
            } else {
                this.velocity.x += MAX_WALK * 1.25;
            }
            if (this.animations[this.facing][this.action].isDone()) {
                this.action = 0;
                this.game.slide = false;
            }
        } else {
            this.animations[this.facing][6].elapsedTime = 0;
        }

        // vertical physics
        if (this.game.jump) {
            this.action = 4;
            this.velocity.y = -240;
            this.fallAcc = WALK_FALL;
            if (this.animations[this.facing][this.action].isDone()) {
                this.action = 0;
                this.game.jump = false;
            }
        } else {
            this.animations[this.facing][4].elapsedTime = 0;
        }

        // attack mechanics

        if (this.game.attack1 && !this.game.jump && !this.game.down) {
            this.action = 5;
            if (this.animations[this.facing][this.action].isDone()) {
                this.action = 0;
                this.game.attack1 = false;
            } else {
                this.offsety = 3 * this.scale;
                this.offsetwidth = 55 * this.scale;
                if (this.facing == 1) this.offsetx = -11 * this.scale;
            }
        } else {
            this.animations[this.facing][5].elapsedTime = 0;
        }

        if (this.game.attack2 && this.game.down) {
            this.action = 7;
            if (this.animations[this.facing][this.action].isDone()) {
                this.action = 2;
                this.game.attack2 = false;
            } else {
                this.offsetwidth = 55 * this.scale;
                if (this.facing == 1) this.offsetx = -11 * this.scale;
            }
        } else {
            this.animations[this.facing][7].elapsedTime = 0;
        }

        this.velocity.y += this.fallAcc * TICK;
        if (this.velocity.x >= MAX_WALK * 1.25) this.velocity.x = MAX_WALK * 1.25;
        if (this.velocity.x <= -MAX_WALK * 1.25) this.velocity.x = -MAX_WALK * 1.25;
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        if (this.y + this.offsety + this.height >= PARAMS.CANVAS_HEIGHT) {
            this.y = PARAMS.CANVAS_HEIGHT - this.height - this.offsety;
        }
        this.updateBB();
    };

    draw(ctx) {
        if (this.facing == 1) {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x - this.width / 2, this.y - this.offsety, this.scale);
        } else {
            this.animations[this.facing][this.action].drawFrame(this.game.clockTick, ctx, this.x, this.y - this.offsety, this.scale);
        }
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
}

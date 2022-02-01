class TotemPattern {

    constructor(game) {
        this.game = game;
    };

    topRow(color, offset) {
        offset *= 384;
        this.game.addEntity(new Totem(this.game, 1440 + (0 * 64) + offset, 720 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (1 * 64) + offset, 720 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (2 * 64) + offset, 720 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (3 * 64) + offset, 720 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (4 * 64) + offset, 720 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (5 * 64) + offset, 720 - (96 * 2), color, 2));
    };

    bottomRow(color, offset) {
        offset *= 384;
        this.game.addEntity(new Totem(this.game, 1440 + (0 * 64) + offset, 768 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (1 * 64) + offset, 768 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (2 * 64) + offset, 768 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (3 * 64) + offset, 768 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (4 * 64) + offset, 768 - (96 * 2), color, 2));
        this.game.addEntity(new Totem(this.game, 1440 + (5 * 64) + offset, 768 - (96 * 2), color, 2));
    };

    zigZag() {

    };

    walls() {

    };

}

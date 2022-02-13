class TotemPattern {
    constructor(game) {
        this.game = game;
    };

    topRow(color, offset, count, velocity) {
        for (var i = 0; i < count; i++) {
            this.game.addEntity(new Totem(this.game, 1440 + (i * 64) + offset, 720 - (96 * 2), color, 2, velocity));
        }
    };

    bottomRow(color, offset, count, velocity) {
        for (var i = 0; i < count; i++) {
            this.game.addEntity(new Totem(this.game, 1440 + (i * 64) + offset, 768 - (96 * 2), color, 2, velocity));
        }
    };

    zigZag(color, offset, count, velocity) {
        var position = 720;
        for (var i = 0; i < count; i++) {
            this.game.addEntity(new Totem(this.game, 1440 + (i * 64) + offset, position - (96 * 2), color, 2, velocity));
            position = position == 720 ? 768 : 720;
        }
    };

    walls(color, offset, count, velocity) {
        for (var i = 0; i < count; i++) {
            this.game.addEntity(new Totem(this.game, 1440 + (i * 64) + offset, 768 - (96 * 2), color, 2, velocity));
            this.game.addEntity(new Totem(this.game, 1440 + (i * 64) + offset, 720 - (96 * 2), color, 2, velocity));
        }
    };
};

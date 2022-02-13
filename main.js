const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./resources/sprites/NightBorne.png");

ASSET_MANAGER.queueDownload("./resources/sprites/BlueTotem.png");
ASSET_MANAGER.queueDownload("./resources/sprites/RedTotem.png");

ASSET_MANAGER.queueDownload("./resources/background/back-buildings.png");
ASSET_MANAGER.queueDownload("./resources/background/far-buildings.png");
ASSET_MANAGER.queueDownload("./resources/background/foreground.png");

ASSET_MANAGER.queueDownload("./resources/sfx/bgm1.mp3");
ASSET_MANAGER.queueDownload("./resources/sfx/bgm2.mp3");
ASSET_MANAGER.queueDownload("./resources/sfx/playerDeath.mp3");
ASSET_MANAGER.queueDownload("./resources/sfx/playerAttack.mp3");
ASSET_MANAGER.queueDownload("./resources/sfx/totemDeath.mp3");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	PARAMS.BOTTOM_PLAY_AREA = PARAMS.CANVAS_HEIGHT;
	PARAMS.TOP_PLAY_AREA = 673;
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});

const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./resources/sprites/NightBorne.png");

ASSET_MANAGER.queueDownload("./resources/sprites/BlueTotem.png");
ASSET_MANAGER.queueDownload("./resources/sprites/RedTotem.png");

ASSET_MANAGER.queueDownload("./resources/background/back-buildings.png");
ASSET_MANAGER.queueDownload("./resources/background/far-buildings.png");
ASSET_MANAGER.queueDownload("./resources/background/foreground.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;
	ctx.imageSmoothingEnabled = false;
	gameEngine.init(ctx);
	new SceneManager(gameEngine);
	gameEngine.start();
});

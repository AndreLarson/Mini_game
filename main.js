const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_Idle.png");
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_Run.png");
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_CrouchAll.png");
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_CrouchWalk.png");
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_JumpAll.png");
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_AttackCombo.png");
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_SlideAll.png");
ASSET_MANAGER.queueDownload("./resources/knight_sprites/_CrouchAttack.png");

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

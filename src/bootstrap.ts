export default class Bootstrap extends Phaser.Scene {
    private moranx: Phaser.Cache.BaseCache
    constructor() {

	super({
	    	key: "Bootstrap"
		});
    }

    public preload(): void {

		// Load level on complete
		this.load.on('complete', () => {
			this.scene.start("TestLevel");
		});

		this.load.path = '../assets/'

		// TEST CODE ///////////////////////////////////////////////////////
		for (let i = 1; i <= 4; i++) {
			this.load.image(`layer0${i}`, `../assets/temp_layer0${i}.png`)
		}
		////////////////////////////////////////////////////////////////////

		// Audio
		this.load.audio('coin_sfx', 'audio/coin.ogg');
		this.load.audio('jump_sfx', 'audio/jump.ogg');
		this.load.audio('hurt_sfx', 'audio/hurt.ogg');
	
		// Sprites
		this.load.spritesheet('moran', 'sprites/player/moran.png', 
				{ frameWidth: 80, frameHeight: 72} );

		this.load.spritesheet('coins', 'sprites/collectables/pieces.png', {
			frameWidth: 18,
			frameHeight: 17
		});

		this.load.spritesheet('powerups', 'sprites/collectables/powerups.png', {
			frameWidth: 24,
			frameHeight: 24
		});

		this.load.spritesheet('coil', 'sprites/enemies/tesla/coil.png', 
			      { frameWidth: 30, frameHeight: 30 });

		this.load.spritesheet('cannon', 'sprites/enemies/tesla/cannoncopter_48x48.png', 
			      { frameWidth: 48, frameHeight: 48 });
	
		this.load.spritesheet(
            'cannon_part', 
            'sprites/enemies/tesla/cannoncopter_particle_14x14.png', 
			{ 
                frameWidth: 14, 
                frameHeight: 14 
            }
        );

        this.load.spritesheet('legs', 'sprites/enemies/tesla/legs-luthor_49x45.png', { frameWidth: 49, frameHeight: 45 });

        this.load.spritesheet('vroomba', 'sprites/enemies/tesla/vroomba_48x32.png', { frameWidth: 48, frameHeight: 32 });
        
        this.load.spritesheet('vroomba_part', 'sprites/enemies/tesla/vroomba_particle_32x32.png', {frameWidth: 32, frameHeight: 32});

        // Backgrounds
        for (let i=0; i < 4; i++) {
            this.load.image(`bg${i}`, `bg${i}.png`)
        }

        // Tilemaps
        this.load.image('platform', 'h_block.png');
        this.load.image('tileset', 'tilesets/tesla_tileset_extruded.png');
		this.load.tilemapTiledJSON('tesla_level0', 'tilemaps/tesla_tilemap_0.json');
		this.load.tilemapTiledJSON('tesla_level1', 'tilemaps/tesla_tilemap_1.json');
    }
}

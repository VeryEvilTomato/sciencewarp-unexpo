
class Coins extends Phaser.GameObjects.Sprite {
    constructor(params: any) {
	super(params.scene, params.x, params.y, params.texture);
    }

    public create(): void {

	this.scene.add.existing(this);
	
    }

    private animSetup(): void {
	this
    }
    
}

import "phaser";

import Sabana from "../../helpers/sabana";

export default class Coil extends Phaser.GameObjects.Sprite {
    currentScene: Phaser.Scene;
    direction: {
        x;
        y;
    };
    velocity = 100;
    body: Phaser.Physics.Arcade.Body;

    constructor(params: any) {
        super(params.scene, params.x, params.y, params.key, params.frame);
        this.currentScene = params.scene;

        let dir_x = 1;
        let dir_y = 0;

        if (Object.keys(params.props).length > 0) {
            dir_x = params.props.dir_x;
            dir_y = params.props.dir_y;
        }

        this.direction = {
            x: dir_x,
            y: dir_y
        };

        const size = {
            x: 16,
            y: 16,
        };

        //Settings
        Sabana.Init(this, this.scene).Sprite(size);
  
        this.body.setAllowGravity(false);
        this.scene.anims.fromJSON(this.scene.cache.json.get('coil_anim'));
        this.anims.play("coil_move");

        this.body.setVelocityX(this.velocity * this.direction.x);
        this.body.setVelocityY(this.velocity * this.direction.y);
    }

    update(): void {
        if (this.direction.x !== 0) {
            if (this.body.blocked.right || this.body.blocked.left) {
                this.direction.x *= -1;
                this.body.setVelocityX(this.velocity * this.direction.x);
            }
        }

        if (this.direction.y !== 0) {
            if (this.body.blocked.up || this.body.blocked.down) {
                this.direction.y *= -1;
                this.body.setVelocityY(this.velocity * this.direction.y);
            }
        }
    }
}

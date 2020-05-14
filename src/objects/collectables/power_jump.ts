import "phaser";

enum Power {
    Jump,
    Jetpack,
    Dash,
}

class Powerup extends Phaser.Physics.Arcade.Sprite {

    isGone = false;

    typeOf: Power;
    body: Phaser.Physics.Arcade.Body;

    constructor(params) {
        super(params.scene, params.x, params.y, params.key);

        this.typeOf = params.props.typeOf;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        this.animSetup();

        switch(this.typeOf) {
          case Power.Jump:
              this.anims.play("jump_float");
              break;
          case Power.Jetpack:
              this.anims.play("jet_float");
              break;
          case Power.Dash:
              this.anims.play("dash_float");
              break;
        }
    }

    animSetup() {
        this.jumpAnim();
        this.jetpackAnim();
        this.dashAnim();
    }

    vanish(player) {
        this.disableBody();
        this.isGone = true;

        switch (this.typeOf) {
            case Power.Jump:
                this.anims.play("jump_vanish", true);
                player.powerup.jumpActive = true;
                break;
            case Power.Jetpack:
                this.anims.play("jet_vanish", true);
                player.powerup.jetpActive = true;
                break;
            case Power.Dash:
                this.anims.play("dash_vanish", true);
                player.powerup.dashActive = true;
                break;
        }

        this.scene.time.delayedCall(500, () => {
            this.destroy();
        }, [], this);
    }

    jumpAnim() {
        this.scene.anims.create({
            key: "jump_float",
            frames: this.scene.anims.generateFrameNumbers("powerups", {
                start: 0,
                end: 3,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "jump_vanish",
            frames: this.scene.anims.generateFrameNumbers("powerups", {
                start: 4,
                end: 6,
            }),
            frameRate: 12,
            hideOnComplete: true,
        });
    }

    jetpackAnim() {
        this.scene.anims.create({
            key: "jet_float",
            frames: this.scene.anims.generateFrameNumbers("powerups", {
                start: 7,
                end: 10,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "jet_vanish",
            frames: this.scene.anims.generateFrameNumbers("powerups", {
                start: 11,
                end: 13,
            }),
            frameRate: 12,
            hideOnComplete: true,
        });
    }

    dashAnim() {
        this.scene.anims.create({
            key: "dash_float",
            frames: this.scene.anims.generateFrameNumbers("powerups", {
                start: 14,
                end: 17,
            }),
            frameRate: 12,
            repeat: -1,
        });

        this.scene.anims.create({
            key: "dash_vanish",
            frames: this.scene.anims.generateFrameNumbers("powerups", {
                start: 18,
                end: 20,
            }),
            frameRate: 12,
            hideOnComplete: true,
        });
    }
}

export default Powerup;

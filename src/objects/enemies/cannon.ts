import "phaser";
import { reset, isObjectNear, shoot } from '../../utils/libmon';

enum State {
    Moving,
    Attacking,
}

const MAX_DIS =         50;         // Maximum movement in Y
const VELOCITY =        50;         // Velocity
const RESTING_TIME =    300;        // Time to hop from Resting to Moving
const PROJ_TIME =       100;        // Time between projectiles
let   AGGRO_RAN =       100;        // Range before it detects player
const PROJ_NUM =        2;          // Number of projectiles
const UPPER_P =         100;
const LOWER_P =         250;

export default class Cannon extends Phaser.Physics.Arcade.Sprite {

    private moveTween:      Phaser.Tweens.Tween;  
    private partGroup:      Phaser.GameObjects.Group;

    public state:           State;


    constructor(params: any) {

        super(params.scene, params.x, params.y, params.texture);

        this.state = State.Moving;

        AGGRO_RAN += this.y;

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        (this.body as any).allowGravity = false;

        this.setSize(20, 35);
     
        this.createAnimations();
        this.create();
        
    }

    create(): void {

        // Y is calculated from original position
        const moveConfig = {
            targets: this,
            y: '+=150',
            duration: 2000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1,
        };

        this.partGroup = this.scene.add.group();

        // We want for it to move up and down constantly
        this.moveTween = this.scene.add.tween(moveConfig);

        // Get player from scene's children
        let player = (this.scene as any).children.scene.player;

        // While moving: check for player position
        this.scene.events.on('moving', () => { this.moving(player); });

        this.scene.events.on('attacking', () => { 

            // Animate cannoncopter
            this.anims.play('cannon_attack', true);

            // Animate projectiles
            this.partGroup.getChildren().forEach( (element) => {
                (element as any).anims.play('cannon_part_anim', true)
            });

         });

        // If monsters spots the player
        this.scene.events.addListener('shoot', () => {

            console.log("Hello");

            if (!this.moveTween.isPaused()) {
                this.moveTween.pause();
            }

            this.shootProjectiles();
            
            this.scene.time.delayedCall(3000, () => {
                
                if (this.moveTween.isPaused()) {
                    this.moveTween.resume();

                    reset(this, State.Moving, 2000);
                }
            }, [], this);
        });
    }

    update(): void {

        switch(this.state) {

            case State.Moving:
                this.scene.events.emit('moving');
                break;
            case State.Attacking:
                this.scene.events.emit('attacking');
                break;
        }

    
        
    }

    change(state: State): void {
        this.state = state;
    }

    moving(player: any): void {

        this.anims.play('cannon_move', true);

        // Player must be near for it to start attacking
        // And at the same height (y)

        let isPlayerNear: boolean = isObjectNear(AGGRO_RAN, player, this) <= AGGRO_RAN && 
        (Phaser.Math.RoundTo(player.y, 1) == Phaser.Math.RoundTo(this.y, 1));

        // Is player near? If so, start to attack
        
        if (isPlayerNear) {

            reset(this, State.Attacking, 0);

            this.scene.events.emit('shoot');
                  
        }  
    }

    createAnimations(): void {
        this.scene.anims.create({
            key: 'cannon_move',
            frames: this.scene.anims.generateFrameNumbers('cannon', 
            {
                start: 0, end: 7
            }),
            frameRate: 10
        });

        this.scene.anims.create({
            key: 'cannon_attack',
            frames: this.scene.anims.generateFrameNumbers('cannon', 
            {
                start: 8, end: 15
            }),
            frameRate: 12
        });

        this.scene.anims.create({
            key: 'cannon_part_anim',
            frames: this.scene.anims.generateFrameNumbers('cannon_part',
            { 
                start: 0, end: 2
            }),
            frameRate: 12
        })
    }

    shootProjectiles() {

        for (let i = 0; i <= 4800; i += 800) {
            this.scene.time.delayedCall(i, () =>
            {
                this.createProjectiles();
            }, [], this);
            
        }

        
    }

    createProjectiles() {
        const ball = this.scene.physics.add.sprite(this.x, this.y, 'cannon_part');
        (ball as any).body.allowGravity = false;
        ball.setVelocityX(-100);

        this.partGroup.add(ball);

        this.scene.time.delayedCall(2000, () => {
            ball.destroy();
        }, [], this);   

        ball.anims.play('cannon_part_anim', true);
    }
}
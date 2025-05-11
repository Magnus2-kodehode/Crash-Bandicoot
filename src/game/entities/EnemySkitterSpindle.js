export class EnemySkitterSpindle {
    constructor(scene, x, y) {
        this.scene = scene;
        this.speed = 100;
        this.direction = -1;
        this.startX = x;
        this.startY = y;
        this.range = 75;

        this.sprite = scene.physics.add
            .sprite(x, y, "enemy-skitter_spindle")
            .setSize(450, 350)
            .setOffset(50, 100)
            .setDepth(11)
            .setFlipY(true);
        // .setBounce(0)
        // .setCollideWorldBounds(true)
        // .setGravityY(300)
        // .setDragX(5000)
        // .setFriction(0, 0);

        // Configure physics properties
        this.sprite.body.setFriction(0, 0);
        this.sprite.body.setDragX(5000);
        this.sprite.body.setGravityY(300);
        this.sprite.body.setBounce(0);
        this.sprite.body.setAllowGravity(false);
        this.sprite.setCollideWorldBounds(true);

        const targetSize = 100;
        const scaleX = targetSize / this.sprite.width;
        const scaleY = targetSize / this.sprite.height;
        this.sprite.setScale(scaleX, scaleY);

        // this.setupJumpingBehavior();
    }

    setupJumpingBehavior() {
        this.jumpEvent = this.scene.time.addEvent({
            delay: 3000,
            callback: () => {
                if (
                    this.sprite &&
                    this.sprite.body &&
                    this.sprite.body.blocked.down
                ) {
                    this.sprite.setVelocityY(-2050);
                }
            },
            loop: true,
        });
    }

    kill() {
        if (this.sprite && this.sprite.active) {
            this.sprite.destroy();
        }
    }

    reset(x, y) {
        if (this.sprite && this.sprite.active) {
            this.sprite.setPosition(x, y);
            this.sprite.setVelocity(0);
            this.direction = -1;
        }
    }

    update() {
        if (!this.sprite.active) return;

        const velocity = this.speed * this.direction;
        this.sprite.setVelocityX(velocity);
        this.sprite.setFlipX(this.direction > 0);

        const distance = this.sprite.x - this.startX;

        if (this.direction === 1 && distance >= this.range) {
            this.direction = -1;
        } else if (this.direction === -1 && distance <= -this.range) {
            this.direction = 1;
        }
    }
}

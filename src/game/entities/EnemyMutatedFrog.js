export class EnemyMutatedFrog {
    constructor(scene, x, y) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;
        this.direction = -1;
        this.range = 110;
        this.speed = 300;

        this.sprite = scene.physics.add
            .sprite(x, y, "enemy-mutated_frog")
            .setSize(460, 400)
            .setOffset(20, 50)
            .setDepth(6);

        // Configure physics properties
        this.sprite.body.setFriction(0, 0);
        this.sprite.body.setDragX(5000);
        this.sprite.body.setGravityY(300);
        this.sprite.body.setBounce(0);
        this.sprite.setCollideWorldBounds(true);

        const targetSize = 100;
        const scaleX = targetSize / this.sprite.width;
        const scaleY = targetSize / this.sprite.height;
        this.sprite.setScale(scaleX, scaleY);

        this.setupJumpingBehavior();
    }

    setupJumpingBehavior() {
        this.jumpEvent = this.scene.time.addEvent({
            delay: 1500,
            callback: () => {
                if (
                    this.sprite &&
                    this.sprite.body &&
                    this.sprite.body.blocked.down
                ) {
                    this.sprite.setVelocityY(-750);
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
        this.sprite.setPosition(x, y);
        this.sprite.setVelocityX(0);
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

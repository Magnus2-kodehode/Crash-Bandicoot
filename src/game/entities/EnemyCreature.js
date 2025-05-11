export class EnemyCreature {
    constructor(scene, x, y) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;

        this.sprite = scene.physics.add
            .sprite(x, y, "enemy-creature")
            .setSize(420, 390)
            .setOffset(40, 100)
            .setCircle(210, 40, 100)
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
            delay: 2000,
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
        this.sprite.setPosition(x, y);
        this.sprite.setVelocityX(0);
    }

    update() {
        if (!this.sprite.active) return;
    }
}

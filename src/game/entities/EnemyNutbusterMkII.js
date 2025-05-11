export class EnemyNutbusterMkII {
    constructor(scene, x, y) {
        this.scene = scene;
        this.speed = 500;
        this.direction = 1;
        this.startX = x;
        this.startY = y;
        this.range = 300;
        this.isAttacking = false;

        this.sprite = scene.physics.add
            .sprite(x, y, "enemy-nutbuster_mk.ii")
            .setSize(450, 400)
            .setOffset(25, 80)
            .setDepth(6);

        // Configure physics properties
        this.sprite.body.setFriction(0, 0);
        this.sprite.body.setDragX(5000);
        this.sprite.body.setGravityY(100);
        this.sprite.body.setBounce(0);
        this.sprite.setCollideWorldBounds(true);

        const targetSize = 125;
        const scaleX = targetSize / this.sprite.width;
        const scaleY = targetSize / this.sprite.height;
        this.sprite.setScale(scaleX, scaleY);

        this.arm = scene.physics.add.sprite(
            x,
            y,
            "nutbuster_mk.ii-extended_arm"
        );
        this.arm.setVisible(false);
        this.arm.body.setAllowGravity(false);
        this.arm.setDepth(5);
        this.arm.setScale(0.25);
        this.arm.setSize(434, 110);
        this.arm.setOffset(0, 160);

        // this.setupJumpingBehavior();
        this.setupAttackBehavior();
    }

    setupJumpingBehavior() {
        this.jumpEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                if (
                    this.sprite &&
                    this.sprite.body &&
                    this.sprite.body.blocked.down
                ) {
                    this.sprite.setVelocityY(-160);
                }
            },
            loop: true,
        });
    }

    setupAttackBehavior() {
        this.attackTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: () => {
                if (this.sprite.active && !this.isAttacking) {
                    this.attack();
                }
            },
            loop: true,
        });
    }

    attack() {
        this.isAttacking = true;

        this.sprite.setTexture("enemy-nutbuster_mk.ii-no_arm");

        const direction = this.sprite.flipX ? 1 : -1;
        const offsetX = 0 * direction;
        const offsetY = 15;

        this.arm.setPosition(this.sprite.x + offsetX, this.sprite.y + offsetY);
        this.arm.body.enable = true;
        this.arm.setActive(true);
        this.arm.setVisible(true);
        this.arm.setFlipX(this.sprite.flipX);
        this.arm.setVelocityX(250 * direction);

        this.scene.physics.add.overlap(
            this.arm,
            this.scene.player.sprite,
            () => {
                if (!this.arm || !this.sprite || !this.sprite.active) return;
                if (!this.scene.player.isSpinning) {
                    this.scene.handlePlayerHit();
                } else {
                    this.arm.setVelocity(0);
                    this.arm.setActive(false);
                    this.arm.setVisible(false);
                    if (this.arm.body) this.arm.body.enable = false;
                    this.sprite.setTexture("enemy-nutbuster_mk.ii");
                }
            }
        );

        this.scene.time.delayedCall(330, () => {
            if (!this.arm || !this.sprite || !this.sprite.active) return;
            this.arm.setVelocityX(0);
            this.arm.setVisible(false);
            this.arm.setActive(false);
            if (this.arm.body) this.arm.body.enable = false;
            this.sprite.setTexture("enemy-nutbuster_mk.ii");
            this.isAttacking = false;
        });
    }

    kill() {
        if (this.sprite && this.sprite.active) {
            this.sprite.destroy();
        }
        if (this.arm) {
            this.arm.destroy();
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

        // const velocity = this.speed * this.direction;
        // this.sprite.setVelocityX(velocity);
        // this.sprite.setFlipX(this.direction > 0);

        // const distance = this.sprite.x - this.startX;

        // if (this.direction === 1 && distance >= this.range) {
        //     this.direction = -1;
        // } else if (this.direction === -1 && distance <= -this.range) {
        //     this.direction = 1;
        // }
    }
}

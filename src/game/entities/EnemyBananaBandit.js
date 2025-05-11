import { ProjectilesBananaBandit } from "./ProjectilesBananaBandit";

export class EnemyBananaBandit {
    constructor(scene, x, y) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;

        // Sprite
        this.sprite = scene.physics.add
            .sprite(x, y, "enemy-banana_bandit")
            .setSize(450, 425)
            .setOffset(25, 65)
            .setDepth(6)
            .setFlipX(true);
        const targetSize = 150;
        const scaleX = targetSize / this.sprite.width;
        const scaleY = targetSize / this.sprite.height;
        this.sprite.setScale(scaleX, scaleY);

        // Configure physics properties
        this.sprite.body.setFriction(0, 0);
        this.sprite.body.setDragX(5000);
        this.sprite.body.setGravityY(100);
        this.sprite.setCollideWorldBounds(true);

        // Banana pile sprite
        this.spriteBananaPile = scene.add.sprite(x - 100, y + 20, "banana_pile");
        this.spriteBananaPile.setScale(0.15);
        this.spriteBananaPile.setDepth(this.sprite.depth - 1);

        // Banana throw
        this.projectiles = [];
        this.throwTimer = this.scene.time.addEvent({
            delay: 1500,
            callback: () => this.throwBanana(),
            loop: true
        })

        this.setupJumpingBehavior();
    }

    reset(x, y) {
        if (this.sprite && this.sprite.active) {
            this.sprite.setPosition(x, y);
            this.sprite.setVelocity(0);
            this.direction = -1;
        }
    }

    kill() {
        if (this.isInvincible) return;

        if (this.throwTimer) {
            this.throwTimer.remove();
        }
        
        if (this.sprite?.active) {
            this.sprite.destroy();
        }
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
                    this.sprite.setVelocityY(-150);
                }
            },
            loop: true,
        });
    }

    throwBanana() {
        const direction = this.sprite.flipX ? -1 : 1;
        const offsetX = 0 * direction;
        const offsetY = 0;

        const banana = new ProjectilesBananaBandit(
            this.scene,
            this.sprite.x + offsetX,
            this.sprite.y + offsetY,
            direction
        )

        this.projectiles.push(banana);
        
        this.scene.physics.add.overlap(
            banana.sprite,
            this.scene.player.sprite,
            () => {
                if (this.scene.player.isSpinning) {
                    banana.sprite.destroy();
                } else {
                    this.scene.handlePlayerHit();
                }
            }
        )
    }

    update() {
        if (!this.sprite.active) return;

        this.projectiles.forEach((banana) => {
            banana.update();
        })
    }
}

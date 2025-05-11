import { ProjectilesChunkyCheeks } from "./ProjectilesChunkyCheeks";

export class EnemyChunkyCheeks {
    constructor(scene, x, y) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;

        this.sprite = scene.physics.add
            .sprite(x, y, "enemy-chunky_cheeks")
            .setSize(350, 400)
            .setOffset(75, 60)
            .setDepth(6);

        // Configure physics properties
        this.sprite.body.setFriction(0, 0);
        this.sprite.body.setDragX(5000);
        this.sprite.body.setGravityY(300);
        this.sprite.body.setBounce(0);
        this.sprite.setCollideWorldBounds(true);

        const targetSize = 250;
        const scaleX = targetSize / this.sprite.width;
        const scaleY = targetSize / this.sprite.height;
        this.sprite.setScale(scaleX, scaleY);

        this.setupJumpingBehavior();

        this.projectiles = [];
        this.setupShootingBehavior();
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
                    this.sprite.setVelocityY(-100);
                }
            },
            loop: true,
        });
    }

    setupShootingBehavior() {
        this.shootTimer = this.scene.time.addEvent({
            delay: 2500,
            callback: () => {
                if (this.sprite && this.sprite.active) {
                    this.shootProjectile();
                }
            },
            loop: true,
        });
    }

    shootProjectile() {
        // const direction = this.sprite.flipX ? -1 : 1;
        const direction = -1;

        const offsetX = 70 * direction;
        const offsetY = -50;

        const startX = this.sprite.x + offsetX;
        const startY = this.sprite.y + offsetY;

        const projectile = new ProjectilesChunkyCheeks(
            this.scene,
            startX,
            startY,
            direction
        );
        this.projectiles.push(projectile);

        this.scene.physics.add.overlap(
            projectile.sprite,
            this.scene.player.sprite,
            () => {
                if (this.scene.player.isSpinning) {
                    projectile.sprite.destroy();
                } else {
                    projectile.sprite.destroy();
                    this.scene.handlePlayerHit();
                }
            }
        );
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
        // Add any enemy update logic here
        if (!this.sprite.active) return;

        this.projectiles.forEach((projectile) => {
            projectile.update();
        });
    }
}

export class EnemyDeath {
    constructor(scene, x, y) {
        this.scene = scene;
        this.startX = x;
        this.startY = y;
        this.sprite = scene.physics.add
            .sprite(x, y, "enemy-death")
            .setSize(460, 360)
            .setOffset(20, 90)
            .setDepth(6);
        this.sprite.body.setGravityY(50);
        this.sprite.body.setFriction(0, 0);
        this.sprite.body.setDragX(0);
        this.sprite.body.setBounce(0);
        this.sprite.body.setCollideWorldBounds(false);
        this.sprite.setPushable(false);
        this.sprite.body.checkCollision.none = true;
        this.sprite.body.setAllowGravity(false);
        this.sprite.body.setImmovable(true);
        const targetSize = 80;
        const scaleX = targetSize / this.sprite.width;
        const scaleY = targetSize / this.sprite.height;
        this.sprite.setScale(scaleX, scaleY);
        this.sprite.setActive(false);
        this.sprite.setVisible(false);
        this.sprite.setAlpha(1);
        this.sprite.body.enable = false;
    }

    playAt(x, y) {
        this.sprite.setPosition(x, y);
        this.sprite.setAlpha(1);
        this.sprite.setActive(true);
        this.sprite.setVisible(true);
        this.sprite.body.enable = true;
        this.sprite.setVelocityY(-50);
        this.swayTween = this.scene.tweens.add({
            targets: this.sprite,
            x: { from: x - 15, to: x + 15 },
            ease: "Sine.easeInOut",
            duration: 500,
            yoyo: true,
            repeat: 1,
        });
        this.fadeTween = this.scene.tweens.add({
            targets: this.sprite,
            alpha: { from: 1, to: 0 },
            ease: "Cubic.easeIn",
            duration: 500,
            delay: 0,
        });
        this.scene.time.delayedCall(500, () => {
            this.sprite.setVelocity(0, 0);
            this.sprite.setActive(false);
            this.sprite.setVisible(false);
            this.sprite.body.enable = false;
        });
    }

    update() {
        if (!this.sprite.active) return;
        this.sprite.angle += 0.5;
    }
}

export class ProjectilesSillySally {
    constructor(scene, x, y, direction = -1) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, "projectile-egg");
        this.sprite.setScale(0.25);
        this.sprite.setCircle(100, 0, 0);
        this.sprite.setVelocityY(500);
        this.sprite.body.setAllowGravity(false);
        this.sprite.setDepth(5);
        this.startY = y;
        this.maxDistance = 700;
    }

    update() {
        if (!this.sprite.active) return;

        this.sprite.angle += 2;

        const distanceTravelled = Math.abs(this.sprite.y - this.startY);
        if (distanceTravelled > this.maxDistance) {
            this.sprite.destroy();
        }
    }
}
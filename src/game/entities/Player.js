export class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add
            .sprite(x, y, "player-running_right-frame_0")
            .setScale(0.3)
            .setSize(250, 425)
            .setOffset(125, 75)
            .setDepth(7)
            .setCollideWorldBounds(true);
        this.sprite.body.setFriction(0, 0);
        this.sprite.body.setDragX(1000);

        // Highest velocity character can reach
        this.sprite.body.setMaxVelocityX(500);

        this.canDoubleJump = true;
        this.jumpCount = 0;
        this.canSpin = true;

        this.isSpinning = false;
        this.spinHitbox = this.scene.physics.add.sprite(x, y, null);
        this.spinHitbox.setScale(0.3);
        this.spinHitbox.setSize(450, 450);
        // this.spinHitbox.setOffset(-210, -160);
        this.spinHitbox.setDepth(-999);
        this.spinHitbox.setVisible(false);
        this.spinHitbox.setActive(false);
        this.spinHitbox.body.setAllowGravity(false);
        this.spinHitbox.body.enable = false;

        // Running animation
        this.playerFrames = [];
        for (let i = 0; i <= 19; i++) {
            this.playerFrames.push(`player-running_right-frame_${i}`);
        }
        this.currentPlayerFrame = 0;
        this.frameTimer = 0;
        this.frameDelay = 30;

        this.isDead = false;
        this.isInvincible = false;

        this.scene.time.delayedCall(1, () => {
            this.spinHitbox.setPosition(this.sprite.x - 500, this.sprite.y);
            this.spinHitbox.setActive(true);
            this.spinHitbox.body.enable = true;
            this.scene.time.delayedCall(1, () => {
                this.spinHitbox.setActive(false);
                this.spinHitbox.body.enable = false;
            });
        });

        // Mask
        this.maskSprite = scene.add.sprite(x, y, "mask");
        this.maskSprite.setScale(0.35);
        this.maskSprite.setDepth(this.sprite.depth - 1);
    }

    respawn(x, y) {
        this.isDead = false;
        this.isInvincible = false;
        this.sprite.setVelocity(0, 0);
        this.sprite.setPosition(x, y);
        this.canDoubleJump = true;
        this.jumpCount = 0;
    }

    spinAttack() {
        if (this.isSpinning || !this.canSpin) return;

        this.isSpinning = true;
        this.canSpin = false;
        this.sprite.setTexture("player-spin");

        this.spinHitbox.setPosition(this.sprite.x, this.sprite.y);
        this.spinHitbox.setActive(true);
        this.spinHitbox.body.enable = true;

        // Enemy collision
        this.scene.enemies.forEach((enemy) => {
            if (!enemy.sprite || !enemy.sprite.active) return;
            this.scene.physics.world.overlap(
                this.spinHitbox,
                enemy.sprite,
                () => {
                    if (enemy.constructor.name === "EnemyGrizzleGuts") {
                        enemy.takeDamage?.(10);
                    } else {
                        enemy.kill?.();
                    }
                }
            );
        });

        if (this.scene.levelManager.boxWumpaFruitGroup) {
            this.scene.physics.world.overlap(
                this.spinHitbox,
                this.scene.levelManager.boxWumpaFruitGroup,
                (hitbox, box) => {
                    this.scene.levelManager.smashWumpaFruitBox(box);
                }
            );
        }

        // Spin duration
        this.scene.time.delayedCall(500, () => {
            this.isSpinning = false;

            this.spinHitbox.setActive(false);
            this.spinHitbox.body.enable = false;
            if (!this.isDead) {
                this.sprite.setTexture("player");
            }
        });

        // Spin cooldown
        this.scene.time.delayedCall(750, () => {
            this.canSpin = true;
        });
    }

    jump(jumpPower) {
        if (this.sprite.body.blocked.down) {
            this.sprite.setVelocityY(jumpPower);
            this.jumpCount++;
            this.canDoubleJump = true;
        } else if (this.canDoubleJump) {
            this.sprite.setVelocityY(jumpPower + 50);
            this.jumpCount++;
            if (this.jumpCount >= 2) {
                this.canDoubleJump = false;
            }
        }
        // console.log(this.jumpCount);
    }

    deathAnimation() {
        this.isInvincible = true;
        this.isDead = true;
        this.sprite.setVelocity(0);
        this.sprite.setTexture("player-death-1");
        this.sprite.setOffset(125, 25);
        this.scene.time.delayedCall(500, () => {
            this.sprite.setTexture("player-death-2");
            this.sprite.setOffset(125, -50);
        });
        this.sprite.setAccelerationX(0);
    }

    update(time, delta, inputManager) {
        if (this.isDead) return;

        // Acceleration value
        const speed = 5000;

        // Deceleration modifier
        const decelerationModifier = 2;

        // Velocity cutoff
        const speedCutoffModifier = 60;

        // Velocity cutoff legacy code
        // const speedStopCutoffModifier = speedCutoffModifier + 10;

        // Jump force value
        const jumpPower = -500;

        // Check movement input
        const isLeftPressed = inputManager.isLeftPressed();
        const isRightPressed = inputManager.isRightPressed();
        const isJumpPressed = inputManager.isJumpJustPressed();
        const isSpinPressed = inputManager.isSpinJustPressed();

        // Reset jump calculations on touching the ground
        if (this.sprite.body.blocked.down) {
            this.jumpCount = 0;
            this.canDoubleJump = false;
        }

        // Move player left or right
        if (isLeftPressed) {
            // this.sprite.setVelocityX(-speed);
            this.sprite.setAccelerationX(-speed);
            this.sprite.setFlipX(true);
        } else if (isRightPressed) {
            // this.sprite.setVelocityX(speed);
            this.sprite.setAccelerationX(speed);
            this.sprite.setFlipX(false);
        } else {
            if (
                this.sprite.body.velocity.x > -speedCutoffModifier &&
                this.sprite.body.velocity.x < speedCutoffModifier
            ) {
                // If velocity is low enough. Come to a stop.
                // this.sprite.setVelocityX(0);
                this.sprite.setAccelerationX(0);
            } else if (this.sprite.body.velocity.x > speedCutoffModifier) {
                // If velocity is high enough. Accelerate in the opposite direction to slow down.
                this.sprite.setAccelerationX(-speed / decelerationModifier);
            } else if (this.sprite.body.velocity.x < -speedCutoffModifier) {
                // If velocity is high enough. Accelerate in the opposite direction to slow down.
                this.sprite.setAccelerationX(speed / decelerationModifier);
            }

            // this.sprite.setVelocityX(0);
        }

        // console.log(this.sprite.body.velocity.x);

        // Handle player animation
        if (!this.isSpinning) {
            if (!this.sprite.body.blocked.down) {
                if (this.sprite.body.velocity.y < 0) {
                    // Player is jumping
                    this.sprite.setTexture("player-jump");
                } else if (
                    this.sprite.body.velocity.y > 500 ||
                    (this.jumpCount == 0 && this.sprite.body.velocity.y > 0)
                ) {
                    // Player is falling
                    this.sprite.setTexture("player-fall");
                }
            } else if (this.sprite.body.velocity.x !== 0) {
                // Player is running
                this.frameTimer += delta;
                if (this.frameTimer > this.frameDelay) {
                    this.frameTimer = 0;
                    this.currentPlayerFrame =
                        (this.currentPlayerFrame + 1) %
                        this.playerFrames.length;
                    this.sprite.setTexture(
                        this.playerFrames[this.currentPlayerFrame]
                    );
                }
            } else {
                // Player is idle
                this.sprite.setTexture("player");
            }
        }

        // Handle jumping
        if (isJumpPressed) {
            this.jump(jumpPower);
        }

        // Handle spin attack
        if (isSpinPressed) {
            this.spinAttack();
        }
        // Oppdater posisjon for spinAttack hitbox
        if (this.spinHitbox) {
            const direction = this.sprite.flipX ? -1 : 1;
            this.spinHitbox.setPosition(
                this.sprite.x + 5 * direction,
                this.sprite.y + 10
            );
        }

        // Mask position
        const maskOffsetX = this.sprite.flipX ? 100 : -100;
        const maskOffsetY = -50 + Math.sin(time * 0.005) * 5;
        this.maskSprite.setPosition(
            this.sprite.x + maskOffsetX,
            this.sprite.y + maskOffsetY
        );
        this.maskSprite.setFlipX(this.sprite.flipX);
    }
}

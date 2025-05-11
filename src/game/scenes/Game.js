import { Scene } from "phaser";
import { EventBus } from "../EventBus.js";
import { PauseMenu } from "../ui/PauseMenu.js";
import { LevelManager } from "../managers/LevelManager.js";
import { BackgroundManager } from "../managers/BackgroundManager.js";
import { InputManager } from "../managers/InputManager.js";
import { Player } from "../entities/Player.js";
import { EnemyOda } from "../entities/EnemyOda.js";
import { EnemyJumpingJack } from "../entities/EnemyJumpingJack.js";
import { EnemyRunningRupert } from "../entities/EnemyRunningRupert.js";
import { EnemyChunkyCheeks } from "../entities/EnemyChunkyCheeks.js";
import { EnemySillySally } from "../entities/EnemySillySally.js";
import { EnemySpider } from "../entities/EnemySpider.js";
import { EnemySkitterSpindle } from "../entities/EnemySkitterSpindle.js";
import { EnemyCreature } from "../entities/EnemyCreature.js";
import { EnemyCutieCthulu } from "../entities/EnemyCutieCthulu.js";
import { EnemyDreadDrooler } from "../entities/EnemyDreadDrooler.js";
import { EnemyMutatedFrog } from "../entities/EnemyMutatedFrog.js";
import { EnemyNutbusterMkII } from "../entities/EnemyNutbusterMkII.js";
import { EnemyFishmoley } from "../entities/EnemyFishmoley.js";
import { EnemyGrizzleGuts } from "../entities/EnemyGrizzleGuts.js";
import BossSubtitle from "../../Components/BossSubtitle.jsx";
import { gameState } from "../gameState.js";
import { EnemyFlappyFang } from "../entities/EnemyFlappyFang.js";
import { EnemyBananaBandit } from "../entities/EnemyBananaBandit.js";
import { EnemyGorilla } from "../entities/EnemyGorilla.js";
import { EnemyRazor } from "../entities/EnemyRazor.js";
import { EnemyDeath } from "../entities/EnemyDeath.js";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    preload() {
        // Load player images
        this.load.image("player", "assets/player/player-standing-1.png");
        this.load.image("player-jump", "assets/player/player-jump.png");
        this.load.image("player-fall", "assets/player/player-fall.png");
        this.load.image("player-spin", "assets/player/player-spin.png");
        this.load.image("player-death-1", "assets/player/player-death-1.png");
        this.load.image("player-death-2", "assets/player/player-death-2.png");

        // Load enemy images
        this.load.image("enemy-oda", "assets/enemies/oda.png");
        this.load.image(
            "enemy-jumping_jack",
            "assets/enemies/jumping_jack.png"
        );
        this.load.image(
            "enemy-running_rupert",
            "assets/enemies/running_rupert.png"
        );
        this.load.image(
            "enemy-chunky_cheeks",
            "assets/enemies/chunky_cheeks.png"
        );
        this.load.image("enemy-silly_sally", "assets/enemies/silly_sally.png");
        this.load.image("enemy-spider", "assets/enemies/crawling_webster.png");
        this.load.image(
            "enemy-skitter_spindle",
            "assets/enemies/skitter_spindle.png"
        );
        this.load.image(
            "enemy-dread_drooler",
            "assets/enemies/dread_drooler.png"
        );
        this.load.image(
            "enemy-mutated_frog",
            "assets/enemies/mutated_frog.png"
        );
        this.load.image("enemy-creature", "assets/enemies/creature.png");
        this.load.image(
            "enemy-cutie_cthulu",
            "assets/enemies/cutie_cthulu.png"
        );
        this.load.image(
            "enemy-nutbuster_mk.ii",
            "assets/enemies/nutbuster_mk_ii.png"
        );
        this.load.image(
            "enemy-nutbuster_mk.ii-no_arm",
            "assets/enemies/nutbuster_mk_ii-no_arm.png"
        );
        this.load.image("enemy-fishmoley", "assets/enemies/fishmoley.png");
        this.load.image("enemy-flappy_fang", "assets/enemies/flappy_fang.png");
        this.load.image(
            "enemy-banana_bandit",
            "assets/enemies/banana_bandit.png"
        );
        this.load.image("enemy-gorilla", "assets/enemies/gorilla.png");
        this.load.image("enemy-grumpuff", "assets/enemies/grumpuff.png");
        this.load.image("enemy-razor", "assets/enemies/razor.png");
        this.load.image(
            "enemy-grizzle_guts",
            "assets/enemies/grizzle_guts-6.png"
        );

        // Load player running frames dynamically using a loop
        for (let i = 0; i <= 19; i++) {
            const frame = i.toString().padStart(2, "0"); // Ensure frame number is two digits
            this.load.image(
                `player-running_right-frame_${i}`,
                `assets/player/player-running_right-frame_${frame}.png`
            );
        }

        // Load other assets
        this.load.image("bg_jungle", "assets/bg_jungle.png");
        this.load.image("ground", "assets/ground.png");
        this.load.image("dirt", "assets/dirt.png");
        this.load.image("platform-grass", "assets/platform-grass.png");
        this.load.image("platform-wood", "assets/platform-wood.png");
        this.load.image("platform-stone", "assets/platform-stone.png");
        this.load.image("wall-stone", "assets/wall-stone.png");
        this.load.image("spikes-bottom", "assets/spikes-bottom.png");
        this.load.image("spikes-top", "assets/spikes-top.png");
        this.load.image("spikes-left", "assets/spikes-left.png");
        this.load.image("spikes-right", "assets/spikes-right.png");
        this.load.image("box", "assets/box.png");
        this.load.image("box-wumpa_fruits", "assets/box-wumpa_fruits.png");
        this.load.image("tnt", "assets/box-tnt.png");
        this.load.image("tnt-3", "assets/box-tnt3.png");
        this.load.image("tnt-2", "assets/box-tnt2.png");
        this.load.image("tnt-1", "assets/box-tnt1.png");
        this.load.image("explodeTNT", "assets/explodeTNT.png");
        this.load.image("water", "assets/water.png");
        this.load.image("wumpa_fruit", "assets/wumpa_fruit.png");
        this.load.image("projectile-nut", "assets/projectile-nut.png");
        this.load.image("projectile-egg", "assets/projectile-egg.png");
        this.load.image("projectile-banana", "assets/projectile-banana.png");
        this.load.image("banana_pile", "assets/banana_pile.png");
        this.load.image(
            "nutbuster_mk.ii-extended_arm",
            "assets/nutbuster_mk_ii-extended_arm.png"
        );
        this.load.image("enemy-death", "assets/enemy-death.png");
        this.load.image("mask", "assets/mask-1.png");
        this.load.image("box-smash", "assets/box-smash.png");

        // Loads sounds
        this.load.audio("tntSound", "assets/audio/explosion.mp3");
    }

    create() {
        // Create background
        this.backgroundManager = new BackgroundManager(this);
        this.backgroundManager.createBackground();

        // TNT Explosion sound effect
        this.explosionSound = this.sound.add("tntSound");

        // Create level elements
        this.levelManager = new LevelManager(this);
        this.levelManager.createLevel();

        // Create player
        this.player = new Player(this, 100, 550);

        // Create enemies
        this.enemies = [
            new EnemyOda(this, 110, 250),
            new EnemyJumpingJack(this, 675, 550),
            new EnemyRunningRupert(this, 2600, 550),
            new EnemyChunkyCheeks(this, 2525, 200),
            new EnemySillySally(this, 1100, 125),
            new EnemyFishmoley(this, 3210, 700),
            new EnemyFlappyFang(this, 2850, 200),
            new EnemySpider(this, 1900, 200),
            new EnemySkitterSpindle(this, 6100, 505),
            new EnemyCreature(this, 1900, 700),
            new EnemyCutieCthulu(this, 4000, 500),
            new EnemyMutatedFrog(this, 4785, 500),
            new EnemyDreadDrooler(this, 5500, 500),
            new EnemyNutbusterMkII(this, 3425, 500),
            new EnemyBananaBandit(this, 5150, 110),
            new EnemyGorilla(this, 6210, 200),
            new EnemyRazor(this, 6900, 700),
            new EnemyGrizzleGuts(this, 10000, 300),
        ];

        // Enemy death
        this.enemyDeath = new EnemyDeath(this, 0, 0);

        // Setup collisions
        this.setupCollisions();

        // Create input manager
        this.inputManager = new InputManager(this);

        // Create pause menu
        this.pauseMenu = new PauseMenu(this);

        // Set world bounds
        this.physics.world.setBounds(0, 0, 10240, 768);

        // Set camera
        let { width: worldWidth, height: worldHeight } =
            this.physics.world.bounds;
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.zoom = 1.25;

        EventBus.emit("current-scene-ready", this);
    }

    setupCollisions() {
        // Ground/platform collisions
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.platformGrassGroup
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.platformWoodGroup
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.platformStoneGroup
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.wallStoneGroup
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.boxGroup
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.boxWumpaFruitGroup
        );
        this.enemies.forEach((enemy) => {
            this.physics.add.collider(
                enemy.sprite,
                this.levelManager.platformGrassGroup
            );
            this.physics.add.collider(
                enemy.sprite,
                this.levelManager.platformWoodGroup
            );
            this.physics.add.collider(
                enemy.sprite,
                this.levelManager.platformStoneGroup
            );
            this.physics.add.collider(
                enemy.sprite,
                this.levelManager.wallStoneGroup
            );
            this.physics.add.collider(enemy.sprite, this.levelManager.boxGroup);
            this.physics.add.collider(
                enemy.sprite,
                this.levelManager.boxWumpaFruitGroup
            );
        });

        // Player and spikes collision
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.spikesBottomGroup,
            () => {
                this.handlePlayerHit();
            }
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.spikesTopGroup,
            () => {
                this.handlePlayerHit();
            }
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.spikesLeftGroup,
            () => {
                this.handlePlayerHit();
            }
        );
        this.physics.add.collider(
            this.player.sprite,
            this.levelManager.spikesRightGroup,
            () => {
                this.handlePlayerHit();
            }
        );

        // Player and water collision
        this.physics.add.overlap(
            this.player.sprite,
            this.levelManager.waterGroup,
            () => {
                this.handlePlayerHit();
            }
        );

        // Player and enemy collision
        this.enemies.forEach((enemy) => {
            if (enemy.constructor.name === "EnemyFlappyFang") {
                this.physics.add.overlap(
                    this.player.sprite,
                    enemy.sprite,
                    (playerSprite, enemySprite) => {
                        this.handlePlayerEnemyCollision(playerSprite, enemySprite);
                    }
                );
            } else {
                this.physics.add.collider(
                    this.player.sprite,
                    enemy.sprite,
                    (playerSprite, enemySprite) => {
                        this.handlePlayerEnemyCollision(playerSprite, enemySprite);
                    }
                );
            }
        });

        // Spin attack and enemy collision
        this.enemies.forEach((enemy) => {
            this.physics.add.collider(
                this.player.spinHitbox,
                enemy.sprite,
                (playerSprite, enemySprite) => {
                    this.handlePlayerEnemyCollision(playerSprite, enemySprite);
                }
            );
        });

        // Enemy and enemy collision
        for (let i = 0; i < this.enemies.length; i++) {
            for (let j = i + 1; j < this.enemies.length; j++) {
                this.physics.add.collider(
                    this.enemies[i].sprite,
                    this.enemies[j].sprite
                );
            }
        }

        // Collect fruits
        this.physics.add.overlap(
            this.player.sprite,
            this.levelManager.fruitGroup,
            (player, fruit) => {
                fruit.destroy();
                EventBus.emit("add-score", 1);
            }
        );

        // TNT interactions
        this.physics.add.overlap(
            this.player.sprite,
            this.levelManager.tntGroup,
            (player, tnt) => {
                if (!tnt.getData("tntCountdown")) {
                    tnt.setData("tntCountdown", true);
                    this.explosionSound.play();

                    const t1 = this.time.delayedCall(
                        0,
                        () => tnt.setTexture("tnt-3"),
                        [],
                        this
                    );
                    const t2 = this.time.delayedCall(
                        1000,
                        () => tnt.setTexture("tnt-2"),
                        [],
                        this
                    );
                    const t3 = this.time.delayedCall(
                        2000,
                        () => tnt.setTexture("tnt-1"),
                        [],
                        this
                    );
                    const t4 = this.time.delayedCall(
                        3000,
                        () => {
                            this.levelManager.explodeTNT(tnt);
                            tnt.destroy();
                        },
                        [],
                        this
                    );

                    this.levelManager.tntTimers.push(t1, t2, t3, t4);
                }
            }
        );
    }

    handlePlayerHit = () => {
        if (this.player.isInvincible) {
            return;
        } else {
            gameState.lives--;
            EventBus.emit("lose-life");
            this.player.deathAnimation();

            this.time.delayedCall(1500, () => {
                if (gameState.lives <= 0) {
                    EventBus.emit("reset-game");
                    this.scene.start("GameOver");
                } else {
                    this.levelManager.clearTNTTimers();
                    this.respawnPlayer();
                }
            });
        }
    };

    handlePlayerEnemyCollision = (playerSprite, enemySprite) => {
        if (enemySprite.texture.key === "enemy-death") return;

        const enemy = this.enemies.find((e) => e.sprite === enemySprite);
        if (!enemy) return;

        if (enemy.constructor.name === "EnemyOda") {
            return;
        }

        if (enemy.constructor.name === "EnemyJumpingJack") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyRunningRupert") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyChunkyCheeks") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemySillySally") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyFishmoley") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyFlappyFang") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyCreature") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemySpider") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemySkitterSpindle") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyMutatedFrog") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyDreadDrooler") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyCutieCthulu") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }
        if (enemy.constructor.name === "EnemyNutbusterMkII") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }

        if (enemy.constructor.name === "EnemyBananaBandit") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }

        if (enemy.constructor.name === "EnemyGorilla") {
            if (enemy.state === "charge") {
                const direction =
                    this.player.sprite.x < enemy.sprite.x ? -1 : 1;
                const distance = 150;
                const duration = 150;

                this.tweens.add({
                    targets: this.player.sprite,
                    x: this.player.sprite.x + direction * distance,
                    duration: duration,
                });
            }

            if (enemy.isInvincible) {
                return;
            } else if (this.player.isSpinning && !enemy.isInvincible) {
                this.enemyDeath.playAt(enemy.sprite.x, enemy.sprite.y);
                enemy.kill?.();
            }
            return;
        }

        if (enemy.constructor.name === "EnemyRazor") {
            if (this.player.isSpinning) {
                enemy.kill?.();
            } else {
                this.handlePlayerHit();
            }
        }

        if (enemy.constructor.name === "EnemyGrizzleGuts") {
            if (this.player.isSpinning) {
                enemy.takeDamage?.(10);
            } else {
                this.handlePlayerHit();
            }
            return;
        }

        if (this.player.isSpinning) {
            this.enemyDeath.playAt(enemy.sprite.x, enemy.sprite.y);
            enemy.kill?.();
        } else {
            this.handlePlayerHit();
        }
    };

    togglePause() {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            // Pause game
            this.physics.pause();
            this.anims.pauseAll();
            this.pauseMenu.show();
        } else {
            // Resume game
            this.physics.resume();
            this.anims.resumeAll();
            this.pauseMenu.hide();
        }
    }

    respawnPlayer() {
        this.player.respawn(100, 550);
        this.player.sprite.setScale(0.3);
        this.player.sprite.setSize(250, 425);
        this.player.sprite.setOffset(125, 75);
        this.levelManager.resetLevel();
    }

    update(time, delta) {
        // Check for pause button presses
        if (
            Phaser.Input.Keyboard.JustDown(this.inputManager.keys.pause) ||
            Phaser.Input.Keyboard.JustDown(this.inputManager.keys.pauseP)
        ) {
            this.togglePause();
        }

        // If paused, handle menu navigation
        if (this.isPaused) {
            this.pauseMenu.update();
            return; // Skip rest of update when paused
        }

        this.levelManager.updateWaterMovement(time);
        this.levelManager.updateFruits(time);

        // Update player and enemy
        this.player.update(time, delta, this.inputManager);
        this.enemies.forEach((enemy) => enemy.update());

        // Boss cutscene
        if (this.player) {
            this.levelManager.showBossCutscene();
        }

        // Boss subtitle
        if (this.player) {
            this.levelManager.showBossSubtitle();
        }
    }

    changeScene(sceneName) {
        this.scene.start(sceneName);
    }
}

import { Scene } from "phaser";

export class SettingsMenu extends Scene {
    constructor() {
        super("SettingsMenu");

        // Menu options
        this.menuOptions = ["Volume", "Screen Size", "Back"];
        this.selectedIndex = 0;
        this.menuTexts = [];
        this.menuOptionBackground = [];

        // Default settings
        this.volume = 0.5;
        this.isFullScreen = false;

        // Track which scene to return to
        this.returnScene = "MainMenu";
    }

    init(data) {
        // Store the scene we should return to
        if (data && data.returnScene) {
            this.returnScene = data.returnScene;
        }

        // Get current volume from game.sound if available
        if (this.game.sound && typeof this.game.sound.volume !== "undefined") {
            this.volume = this.game.sound.volume;
        }

        // Check if fullscreen is active
        this.isFullScreen = this.scale.isFullscreen;
    }

    preload() {
        // Load assets
        if (!this.textures.exists("wooden-sign")) {
            this.load.image("wooden-sign", "assets/wooden-sign.png");
        }

        this.load.audio("menu-change", "assets/audio/select.mp3");
    }

    create() {
        this.menuTexts = [];
        this.menuOptionBackground = [];
        this.selectedIndex = 0;

        // Create container for the entire menu
        this.container = this.add.container(0, 0);
        this.container.setScrollFactor(0);

        // dark background
        const fullScreenBg = this.add.rectangle(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            this.cameras.main.width * 2,
            this.cameras.main.height * 2,
            0x000000
        );
        fullScreenBg.setAlpha(0.5);
        fullScreenBg.setDepth(-5);
        this.container.add(fullScreenBg);

        // Background image
        const backgroundImage = this.add.image(512, 384, "background");
        backgroundImage.setDepth(-10);

        // Create wooden sign for title
        const signY = this.cameras.main.height / 2 - 100;
        const sign = this.add
            .image(this.cameras.main.width / 2, signY, "wooden-sign")
            .setOrigin(0.5);

        if (!this.textures.exists("wooden-sign")) {
            // Fallback if image asset is not loaded
            const signGraphics = this.add.graphics();
            signGraphics.fillStyle(0x5c4033, 1);
            signGraphics.fillRoundedRect(
                this.cameras.main.width / 2 - 200,
                signY - 40,
                400,
                80,
                15
            );
            signGraphics.lineStyle(8, 0x3d2817, 1);
            signGraphics.strokeRoundedRect(
                this.cameras.main.width / 2 - 200,
                signY - 40,
                400,
                80,
                15
            );
            this.container.add(signGraphics);
        } else {
            sign.setDisplaySize(400, 100);
            this.container.add(sign);
        }

        // Title text with shadow and bounce animation
        const titleStyle = {
            fontFamily: "Zoinks",
            fontSize: "48px",
            color: "#ffffff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 6,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: "#000",
                blur: 5,
                fill: true,
            },
        };

        const offsetY = 20;
        const title = this.add.text(
            this.cameras.main.width / 2,
            signY + offsetY,
            "SETTINGS",
            titleStyle
        );
        title.setOrigin(0.5);
        this.container.add(title);

        // Create menu options with initial values
        const menuItems = [
            {
                text: `VOLUME: ${Math.round(this.volume * 100)}%`,
                action: () => this.adjustVolume(),
            },
            {
                text: this.isFullScreen
                    ? "SCREEN SIZE: FULLSCREEN"
                    : "SCREEN SIZE: WINDOWED",
                action: () => this.toggleFullScreen(),
            },
            {
                text: "BACK",
                action: () => this.returnToPreviousScene(),
            },
        ];

        // Create menu items with simple styling
        this.createMenuItems(menuItems);

        // Set the first option as selected
        this.updateMenuSelection();

        // Handle input events
        this.input.keyboard.on("keydown-UP", () => this.moveSelection(-1));
        this.input.keyboard.on("keydown-DOWN", () => this.moveSelection(1));
        this.input.keyboard.on("keydown-ENTER", () => this.selectOption());
        this.input.keyboard.on("keydown-ESC", () =>
            this.returnToPreviousScene()
        );
        this.input.keyboard.on("keydown-LEFT", () => this.decreaseVolume());
        this.input.keyboard.on("keydown-RIGHT", () => this.increaseVolume());

        // Add audio for menu navigation if it exists
        this.menuChangeSound = this.sound.add("menu-change", { volume: 0.5 });

        // Menu entrance animation
        this.animateMenuEntrance();
    }

    createMenuItems(menuItems) {
        const centerX = this.cameras.main.width / 2;
        const startY = this.cameras.main.height / 2;

        // Create menu options with simple button styling
        menuItems.forEach((item, index) => {
            // Background button
            const bgWidth = 400;
            const bgHeight = 60;
            const buttonY = startY + index * 70;

            // Create button background
            const bg = this.add.graphics();
            bg.fillStyle(0x5c4033, 1); // Brown wooden color
            bg.fillRoundedRect(
                centerX - bgWidth / 2,
                buttonY - bgHeight / 2,
                bgWidth,
                bgHeight,
                10
            );
            bg.lineStyle(5, 0x3d2314, 1);
            bg.strokeRoundedRect(
                centerX - bgWidth / 2,
                buttonY - bgHeight / 2,
                bgWidth,
                bgHeight,
                10
            );
            bg.setAlpha(0.9);
            this.container.add(bg);

            // Create highlight overlay (initially invisible)
            const highlight = this.add.graphics();
            highlight.fillStyle(0xffbb00, 1);
            highlight.fillRoundedRect(
                centerX - bgWidth / 2,
                buttonY - bgHeight / 2,
                bgWidth,
                bgHeight,
                10
            );
            highlight.setAlpha(0);
            this.container.add(highlight);
            this.menuOptionBackground.push(highlight);

            // Text for the menu option
            const textStyle = {
                fontFamily: "Zoinks",
                fontSize: "30px",
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 5,
            };

            const text = this.add.text(centerX, buttonY, item.text, textStyle);
            text.setOrigin(0.5);
            text.setInteractive();

            // Add pointer events
            text.on("pointerdown", () => {
                this.selectedIndex = index;
                item.action();
            });

            text.on("pointerover", () => this.handlePointerOver(index));

            this.container.add(text);
            this.menuTexts.push({ text, action: item.action });
        });
    }

    animateMenuEntrance() {
        // Slide in animation for menu items
        const menuItems = [
            ...this.menuTexts.map((item) => item.text),
            ...this.menuOptionBackground,
        ];

        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i]) {
                const originalX = menuItems[i].x;
                menuItems[i].x = this.cameras.main.width + 200;

                this.tweens.add({
                    targets: menuItems[i],
                    x: originalX,
                    duration: 500,
                    ease: "Back.easeOut",
                    delay: i * 100,
                });
            }
        }
    }

    moveSelection(direction) {
        // Update selection index (wraps around)
        this.selectedIndex = Phaser.Math.Wrap(
            this.selectedIndex + direction,
            0,
            this.menuTexts.length
        );

        if (this.menuChangeSound) {
            this.menuChangeSound.play();
        }

        this.updateMenuSelection();
    }

    updateMenuSelection() {
        // Reset all options to default
        this.menuTexts.forEach((item, index) => {
            item.text.setColor("#ffffff");
            this.menuOptionBackground[index].setAlpha(0);

            // Reset scale
            item.text.setScale(1);
        });

        // Highlight selected option
        this.menuTexts[this.selectedIndex].text.setColor("#ffff00");
        this.menuOptionBackground[this.selectedIndex].setAlpha(0.3);

        // Pulse animation for selected text
        this.tweens.add({
            targets: this.menuTexts[this.selectedIndex].text,
            scale: 1.1,
            duration: 300,
            ease: "Cubic.easeOut",
            yoyo: true,
        });
    }

    selectOption() {
        // Execute the selected option's action
        this.menuTexts[this.selectedIndex].action();
    }

    adjustVolume() {
        // Increment volume by 0.1, wrap around to 0 if it exceeds 1.0
        this.volume = this.volume >= 1 ? 0 : Math.min(this.volume + 0.1, 1);

        // Round to avoid floating point issues
        this.volume = Math.round(this.volume * 10) / 10;

        // Apply volume and update text
        this.updateVolumeDisplay();

        // Visual feedback - flash the option
        this.flashMenuOption(0);
    }

    decreaseVolume() {
        // Decrease volume by 0.1
        this.volume = Math.max(this.volume - 0.1, 0);

        // Round to avoid floating point issues
        this.volume = Math.round(this.volume * 10) / 10;

        // Apply volume and update text
        this.updateVolumeDisplay();

        // Visual feedback - flash the option
        this.flashMenuOption(0);
    }

    increaseVolume() {
        // Increase volume by 0.1
        this.volume = Math.min(this.volume + 0.1, 1);

        // Round to avoid floating point issues
        this.volume = Math.round(this.volume * 10) / 10;

        // Apply volume and update text
        this.updateVolumeDisplay();

        // Visual feedback - flash the option
        this.flashMenuOption(0);
    }

    updateVolumeDisplay() {
        // Apply volume to game sound
        if (this.game.sound) {
            this.game.sound.volume = this.volume;
        }

        // Update the volume display text
        this.menuTexts[0].text.setText(
            `VOLUME: ${Math.round(this.volume * 100)}%`
        );
    }

    toggleFullScreen() {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(); // Safari
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen(); // IE11
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen(); // Safari
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen(); // IE11
            }
        }

        const isFullScreenNow = document.fullscreenElement !== null;

        this.isFullScreen = isFullScreenNow;

        this.menuTexts[1].text.setText(
            !isFullScreenNow
                ? "SCREEN SIZE: FULLSCREEN"
                : "SCREEN SIZE: WINDOWED"
        );

        this.flashMenuOption(1);
    }

    flashMenuOption(index) {
        // Flash effect when changing a setting
        const highlight = this.menuOptionBackground[index];

        this.tweens.add({
            targets: highlight,
            alpha: 0.8,
            duration: 100,
            yoyo: true,
            repeat: 3,
        });
    }

    handlePointerOver(index) {
        this.selectedIndex = index;
        this.updateMenuSelection();
        if (this.menuChangeSound) {
            this.menuChangeSound.play();
        }
    }

    returnToPreviousScene() {
        // Save volume setting before leaving
        if (this.game.sound) {
            this.game.sound.volume = this.volume;
        }

        // Return to the previous scene
        this.scene.stop("SettingsMenu");
        this.scene.start(this.returnScene);
    }

    shutdown() {
        // Clean up any listeners or ongoing animations
        this.input.keyboard.off("keydown-UP");
        this.input.keyboard.off("keydown-DOWN");
        this.input.keyboard.off("keydown-ENTER");
        this.input.keyboard.off("keydown-ESC");
        this.input.keyboard.off("keydown-LEFT");
        this.input.keyboard.off("keydown-RIGHT");

        this.tweens.killAll();
    }
}

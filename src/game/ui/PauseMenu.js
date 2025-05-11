import { EventBus } from "../EventBus";

export class PauseMenu {
    constructor(scene) {
        this.scene = scene;
        this.selectedOption = 0;
        this.menuOptions = [];
        this.menuOptionBackground = [];

        this.createPauseMenu();
    }

    createPauseMenu() {
        // Create pause menu container (will be hidden initially)
        this.container = this.scene.add.container(0, 0);
        this.container.setScrollFactor(0);
        this.container.setDepth(999);

        // Create a full screen background
        const fullScreenBg = this.scene.add.rectangle(
            this.scene.cameras.main.width / 2,
            this.scene.cameras.main.height / 2,
            this.scene.cameras.main.width * 2,
            this.scene.cameras.main.height * 2,
            0x000000
        );
        fullScreenBg.setAlpha(0.7);
        fullScreenBg.setScrollFactor(0);
        this.container.add(fullScreenBg);

        // Title text
        const title = this.scene.add.text(
            this.scene.cameras.main.width / 2,
            this.scene.cameras.main.height / 2 - 140,
            "PAUSED",
            {
                fontFamily: "Zoinks",
                fontSize: "48px",
                color: "#ffffff",
                fontStyle: "bold",
                stroke: "#000000",
                strokeThickness: 6,
            }
        );
        title.setOrigin(0.5);
        title.setScrollFactor(0);
        this.container.add(title);

        // Menu options
        const menuItems = [
            { text: "RESUME", action: () => this.scene.togglePause() },
            {
                text: "RESTART",
                action: () => {
                    EventBus.emit("reset-game");
                    this.scene.scene.restart();
                    this.scene.togglePause();
                },
            },
            {
                text: "SETTINGS",
                action: () => {
                    this.scene.scene.start("SettingsMenu");
                },
            },
            {
                text: "MAIN MENU",
                action: () => this.scene.scene.start("MainMenu"),
            },
            { text: "QUIT", action: () => this.scene.scene.start("GameOver") },
        ];

        // Create menu options
        menuItems.forEach((item, index) => {
            const width = this.scene.cameras.main.width;
            const height = this.scene.cameras.main.height;

            // Background highlight rectangle (invisible by default)
            const bg = this.scene.add.rectangle(
                width / 2,
                height / 2 - 50 + index * 60,
                500 - 80, // menuWidth - 80
                50,
                0xffff00
            );
            bg.setOrigin(0.5);
            bg.setScrollFactor(0);
            bg.setAlpha(0); // Start invisible
            this.container.add(bg);
            this.menuOptionBackground.push(bg);

            // Text
            const text = this.scene.add.text(
                width / 2,
                height / 2 - 50 + index * 60,
                item.text,
                {
                    fontFamily: "Zoinks",
                    fontSize: "32px",
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 5,
                }
            );
            text.setOrigin(0.5);
            text.setScrollFactor(0);
            text.setInteractive();
            text.on("pointerdown", () => {
                this.selectedOption = index;
                item.action();
            });
            text.on("pointerover", () => {
                this.selectedOption = index;
                this.updateMenuSelection();
            });

            this.container.add(text);
            this.menuOptions.push({ text, action: item.action });
        });

        // Hide menu initially
        this.container.setVisible(false);

        // Set first option as selected
        this.updateMenuSelection();
    }

    updateMenuSelection() {
        // Reset all options to default
        this.menuOptions.forEach((item, index) => {
            item.text.setColor("#ffffff");
            this.menuOptionBackground[index].setAlpha(0);
        });

        // Highlight selected option
        this.menuOptions[this.selectedOption].text.setColor("#ffff00");
        this.menuOptionBackground[this.selectedOption].setAlpha(0.3);
    }

    show() {
        this.container.setVisible(true);
    }

    hide() {
        this.container.setVisible(false);
    }

    update() {
        const inputManager = this.scene.inputManager;

        // Handle menu navigation with arrow keys
        if (inputManager.isUpJustPressed()) {
            this.selectedOption =
                (this.selectedOption - 1 + this.menuOptions.length) %
                this.menuOptions.length;
            this.updateMenuSelection();
        } else if (inputManager.isDownJustPressed()) {
            this.selectedOption =
                (this.selectedOption + 1) % this.menuOptions.length;
            this.updateMenuSelection();
        } else if (inputManager.isSelectJustPressed()) {
            this.menuOptions[this.selectedOption].action();
        }
    }
}

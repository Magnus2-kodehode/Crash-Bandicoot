import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class GameOver extends Scene {
    constructor() {
        super("GameOver");

        // Select options (Continue and Quit Game)
        this.options = ["Continue", "Quit Game"];
        this.selectedIndex = 0; // Default selected option (Continue)
    }

    create() {
        // Set the background color of the scene (dark red)
        this.cameras.main.setBackgroundColor(0x8b0000);

        // Add the background image with alpha transparency
        this.add.image(512, 384, "background-game_over").setAlpha(0.75);

        // Add the "Game Over" text at the top of the screen
        // this.add
        //     .text(512, 50, "Game Over", {
        //         fontFamily: "Zoinks",
        //         fontSize: 75,
        //         color: "#8b0000",
        //         stroke: "#000000",
        //         strokeThickness: 6,
        //         align: "center",
        //     })
        //     .setOrigin(0.5)
        //     .setDepth(100);

        // Add the "Continue" text option
        this.continueText = this.add
            .text(512, 675, "Retry", {
                fontFamily: "Zoinks",
                fontSize: 50,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        // Add the "Quit Game" text option
        this.quitText = this.add
            .text(512, 735, "Main Menu", {
                fontFamily: "Zoinks",
                fontSize: 50,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        // Update the selection (highlight the default selected option)
        this.updateSelection();

        // Capture keyboard input for navigation
        this.input.keyboard.on("keydown-UP", () => this.moveSelection(-1));
        this.input.keyboard.on("keydown-DOWN", () => this.moveSelection(1));
        this.input.keyboard.on("keydown-ENTER", () => this.selectOption());

        // Capture mouse click (if available) to select an option
        this.input.once("pointerdown", () => this.selectOption());

        // Emit an event that the current scene is ready
        EventBus.emit("current-scene-ready", this);
    }

    moveSelection(direction) {
        // Update the selected option index and wrap around if necessary
        this.selectedIndex = Phaser.Math.Wrap(
            this.selectedIndex + direction,
            0,
            this.options.length
        );
        // Update the selection highlight
        this.updateSelection();
    }

    updateSelection() {
        // Reset the color of both options to default (white)
        this.continueText.setColor("#ffffff");
        this.quitText.setColor("#ffffff");

        // Highlight the selected option in yellow
        if (this.selectedIndex === 0) {
            this.continueText.setColor("#ffcc00");
        } else if (this.selectedIndex === 1) {
            this.quitText.setColor("#ffcc00");
        }
    }

    selectOption() {
        // Restart the game if "Continue" is selected
        if (this.selectedIndex === 0) {
            this.scene.start("Game");
        }
        // Exit the game if "Quit Game" is selected
        else if (this.selectedIndex === 1) {
            this.scene.start("MainMenu");
            console.log("Game exited");
            // Todo ...
        }
    }
}

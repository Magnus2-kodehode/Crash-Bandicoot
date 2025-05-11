import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");

    // Menu options
    this.menuOptions = ["Play", "Settings", "Exit"];
    this.selectedIndex = 0;
    this.menuTexts = [];
    this.logoTween = null;
  }

  preload() {
    this.musicList = ["8bitRick", "Dota8bit", "loving8bit", "u_got_that"];
    this.musicList.forEach((music) => {
      this.load.audio(music, `assets/audio/${music}.mp3`);
    });
  }

  create() {
    // Reset the menu state when the scene is reloaded
    this.menuTexts = [];
    this.selectedIndex = 0;

    // Stop any previous music if it's playing
    if (this.music) {
      this.music.stop();
    }

    // Pick a random music from the list
    const randomKey = Phaser.Utils.Array.GetRandom(this.musicList);

    // Play background music
    this.music = this.sound.add(randomKey, {
      loop: true,
      volume: 0.5,
    });

    // Set an event listener to change the music when it finishes
    this.music.on("complete", () => {
      const nextRandomKey = Phaser.Utils.Array.GetRandom(this.musicList);
      this.music = this.sound.add(nextRandomKey, {
        loop: true,
        volume: 0.5,
      });
      this.music.play();
    });

    this.music.play();

    // Add background image
    this.add.image(512, 384, "background");

    // Create menu options
    this.menuOptions.forEach((option, index) => {
      let text = this.add
        .text(512, 600 + index * 60, option, {
          fontFamily: "Zoinks",
          fontSize: 36,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 6,
          align: "center",
        })
        .setOrigin(0.5);

      this.menuTexts.push(text);
    });

    this.updateMenu(); // Highlight the first option

    // Capture keyboard events
    this.input.keyboard.on("keydown-UP", () => this.moveSelection(-1));
    this.input.keyboard.on("keydown-DOWN", () => this.moveSelection(1));
    this.input.keyboard.on("keydown-ENTER", () => this.selectOption());

    // Emit event when the current scene is ready
    EventBus.emit("current-scene-ready", this);
  }

  moveSelection(direction) {
    // Update selection index (wraps around)
    this.selectedIndex = Phaser.Math.Wrap(
      this.selectedIndex + direction,
      0,
      this.menuOptions.length
    );
    this.updateMenu();
  }

  updateMenu() {
    this.menuTexts.forEach((text, index) => {
      if (index === this.selectedIndex) {
        text.setColor("#ffcc00").setFontSize(60); // Highlighted option (yellow)
      } else {
        text.setColor("#ffffff").setFontSize(50); // Default option (white)
      }
    });
  }

  selectOption() {
    // Handle selected option
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === "Play") {
      this.changeScene();
    } else if (selectedOption === "Settings") {
      this.scene.start("SettingsMenu");
    } else if (selectedOption === "Exit") {
      console.log("Exit game (to be implemented)");
    }
  }

  changeScene() {
    this.scene.start("Game"); // Transition to the Game scene
  }
}

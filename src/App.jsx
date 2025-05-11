import { useRef, useState, useEffect } from "react";
import Phaser from "phaser";
import { PhaserGame } from "./game/PhaserGame";
import { EventBus } from "./game/EventBus";
import UI from "./Components/UI";
import BossCutscene from "./Components/BossCutscene";
import BossSubtitle from "./Components/BossSubtitle";

export default function App() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [showBossCutscene, setShowBossCutscene] = useState(false);
    const [showBossSubtitle, setShowBossSubtitle] = useState(false);

    useEffect(() => {
        // Handle fullscreen and show/hide menu
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        const handleKeydown = (event) => {
            if (event.key === "Escape") {
                const scene = phaserRef.current.scene;
                if (isFullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen(); // Safari
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen(); // IE11
                    };
                    setIsFullscreen(false);
                };
            };

            // Toggle fullscreen when F is pressed
            if (event.key === "f" || event.key === "F") {
                fullScreen();
            };
        };

        // Boss cutscene
        const handleShowBossCutscene = () => {
            setShowBossCutscene(true);
        };
        EventBus.on("play-boss-cutscene", handleShowBossCutscene);

        // Boss subtitle
        const handleShowBossSubtitle = () => {
          setShowBossSubtitle(true);
          setTimeout(() => setShowBossSubtitle(false), 10000);
        };
        EventBus.on("show-boss-subtitle", handleShowBossSubtitle);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("keydown", handleKeydown);

        return () => {
            EventBus.off("play-boss-cutscene", handleShowBossCutscene);
            EventBus.off("show-boss-subtitle", handleShowBossSubtitle);
          
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isFullscreen]);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();

    const changeScene = () => {
        const scene = phaserRef.current.scene;

        if (scene) {
            scene.changeScene();
        };
    };

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        setShowScore(scene.scene.key === "Game");
    };

    // Enter / exit fullscreen
    const fullScreen = () => {
        const elem = document.documentElement;

        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(); // Safari
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen(); // IE11
            };
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen(); // Safari
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen(); // IE11
            };
        };
    };

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene}>
                {showScore && <UI />}
                {showBossCutscene && <BossCutscene onEnd={() => setShowBossCutscene(false)}/>}
                {showBossSubtitle && <BossSubtitle/>}
            </PhaserGame>
            <div className="buttons">
                <div>
                    <button className="button" onClick={changeScene}>
                        Change Scene
                    </button>
                </div>
                <div>
                    <button className="button" onClick={fullScreen}>
                        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    </button>
                </div>
            </div>
        </div>
    );
};
import HUD from './HUD'
import Settings from './Settings'
import PauseMenu from './PauseMenu'

export default function UI({
  showHUD,
  showPauseMenu,
  setShowPauseMenu,
  showSettings,
  setShowSettings,
  showCutscene,
  showSubtitles,
  onCloseSettings,
}) {
  return (
    <div className='ui'>
      {showHUD && <HUD />}
      {showPauseMenu && (
        <PauseMenu
          onResume={() => setShowPauseMenu(false)}
          onSettings={() => {
            setShowPauseMenu(false)
            setShowSettings(true)
          }}
          onQuit={() => window.location.reload()}
        />
      )}
      {showSettings && <Settings onClose={onCloseSettings} />}
      {showCutscene && <Cutscenes />}
      {showSubtitles && <Subtitles />}
    </div>
  )
}

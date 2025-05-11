import HUD from './HUD'
import Settings from './Settings'

export default function UI({
  showHUD,
  showPauseMenu,
  showSettings,
  showCutscene,
  showSubtitles,
  onCloseSettings,
}) {
  return (
    <div className='ui'>
      {showHUD && <HUD />}
      {showPauseMenu && <PauseMenu />}
      {showSettings && <Settings onClose={onCloseSettings} />}
      {showCutscene && <Cutscenes />}
      {showSubtitles && <Subtitles />}
    </div>
  )
}

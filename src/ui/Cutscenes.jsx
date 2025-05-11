import { useEffect, useRef } from 'react'

export default function BossCutscene({ onEnd }) {
  const videoRef = useRef()

  useEffect(() => {
    const cutscene = videoRef.current
    if (cutscene) {
      cutscene.play()
      cutscene.onended = onEnd
    }
  }, [onEnd])

  return (
    <div className='cutscene-container'>
      <video
        ref={videoRef}
        src='assets/videos/cutscene-grizzle_guts.mp4'
        className='cutscene'
        muted
        autoPlay
      />
    </div>
  )
}

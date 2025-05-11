import { useEffect, useState, useRef } from 'react'
import { EventBus } from '../EventBus'
import { gameState } from '../GameState'

export default function Score() {
  const [score, setScore] = useState(gameState.score)
  const [lives, setLives] = useState(gameState.lives)
  const [fruitCountState, setFruitCountState] = useState(0)
  const fruitCount = useRef(0)

  useEffect(() => {
    const handleScore = () => {
      setScore((prevScore) => {
        const newScore = prevScore + 1
        gameState.score = newScore
        return newScore
      })

      fruitCount.current += 1
      setFruitCountState(fruitCount.current)

      if (fruitCount.current >= 100) {
        fruitCount.current = 0
        setFruitCountState(fruitCount.current)
        setLives((prevLives) => {
          const newLives = prevLives + 1
          gameState.lives = newLives
          return newLives
        })
      }
    }

    const handleLoseLife = () => {
      setLives((prevLives) => {
        const newLives = Math.max(prevLives - 1, 0)
        gameState.lives = newLives
        return newLives
      })

      // Reset fruit count when the player loses a life
      fruitCount.current = 0
      setFruitCountState(fruitCount.current)
    }

    const resetGame = () => {
      fruitCount.current = 0
      gameState.score = 0
      gameState.lives = 3
      setScore(0)
      setLives(3)
      setFruitCountState(0) // Reset fruit count state
    }

    EventBus.on('add-score', handleScore)
    EventBus.on('lose-life', handleLoseLife)
    EventBus.on('reset-game', resetGame)

    return () => {
      EventBus.off('add-score', handleScore)
      EventBus.off('lose-life', handleLoseLife)
      EventBus.off('reset-game', resetGame)
    }
  }, [])

  return (
    <div className='hud-score'>
      <div className='hud-wumpa_fruit'>
        <img src='assets/wumpa_fruit.png' alt='Wumpa Fruit' />
        {fruitCountState}
      </div>
      <div className='hud-extra_life'>
        {lives}
        <img src='assets/extra_life.png' alt='Extra Life' />
      </div>
    </div>
  )
}

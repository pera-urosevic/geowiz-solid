import { createSignal, createRoot, Component } from 'solid-js'
import scenes, { Scene } from './scenes'

const rounds = 10

export enum Phase {
  Guess,
  Reveal,
}

const createGame = () => {
  const [round, setRound] = createSignal(0)
  const [score, setScore] = createSignal(0)
  const [phase, setPhase] = createSignal<Phase>(Phase.Guess)
  const [wonLastRound, setWonLastRound] = createSignal<boolean | undefined>()

  const isPhaseGuess = () => phase() === Phase.Guess
  const isPhaseReveal = () => phase() === Phase.Reveal

  const onReset = () => {
    setRound(0)
    setScore(0)
  }

  const onPoints = (points: number) => {
    let scoreNew = score() + points
    if (scoreNew < 0) scoreNew = 0
    setScore(scoreNew)
  }

  const hasNextRound = () => {
    const roundNew = round() + 1
    return roundNew <= rounds
  }

  const onRoundStart = () => {
    const roundNew = round() + 1
    setRound(roundNew)
    setPhase(Phase.Guess)
  }

  const onRoundEnd = (won: boolean, points: number) => {
    setWonLastRound(won)
    setPhase(Phase.Reveal)
    onPoints(points)
  }

  const onQuit = () => {
    scenes.replace(Scene.Results)
  }

  return {
    score,
    round,
    rounds,
    wonLastRound,
    phase,
    isPhaseGuess,
    isPhaseReveal,
    onReset,
    hasNextRound,
    onRoundStart,
    onRoundEnd,
    onQuit,
  }
}

export default createRoot(createGame)

import { ComponentProps } from 'solid-js'
import game from '../stores/game'
import styles from './Score.module.css'

const Score = (props: ComponentProps<'div'>) => {
  const { children, ...pass } = props
  return (
    <div class={styles.Score} {...pass}>
      <div>Score {game.score()}</div>
      <div>Round {game.round()}</div>
    </div>
  )
}

export default Score

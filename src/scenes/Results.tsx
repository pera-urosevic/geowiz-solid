import { Component, onMount } from 'solid-js'
import xp from '../stores/xp'
import game from '../stores/game'
import scenes from '../stores/scenes'
import Column from '../components/Column'
import Row from '../components/Row'
import { animPageHide, animPageShow } from '../services/animate'
import ButtonContinue from '../components/ButtonContinue'
import styles from './Results.module.css'

const Results: Component = () => {
  const onMenu = async () => {
    await animPageHide({ targets: '#results' })
    scenes.reset()
  }

  onMount(async () => {
    xp.add(game.score())
    await animPageShow({ targets: '#results' })
  })

  return (
    <div id="results" class={styles.Results}>
      <h1>Results</h1>
      <Column>
        <Row>
          Game Score: <strong>{game.score()}</strong>
        </Row>
        <Row>
          Total Score: <strong>{xp.xp()}</strong>
        </Row>
      </Column>
      <ButtonContinue onClick={onMenu} />
    </div>
  )
}

export default Results

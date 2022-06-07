import { Component, onMount } from 'solid-js'
import Button from '../components/Button'
import scenes, { Scene } from '../stores/scenes'
import game from '../stores/game'
import Column from '../components/Column'
import Row from '../components/Row'
import { animPageHide, animPageShow } from '../services/animate'

const Menu: Component = () => {
  const onGameFlag = async () => {
    await animPageHide({ targets: '#menu' })
    scenes.add(Scene.GameFlag)
  }

  const onGameCapital = async () => {
    await animPageHide({ targets: '#menu' })
    scenes.add(Scene.GameCapital)
  }

  const onGameMap = async () => {
    await animPageHide({ targets: '#menu' })
    scenes.add(Scene.GameMap)
  }

  const onOptions = async () => {
    await animPageHide({ targets: '#menu' })
    scenes.add(Scene.Options)
  }

  onMount(async () => {
    game.onReset()
    await animPageShow({ targets: '#menu' })
  })

  return (
    <Column id="menu">
      <h1>GeoWiz</h1>
      <Row>
        <Button onClick={onGameFlag}>Flag</Button>
        <Button onClick={onGameCapital}>Capital</Button>
        <Button onClick={onGameMap}>Map</Button>
      </Row>
      <Row>
        <Button onClick={onOptions}>Options</Button>
      </Row>
    </Column>
  )
}

export default Menu

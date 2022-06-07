import { Component, onMount } from 'solid-js'
import scenes from '../stores/scenes'
import LightMode from '../assets/icons/light_mode_white_24dp.svg'
import DarkMode from '../assets/icons/dark_mode_black_24dp.svg'
import options from '../stores/options'
import Button from '../components/Button'
import Column from '../components/Column'
import Row from '../components/Row'
import { animPageHide, animPageShow } from '../services/animate'

const Options: Component = () => {
  const themeIcon = () => (options.themeDark() ? <img src={LightMode} /> : <img src={DarkMode} />)

  const onReturn = async () => {
    await animPageHide({ targets: '#options' })
    scenes.remove()
  }

  onMount(async () => {
    await animPageShow({ targets: '#options' })
  })

  const onTheme = () => {
    options.toggleThemeDark()
  }

  return (
    <Column id="options">
      <h1>Options</h1>
      <Row>
        <Button onClick={onTheme}>{themeIcon}</Button>
      </Row>
      <Row>
        <Button onClick={onReturn}>Return</Button>
      </Row>
    </Column>
  )
}

export default Options

import { Component, createEffect } from 'solid-js'
import options from '../stores/options'
import scenes from '../stores/scenes'
import styles from './App.module.css'

const App: Component = () => {
  createEffect(() => {
    const theme = options.themeDark() ? 'theme-dark' : 'theme-light'
    const body = window.document.querySelector('body')
    if (body) body.className = theme
  })
  return <div class={styles.App}>{scenes.render()}</div>
}

export default App

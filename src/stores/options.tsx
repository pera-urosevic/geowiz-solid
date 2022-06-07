import { createSignal, createRoot } from 'solid-js'

type Options = {
  themeDark: boolean
}

const defaults: Options = { themeDark: true }

const load = () => {
  const json = window.localStorage.getItem('geowiz:options')
  const options = json ? JSON.parse(json) : defaults
  return options
}

const createOptions = () => {
  const optionsLoaded = load()
  const [themeDark, setThemeDark] = createSignal(optionsLoaded.themeDark)

  const save = () => {
    const json = JSON.stringify({
      themeDark: themeDark(),
    })
    window.localStorage.setItem('geowiz:options', json)
  }

  const toggleThemeDark = () => {
    setThemeDark(!themeDark())
    save()
  }

  return { themeDark, toggleThemeDark }
}

export default createRoot(createOptions)

import { createSignal, createRoot, lazy } from 'solid-js'
import Menu from '../scenes/Menu'
import Options from '../scenes/Options'
import Results from '../scenes/Results'
const GameFlag = lazy(() => import('../scenes/GameFlag'))
const GameCapital = lazy(() => import('../scenes/GameCapital'))
const GameMap = lazy(() => import('../scenes/GameMap'))

export enum Scene {
  Menu,
  Options,
  GameFlag,
  GameCapital,
  GameMap,
  Results,
}

const createScenes = () => {
  const [scenes, setScenes] = createSignal<Scene[]>([])
  const scene = () => scenes()[0] || Scene.Menu

  const remove = () => {
    if (scenes().length < 1) return
    setScenes((scenesOld) => {
      const scenesNew = [...scenesOld]
      scenesNew.shift()
      return scenesNew
    })
  }

  const replace = (sceneNew: Scene) => {
    if (scene() === sceneNew) return
    setScenes((scenesOld) => {
      const scenesNew = [...scenesOld]
      scenesNew[0] = sceneNew
      return scenesNew
    })
  }

  const add = (sceneNew: Scene) => {
    if (scene() === sceneNew) return
    setScenes((scenesOld) => {
      const scenesNew = [...scenesOld]
      scenesNew.unshift(sceneNew)
      return scenesNew
    })
  }

  const reset = () => {
    if (scenes().length < 1) return
    setScenes(() => [])
  }

  const render = () => {
    switch (scene()) {
      case Scene.Menu:
        return <Menu />
      case Scene.GameFlag:
        return <GameFlag />
      case Scene.GameCapital:
        return <GameCapital />
      case Scene.GameMap:
        return <GameMap />
      case Scene.Results:
        return <Results />
      case Scene.Options:
        return <Options />
      default:
        return <Menu />
    }
  }

  return {
    scene,
    remove,
    replace,
    add,
    reset,
    render,
  }
}

export default createRoot(createScenes)

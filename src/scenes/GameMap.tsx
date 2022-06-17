import { Component, createSignal, onMount, Show } from 'solid-js'
import ButtonContinue from '../components/ButtonContinue'
import Round from '../components/Round'
import Score from '../components/Score'
import Select from '../components/Select'
import { Country, getCountryRandom, selectCountryItems } from '../data/country'
import { mapCountry } from '../dom/map'
import { animGameRoundEnd, animGameRoundStart, animPageHide, animPageShow } from '../services/animate'
import { classStyles } from '../services/solid'
import game from '../stores/game'
import stylesGame from './Game.module.css'
import stylesGameMap from './GameMap.module.css'

const GameMap: Component = () => {
  const [country, setCountry] = createSignal<Country>(getCountryRandom())

  const onGuess = (guess: Country) => {
    const won = country().id === guess.id
    const points = won ? 15 : -10
    game.onRoundEnd(won, points)
  }

  const onMap = async (country: Country) => {
    const topoUrl = `${import.meta.env.BASE_URL}data/${country.id}.geo.json`
    const topoRes = await fetch(topoUrl)
    const topoNew = await topoRes.json()
    mapCountry([country.latlng[0], country.latlng[1]], topoNew)
  }

  const onNextRound = async () => {
    if (game.hasNextRound()) {
      await animGameRoundEnd({ targets: '#round, #map' })
      const countryRandom = getCountryRandom()
      setCountry(countryRandom)
      await onMap(countryRandom)
      game.onRoundStart()
      await animGameRoundStart({ targets: '#round, #map' })
    } else {
      await animPageHide({ targets: '#round, #game' })
      game.onQuit()
    }
  }

  onMount(async () => {
    await animPageHide({ targets: '#game, #map', duration: 0 })
    game.onReset()
    game.onRoundStart()
    await onMap(country())
    await animPageShow({ targets: '#game, #map' })
  })

  return (
    <div id="game" {...classStyles([stylesGame.Game, stylesGameMap.GameMap])}>
      <Score />
      <Round id="round">
        <Show when={game.isPhaseGuess()}>
          <div class={stylesGame.guess}>
            <Select items={selectCountryItems} onSelect={onGuess} />
          </div>
        </Show>
        <Show when={game.isPhaseReveal()}>
          <Show when={game.wonLastRound()}>
            <ButtonContinue onClick={onNextRound} type="win" label={`You answered correctly "${country().name}"`} />
          </Show>
          <Show when={!game.wonLastRound()}>
            <ButtonContinue onClick={onNextRound} type="lose" label={`The correct answer was "${country().name}"`} />
          </Show>
        </Show>
        <canvas id="map" class={stylesGameMap.map}></canvas>
      </Round>
    </div>
  )
}

export default GameMap

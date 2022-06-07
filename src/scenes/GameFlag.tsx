import { Component, createSignal, Match, onMount, Show, Switch } from 'solid-js'
import ButtonContinue from '../components/ButtonContinue'
import Flag from '../components/Flag'
import Round from '../components/Round'
import Score from '../components/Score'
import Select from '../components/Select'
import { Country, getCountryRandom, selectCountryItems as countrySelectItems } from '../data/country'
import { animGameRoundEnd, animGameRoundStart, animPageHide, animPageShow } from '../services/animate'
import { classStyles } from '../services/solid'
import game from '../stores/game'
import stylesGame from './Game.module.css'
import stylesGameFlag from './GameFlag.module.css'

const GameFlag: Component = () => {
  const [country, setCountry] = createSignal<Country>(getCountryRandom())
  const countryId = () => country().id

  const onGuess = (guess: Country) => {
    const won = country().id === guess.id
    const points = won ? 10 : -15
    game.onRoundEnd(won, points)
  }

  const onNextRound = async () => {
    if (game.hasNextRound()) {
      await animGameRoundEnd({ targets: '#round' })
      const countryRandom = getCountryRandom()
      setCountry(countryRandom)
      game.onRoundStart()
      await animGameRoundStart({ targets: '#round' })
    } else {
      await animPageHide({ targets: '#game' })
      game.onQuit()
    }
  }

  onMount(async () => {
    game.onReset()
    game.onRoundStart()
    await animPageShow({ targets: '#game' })
  })

  return (
    <div id="game" {...classStyles([stylesGame.Game, stylesGameFlag.GameFlag])}>
      <Score />
      <Round id="round">
        <Switch>
          <Match when={game.isPhaseGuess()}>
            <div class={stylesGame.guess}>
              <Select items={countrySelectItems} onSelect={onGuess} />
            </div>
          </Match>
          <Match when={game.isPhaseReveal()}>
            <Show when={game.wonLastRound()}>
              <ButtonContinue onClick={onNextRound} type="win" label={`You answered correctly "${country().name}"`} />
            </Show>
            <Show when={!game.wonLastRound()}>
              <ButtonContinue onClick={onNextRound} type="lose" label={`The correct answer was "${country().name}"`} />
            </Show>
          </Match>
        </Switch>
        <Flag id={countryId} />
      </Round>
    </div>
  )
}

export default GameFlag

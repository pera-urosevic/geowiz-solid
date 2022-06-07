import { createEffect, createSignal, Index, Show } from 'solid-js'
import styles from './Select.module.css'

export type SelectItem = {
  label: string
  value: any
}

export type SelectProps = {
  items: SelectItem[]
  onSelect: (value: any) => void
}

const Select = (props: SelectProps) => {
  let ref: HTMLInputElement | undefined
  const [query, setQuery] = createSignal('')
  const [matches, setMatches] = createSignal<SelectItem[]>([])
  const [matchIndex, setMatchIndex] = createSignal<number>(0)

  const hasMatches = () => matches().length > 0

  const onSubmit = (item: SelectItem) => {
    props.onSelect(item.value)
    setQuery('')
    setMatches([])
  }

  const onMatchIndexMove = (move: number) => {
    const indexNew = matchIndex() + move
    if (!matches().hasOwnProperty(indexNew)) return
    setMatchIndex(indexNew)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case 'ArrowUp':
        e.preventDefault()
        onMatchIndexMove(-1)
        break
      case 'ArrowDown':
        e.preventDefault()
        onMatchIndexMove(+1)
        break
      case 'Enter':
      case 'Return':
      case 'Tab':
        e.preventDefault()
        const item = matches()[matchIndex()]
        if (item) onSubmit(item)
        break
      default:
        break
    }
  }

  const onMatchIndex = (i: number) => {
    setMatchIndex(i)
  }

  const onMatches = (q: string) => {
    if (!q) return setMatches([])
    const letters = q.split('').join('.*')
    const reAll = new RegExp(letters, 'i')
    const matchesAll = props.items.filter((i) => reAll.test(i.label))
    const reStart = new RegExp(`^${letters}`, 'i')
    const matchesOther = []
    const matchesStarting = []
    for (const match of matchesAll) {
      if (reStart.test(match.label)) {
        matchesStarting.push(match)
      } else {
        matchesOther.push(match)
      }
    }
    const matchesNew = [...matchesStarting, ...matchesOther].slice(0, 10)
    setMatches(matchesNew)
    setMatchIndex(0)
  }

  const onInput = (queryNew: string) => {
    onMatches(queryNew)
    setQuery(queryNew)
  }

  const onBlur = (e: FocusEvent) => {
    e.stopPropagation()
    ref?.focus()
  }

  createEffect(() => ref?.focus())

  return (
    <div class={styles.Select}>
      <input
        ref={ref}
        class={!hasMatches() ? styles.input : `${styles.input} ${styles.autocomplete}`}
        value={query()}
        onInput={(e) => onInput(e.currentTarget.value)}
        onKeyDown={onKeyDown}
        onBlur={(e) => onBlur(e)}
        autofocus
      />
      <Show when={matches().length > 0}>
        <div class={styles.matches}>
          <Index each={matches()}>
            {(match, i) => (
              <div
                class={styles.match}
                classList={{ [styles.selected]: i === matchIndex() }}
                onMouseEnter={() => onMatchIndex(i)}
                onMouseDown={() => onSubmit(match())}>
                {match().label}
              </div>
            )}
          </Index>
        </div>
      </Show>
    </div>
  )
}

export default Select

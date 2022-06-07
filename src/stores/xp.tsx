import { createSignal, createRoot } from 'solid-js'

const load = () => {
  const encoded = window.localStorage.getItem('geowiz:xp')
  if (encoded === null) return 0
  const decoded = Number(atob(encoded))
  return decoded
}

const save = (xp: number) => {
  const encoded = btoa(String(xp))
  window.localStorage.setItem('geowiz:xp', encoded)
}

const createXP = () => {
  const [xp, setXP] = createSignal(load())

  const add = (points: number) => {
    const xpNew = xp() + points
    save(xpNew)
    setXP(xpNew)
  }

  const reset = () => {
    setXP(0)
  }

  return { xp, add, reset }
}

export default createRoot(createXP)

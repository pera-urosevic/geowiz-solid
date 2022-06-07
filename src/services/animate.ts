import anime from 'animejs'

type AnimOptions = Record<string, any>

export const animPageShow = (options: AnimOptions = {}) => {
  return new Promise<void>((resolve) => {
    anime({
      opacity: [0, 0.3, 1],
      translateY: [-window.innerHeight, 0],
      duration: 600,
      easing: 'easeOutBack',
      ...options,
      complete: () => resolve(),
    })
  })
}

export const animPageHide = (options: AnimOptions = {}) => {
  return new Promise<void>((resolve) => {
    anime({
      opacity: [1, 0.3, 0],
      translateY: [0, -window.innerHeight],
      duration: 600,
      easing: 'easeInBack',
      ...options,
      complete: () => resolve(),
    })
  })
}

export const animGameRoundEnd = (options: AnimOptions = {}) => {
  return new Promise<void>((resolve) => {
    anime({
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutBack',
      ...options,
      complete: () => resolve(),
    })
  })
}

export const animGameRoundStart = (options: AnimOptions = {}) => {
  return new Promise<void>((resolve) => {
    anime({
      opacity: [0, 1],
      duration: 600,
      easing: 'easeInBack',
      ...options,
      complete: () => resolve(),
    })
  })
}

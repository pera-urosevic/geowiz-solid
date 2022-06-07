import { createEffect } from 'solid-js'
import Button from './Button'
import styles from './ButtonContinue.module.css'

export type ButtonContinueProps = {
  label?: string
  type?: string
  onClick: () => void
}

const ButtonContinue = (props: ButtonContinueProps) => {
  let ref: HTMLButtonElement | undefined

  const classButton = (type?: string) => {
    switch (type) {
      case 'win':
        return styles.win
      case 'lose':
        return styles.lose
      default:
        return ''
    }
  }

  const onBlur = (e: FocusEvent) => {
    e.stopPropagation()
    ref?.focus()
  }

  createEffect(() => ref?.focus())

  return (
    <Button ref={ref} class={classButton(props.type)} onClick={props.onClick} onBlur={(e) => onBlur(e)} autofocus>
      {props.label || 'Continue'}
    </Button>
  )
}

export default ButtonContinue

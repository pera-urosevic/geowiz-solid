import { ComponentProps } from 'solid-js'
import { classStyles } from '../services/solid'
import styles from './Button.module.css'

export type ButtonProps = ComponentProps<'button'> & {
  ref?: any
  disabled?: boolean
  onClick: () => void
}

const Button = (props: ButtonProps) => {
  const { children, ...pass } = props
  return (
    <button {...pass} {...classStyles([styles.Button, props.class])}>
      {children}
    </button>
  )
}

export default Button

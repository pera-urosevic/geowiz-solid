import { ComponentProps } from 'solid-js'
import styles from './Round.module.css'

const Round = (props: ComponentProps<'div'>) => {
  const { children, ...pass } = props
  return (
    <div class={styles.Round} {...pass}>
      {props.children}
    </div>
  )
}

export default Round

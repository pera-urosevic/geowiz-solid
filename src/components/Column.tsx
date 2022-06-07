import { ComponentProps } from 'solid-js'
import styles from './Column.module.css'

const Column = (props: ComponentProps<'div'>) => {
  const { children, ...pass } = props
  return (
    <div class={styles.Column} {...pass}>
      {props.children}
    </div>
  )
}

export default Column

import { ComponentProps } from 'solid-js'
import styles from './Row.module.css'

const Row = (props: ComponentProps<'div'>) => {
  return <div class={styles.Row}>{props.children}</div>
}

export default Row

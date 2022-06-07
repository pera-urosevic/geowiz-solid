import styles from './Flag.module.css'

export type FlagProps = {
  id: () => string
}

const Flag = (props: FlagProps) => {
  return (
    <div>
      <img class={styles.Flag} src={`/data/${props.id()}.svg`} />
    </div>
  )
}

export default Flag

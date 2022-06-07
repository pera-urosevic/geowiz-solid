import loaderSvg from '../assets/loader.svg'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div class={styles.Loader}>
      <img src={loaderSvg} />
    </div>
  )
}

export default Loader

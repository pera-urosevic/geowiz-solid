import { lazy, Suspense } from 'solid-js'
import { render } from 'solid-js/web'
import Loader from './components/Loader'
import './index.css'

const App = lazy(() => import('./components/App'))

render(
  () => (
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  ),
  document.getElementById('app') as HTMLElement
)

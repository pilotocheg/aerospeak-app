import ReactDOM from 'react-dom/client'
import { App } from './app/app'
import { clearLegacyProgress } from './entities/progress'
import { warmUpBackend } from './shared/api'
import './index.css'

warmUpBackend()
clearLegacyProgress()

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}

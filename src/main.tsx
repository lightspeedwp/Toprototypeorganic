/**
 * Application Entry Point
 * 
 * Initializes React and mounts the root App component.
 * Imports global styles and sets up the React root.
 * 
 * @module main
 */

import { createRoot } from 'react-dom/client'
import App from './app/App'
import { ErrorBoundary } from './app/components/common/ErrorBoundary'
import './app/utils/suppressFigmaErrors'
import './styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Failed to find root element. Make sure index.html has a <div id="root"></div>')
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
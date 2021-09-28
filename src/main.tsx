import { inspect } from '@xstate/inspect'
import { rest, setupWorker } from 'msw'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// @ts-ignore
if (!window.Cypress) {
  // TODO uncomment me to inspect the machine in real time
  // inspect({
  //   iframe: false,
  // })
}

const worker = setupWorker(
  // Provide request handlers
  rest.post('/api/payment/proceed', (_, res, ctx) => {
    const value = Math.floor(Math.random() * 2)
    if (value === 0) {
      return res(ctx.json({}))
    } else {
      return res(ctx.status(500))
    }
  }),
)

async function prepare() {
  // @ts-ignore
  if (import.meta.env.DEV && !window.Cypress) {
    await import('../public//mockServiceWorker.js?worker')
    return worker.start()
  }
}

prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  )
})

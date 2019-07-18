import React from 'react'
import ReactDOM from 'react-dom'
import { Subscribe, Provider } from 'unstated'
import { BrowserRouter } from 'react-router-dom'

import { PoolContainer } from './containers/poolContainer'
import { DirectoryContainer } from './containers/directoryContainer'
import { TransactionsContainer } from './containers/transactionsContainer'
import { ChartContainer } from './containers/chartContainer'
import { PoolsListContainer } from './containers/poolsListContainer'

import App from './App'

export default function AppWrapper() {
  return (
    <Provider>
      <Subscribe to={[PoolContainer, TransactionsContainer, DirectoryContainer, ChartContainer, PoolsListContainer]}>
        {(poolStore, transactionsStore, directoryStore, chartStore, poolsListStore) => (
          <BrowserRouter>
            <App
              poolStore={poolStore}
              poolsListStore={poolsListStore}
              transactionsStore={transactionsStore}
              directoryStore={directoryStore}
              chartStore={chartStore}
            />
          </BrowserRouter>
        )}
      </Subscribe>
    </Provider>
  )
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'))

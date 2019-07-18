import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TokenPage from './pages/TokenPage'

export default function App(props) {
  return (
    <Switch>
      <Route exact path="/" render={(data) => <HomePage {...data} {...props} />} />
      <Route path="/:token" render={(data) => <TokenPage {...data} {...props} />} />
    </Switch>
  )
}
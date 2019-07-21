import React, { useState, useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'

const Router = () => {
  const [current, setCurrent] = useState('home')
  useEffect(() => {
    const location = window.location.href.split('/')
    const pathname = location[location.length-1]
    setCurrent(pathname ? pathname : 'home')
  }, [])
  const updateNav = value => setCurrent(value.key)
  return (
    <HashRouter>
      <Nav current={current} updateNav={updateNav}  />
      <Switch>
        <Route exact path="/" component={Public}/>
        <Route
          exact
          path="/protected" 
          render={(routeProps) => (
            <Protected
              {...routeProps}
              current={current}
              setCurrent={setCurrent}
            />
          )}
        />
        <Route exact path="/profile" component={Profile}/>
        <Route component={Public}/>
      </Switch>
    </HashRouter>
  )
}

export default Router
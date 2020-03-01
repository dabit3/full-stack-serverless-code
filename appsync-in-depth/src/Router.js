import React, { useState, useEffect } from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './Home'
import Admin from './Admin'
import Nav from './Nav'
import Footer from './Footer'
import Container from './Container'
import Performance from './Performance'

const Router = () => {
  const [current, setCurrent] = useState('home')
  useEffect(() => {
    setRoute()
    window.addEventListener('hashchange', setRoute)
    return () =>  window.removeEventListener('hashchange', setRoute)
  }, [])
  function setRoute() {
    const location = window.location.href.split('/')
    const pathname = location[location.length-1]
    setCurrent(pathname ? pathname : 'home')
  }
  return (
    <HashRouter>
      <Nav current={current} />
      <Container>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/performance/:id" component={Performance} />
          <Route exact path="/admin" component={Admin}/>
        </Switch>
      </Container>
      <Footer />
    </HashRouter>
  )
}

export default Router
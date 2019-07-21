import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const Nav = (props) => {
  const { updateNav, current } = props
  return (
    <div>
      <Menu onClick={updateNav} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key='home'>
          <Link to={`/`}>
            <Icon type='home' />Home
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link to='/profile'>
            <Icon type='profile' />Profile
          </Link>
        </Menu.Item>
        <Menu.Item key='protected'>
          <Link to='/protected'>
            <Icon type='protected' />Protected
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default withRouter(Nav)
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const Nav = (props) => {
  const { current } = props
  return (
    <div>
      <Menu selectedKeys={[current]} mode="horizontal">
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
import React from 'react'
import { Link } from 'react-router-dom'
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
      </Menu>
    </div>
  )
}

export default Nav
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { Auth, Hub } from 'aws-amplify'

const Nav = (props) => {
  const { current } = props
  const [user, updateUser] = useState({})
  async function checkUser() {
    const userData = await Auth.currentSession().catch(err => console.log('error: ', err))
    if (!userData) return
    const { idToken: { payload }} = userData
    const isAuthorized = payload['cognito:groups'].includes('Admin')
    updateUser({
      username: payload['cognito:username'],
      isAuthorized
    })
  }
  useEffect(() => {
    checkUser()
    Hub.listen('auth', (data) => {
      const { payload: { event } } = data;
      if (event === 'signIn') checkUser()
  })
  }, [])
  console.log('user: ', user)
  return (
    <div>
      <Menu selectedKeys={[current]} mode="horizontal">
        <Menu.Item key='home'>
          <Link to={`/`}>
            <Icon type='home' />Home
          </Link>
        </Menu.Item>
        {
          user.isAuthorized && (
            <Menu.Item key='admin'>
              <Link to='/admin'>
                <Icon type='profile' />Admin
              </Link>
            </Menu.Item>
          )
        }
      </Menu>
    </div>
  )
}

export default Nav
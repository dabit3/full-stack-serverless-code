import React from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'
import { Button } from 'antd'

function Admin() { 
  async function signOut() {
    await Auth.signOut()
  }
  return (
    <div>
      <h1 style={titleStyle}>Admin</h1>
      <Button type="primary" onClick={signOut}>Sign Out</Button>
    </div>
  )
}

const titleStyle = {
  fontWeight: 'normal',
  margin: '0px 0px 10px 0px'
}

export default withAuthenticator(Admin)
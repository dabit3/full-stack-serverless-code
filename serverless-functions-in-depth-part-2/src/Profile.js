import React from 'react';
import './App.css';
import { Button } from 'antd';

import {  Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'

function Profile() {
  function signOut() {
    Auth.signOut()
      .catch(err => console.log('error signing out: ', err))
  }
  return (
    <div style={containerStyle}>
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
}

const containerStyle = {
  width: 400,
  margin: '20px auto'
}

export default withAuthenticator(Profile);

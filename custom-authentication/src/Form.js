import React, { useState, useReducer } from 'react'
import { Auth } from 'aws-amplify'
import Button from './Button'

const initialFormState = {
  username: '', password: '', email: '', confirmationCode: ''
}

function reducer(state, action) {
  switch(action.type) {
    case 'updateFormState':
      return {
        ...state, [action.e.target.name]: action.e.target.value
      }
    default:
      return state
  }
}

async function signUp({ username, password, email }, updateFormType) {
  try {
    await Auth.signUp({
      username, password, attributes: { email }
    })
    console.log('sign up success!')
    updateFormType('confirmSignUp')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function confirmSignUp({ username, confirmationCode }, updateFormType) {
  try {
    await Auth.confirmSignUp(username, confirmationCode)
    console.log('confirm sign up success!')
    updateFormType('signIn')
  } catch (err) {
    console.log('error signing up..', err)
  }
}

async function signIn({ username, password }, setUser) {
  try {
    const user = await Auth.signIn(username, password)
    console.log('sign in success!')
    setUser(user)
  } catch (err) {
    console.log('error signing up..', err)
  }
}

function forgotPassword() {}

function forgotPasswordSubmit() {}

export default function Form(props) {
  const [formType, updateFormType] = useState('signIn')
  const [formState, updateFormState] = useReducer(reducer, initialFormState)
  function renderForm() {
    switch(formType) {
      case 'signUp':
        return (
          <SignUp
            signUp={() => signUp(formState, updateFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'confirmSignUp':
        return (
          <ConfirmSignUp
            confirmSignUp={() => confirmSignUp(formState, updateFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'signIn':
        return (
          <SignIn
            signIn={() => signIn(formState, props.setUser)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'forgotPassword':
        return (
          <ForgotPassword
          forgotPassword={() => forgotPassword(formState, updateFormType)}
          updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
      case 'forgotPasswordSubmit':
        return (
          <ForgotPasswordSubmit
            forgotPasswordSubmit={() => forgotPasswordSubmit(formState, updateFormType)}
            updateFormState={e => updateFormState({ type: 'updateFormState', e })}
          />
        )
     default:
        return null
    }
  }
  

  return (
    <div>
      <div>
        {renderForm()}
      </div>
      {
        formType === 'signUp' && (
          <p style={styles.footer}>
            Already have an account? <span
              style={styles.anchor}
              onClick={() => updateFormType('signIn')}
            >Sign In</span>
          </p>
        )
      }
      {
        formType === 'signIn' && (
          <>
            <p style={styles.footer}>
              Need an account? <span
                style={styles.anchor}
                onClick={() => updateFormType('signUp')}
              >Sign Up</span>
            </p>
            <p style={{ ...styles.footer, ...styles.resetPassword}}>
              Forget your password? <span
                style={styles.anchor}
                onClick={() => updateFormType('signIn')}
              >Reset Password</span>
            </p>
          </>
        )
      }
    </div>
  )
}

function SignUp(props) {
  return (
    <div style={styles.container}>
      <input 
        name='username'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
        placeholder='username'
      />
      <input
        type='password'
        name='password'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
        placeholder='password'
      />
      <input 
        name='email'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
        placeholder='email'
      />
      <Button onClick={props.signUp} title="Sign Up" />
    </div>
  )
}

function SignIn(props) {
  return (
    <div style={styles.container}>
      <input 
        name='username'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
        placeholder='username'
      />
      <input
        type='password'
        name='password'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
        placeholder='password'
      />
      <Button onClick={props.signIn} title="Sign In" />
    </div>
  )
}

function ConfirmSignUp(props) {
  return (
    <div style={styles.container}>
      <input
        name='confirmationCode'
        placeholder='Confirmation Code'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
      />
      <Button onClick={props.confirmSignUp} title="Confirm Sign Up" />
    </div>
  )
}

function ForgotPassword(props) {
  return (
    <div style={styles.container}>
      <input
        name='username'
        placeholder='Username'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
      />
      <Button onClick={props.forgotPassword} title="Reset password" />
    </div>
  )
}

function ForgotPasswordSubmit(props) {
  return (
    <div style={styles.container}>
      <input
        name='code'
        placeholder='Confirmation code'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
      />
      <input
        name='password'
        placeholder='New password'
        type='password'
        onChange={e => {e.persist();props.updateFormState(e)}}
        style={styles.input}
      />
      <Button onClick={props.forgotPasswordSubmit} title="Save new password" />
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 45,
    marginTop: 8,
    width: 300,
    maxWidth: 300,
    padding: '0px 8px',
    fontSize: 16,
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid rgba(0, 0, 0, .3)'
  },
  button: {
    backgroundColor: '#006bfc',
    color: 'white',
    width: 316,
    height: 45,
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
    cursor: 'pointer',
    border:'none',
    outline: 'none',
    borderRadius: 3,
    marginTop: '25px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, .3)',
  },
  footer: {
    fontWeight: '600',
    padding: '0px 25px',
    marginTop: '15px',
    marginBottom: 0,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  resetPassword: {
    marginTop: '5px',
  },
  anchor: {
    color: '#006bfc',
    cursor: 'pointer'
  }
}
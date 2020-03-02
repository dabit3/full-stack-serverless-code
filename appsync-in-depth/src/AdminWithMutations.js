import React, { useState } from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { Tabs, Button, Input } from 'antd'
import { createStage, createPerformance } from './graphql/mutations'
import { slugify } from './helpers'

const { TabPane } = Tabs
const { TextArea } = Input

const initialState = { name: '', performer: '', description: ''}

function Admin() { 
  // const [formState, updateFormState] = useState(initialState)
  async function signOut() {
    await Auth.signOut()
  }
  // function onChange(event) {
  //   updateFormState({ ...formState, [event.target.name]: event.target.value })
  // }
  // async function createNewStage() {
  //   const { name } = formState
  //   const stage = { name, id: slugify(name) }
  //   await API.graphql(graphqlOperation(createStage, { input: stage}))
  //   updateFormState(initialState)
  // }
  // async function createNewPerformance() {
  //   const { performer, description } = formState
  //   const performance = { performer, description }
  //   await API.graphql(graphqlOperation(createPerformance, { input: performance }))
  //   updateFormState(initialState)
  // }
  // const { name, performer, description } = formState
  return (
    <div>
      <h1 style={titleStyle}>Admin</h1>
      {/* <Tabs defaultActiveKey="1">
        <TabPane tab="Create Performance" key="1">
          <CreatePerformance
            onChange={onChange}
            description={description}
            performer={performer}
            createNewPerformance={createNewPerformance}
          />
        </TabPane>
        <TabPane tab="Create Stage" key="2">
          <CreateStage
           onChange={onChange}
           name={name}
           createNewStage={createNewStage}
          />
        </TabPane>
      </Tabs> */}
      <Button type="primary" onClick={signOut}>Sign Out</Button>
    </div>
  )
}

function CreateStage({ onChange, createStage, name }) {
  return (
    <div style={formContainer}>
      <h3>Create new Stage</h3>
      <Input
        placeholder="Stage name"
        style={input}
        name="name"
        value={name}
        onChange={onChange}
      />
      <Button type="primary" onClick={createStage}>Create Stage</Button>
  </div>
  )
}

function CreatePerformance({ onChange, createPerformance, performer, description}) {
  return (
    <div style={formContainer}>
      <h3>Create new Performance</h3>
      <Input
        placeholder="Performer name"
        style={input}
        name="performer"
        value={performer}
        onChange={onChange}
      />
      <TextArea
        placeholder="Performance description"
        style={input}
        rows={4}
        name="description"
        onChange={onChange}
        value={description}
      />
      <Button type="primary" onClick={createPerformance}>Create Performance</Button>
    </div>
  )
}

const input = { marginBottom: 10 }
const formContainer = { marginBottom: 70 }
const titleStyle = {
  fontWeight: 'normal',
  margin: '0px 0px 10px 0px'
}

export default withAuthenticator(Admin)
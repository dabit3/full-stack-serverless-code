import React, {useEffect, useReducer} from 'react';
import { Button } from 'antd';
import './App.css';

import { API, graphqlOperation } from 'aws-amplify'
import { listNotes } from './graphql/queries'

function reducer(state, action) {
  switch(action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.notes }
    default:
      return state
  }
}

const initialState = {
  notes: []
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    fetchNotes()
  }, [])
  async function fetchNotes() {
    try {
      const notesData = await API.graphql(graphqlOperation(listNotes))
      dispatch({ type: 'SET_NOTES', notes: notesData.data.listNotes.items })
    } catch (err) {
      console.log('error: ', err)
    }
  }
  
  console.log('state: ', state)
  return (
    <div className="App" style={{padding: 20}}>
      <Button type="primary">Primary</Button>
    </div>
  );
}

export default App;

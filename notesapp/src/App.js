import React, {useEffect, useReducer} from 'react';
import { Input, List, Button, Skeleton } from 'antd'

import uuid from 'uuid/v4'
import { API, graphqlOperation } from 'aws-amplify'
import { listNotes } from './graphql/queries'
import { updateNote as UpdateNote, createNote as CreateNote, deleteNote as DeleteNote } from './graphql/mutations'
import { onCreateNote } from './graphql/subscriptions'

const CLIENT_ID = uuid()

function reducer(state, action) {
  switch(action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.notes, loading: false }
    case 'ADD_NOTE':
      return { ...state, notes: [action.note, ...state.notes]}
    case 'RESET_FORM':
      return { ...state, form: initialState.form }
    case 'SET_INPUT':
      return { ...state, form: { ...state.form, [action.name]: action.value } }
    case 'ERROR':
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

const initialState = {
  notes: [],
  loading: true,
  error: false,
  form: { name: '', description: '' }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchNotes()
    const subscription = API.graphql(graphqlOperation(onCreateNote))
      .subscribe({
        next: noteData => {
          const note = noteData.value.data.onCreateNote
          if (CLIENT_ID === note.clientId) return
          dispatch({ type: 'ADD_NOTE', note })
        }
      })
      return () => subscription.unsubscribe()
  }, [])

  async function fetchNotes() {
    try {
      const notesData = await API.graphql(graphqlOperation(listNotes))
      dispatch({ type: 'SET_NOTES', notes: notesData.data.listNotes.items })
    } catch (err) {
      console.log('error: ', err)
      dispatch({ type: 'ERROR' })
    }
  }

  function onChange(e) {
    dispatch({ type: 'SET_INPUT', name: e.target.name, value: e.target.value })
  }

  async function createNote() {
    const { form } = state
    if (!form.name || !form.description) return alert('please enter a name and description')
    const note = { ...form, clientId: CLIENT_ID }
    dispatch({ type: 'ADD_NOTE', note })
    dispatch({ type: 'RESET_FORM' })
    try {
      await API.graphql(graphqlOperation(CreateNote, { input: note }))
      console.log('successfully created note!')
    } catch (err) {
      console.log("error: ", err)
    }
  }

  async function updateNote(note) {
    const index = state.notes.findIndex(n => n.id === note.id)
    const notes = [...state.notes]
    notes[index].completed = !note.completed 
    dispatch({ type: 'SET_NOTES', notes})
    try {
      await API.graphql(graphqlOperation(UpdateNote, { input: notes[index] }))
      console.log('note successfully updated!')
    } catch (err) {
      console.log('error: ', err)
    }
  }

  async function deleteNote(note) {
    const index = state.notes.findIndex(n => n.id === note.id)
    const notes = [...state.notes.slice(0, index), ...state.notes.slice(index + 1)];
    dispatch({ type: 'SET_NOTES', notes })
    try {
      await API.graphql(graphqlOperation(DeleteNote, { input: {id: note.id} }))
      console.log('successfully deleted note!') 
      } catch (err) {
        console.log({ err })
    }
  }

  return (
    <div style={styles.container}>
      <Input
        onChange={onChange}
        value={state.form.name}
        placeholder="Note Name"
        name='name'
        style={styles.input}
      />
      <Input
        onChange={onChange}
        value={state.form.description}
        placeholder="Note description"
        name='description'
        style={styles.input}
      />
      <Button
        onClick={createNote}
        type="primary"
      >Create Note</Button>
      <List
        loading={state.loading}
        itemLayout="horizontal"
        dataSource={state.notes}
        renderItem={item => (
          <List.Item
            style={styles.item}
            actions={[
              <p style={styles.p} onClick={() => deleteNote(item)}>Delete</p>,
              <p style={styles.p} onClick={() => updateNote(item)}>
                {item.completed ? 'completed' : 'mark completed'}
              </p>
            ]}
          >
            <Skeleton
              avatar
              title={false}
              active
              loading={state.loading}
            >
              <List.Item.Meta
                title={item.name}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

const styles = {
  container: {padding: 20},
  input: {marginBottom: 10},
  item: { textAlign: 'left' },
  p: { color: '#1890ff' }
}

export default App;

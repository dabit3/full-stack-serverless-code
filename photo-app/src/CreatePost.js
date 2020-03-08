import React, { useState } from 'react';
import { Button, Input } from 'antd'
import { v4 as uuid } from 'uuid'
import { createPost } from './graphql/mutations'
import { API, graphqlOperation, Storage } from 'aws-amplify'

const initialFormState = {
  title: '',
  image: {}
}

function CreatePost({ updateViewState }) {
  const [formState, updateFormState] = useState(initialFormState)

  function onChange(key, value) {
    updateFormState({ ...formState, [key]: value })
  }

  function setPhoto(e) {
    const file = e.target.files[0]
    updateFormState({ ...formState, image: file })
    return false
  }

  async function savePhoto() {
    const { title, image } = formState
    if (!title || !image.name ) return

    const imageKey = uuid() + formState.image.name.replace(/\s/g, '-').toLowerCase()
    await Storage.put(imageKey, formState.image)
    const post = { title, imageKey }
    await API.graphql(graphqlOperation(createPost, { input: post }))
    updateViewState('viewPosts')
  }

  return (
    <div>
      <h2 style={heading}>Add Photo</h2>
      <Input
        onChange={e => onChange('title', e.target.value)}
        style={withMargin}
        placeholder="Title"
      />
      <input
        type='file'
        onChange={setPhoto}
        style={button}
      />
      <Button style={button} type="primary" onClick={savePhoto}>Save Photo</Button>
    </div>
  );
}

const heading = { margin: '20px 0px' }
const withMargin = { marginTop: 10 }
const button = { marginTop: 10 }

export default CreatePost
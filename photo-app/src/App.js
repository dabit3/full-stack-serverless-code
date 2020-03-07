import React, { useState, useEffect } from 'react';
import { Button, Input, Radio, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

const initialFormState = {
  title: '',
  image: {}
}

function App() {
  const [formState, updateFormState] = useState(initialFormState)
  const [viewState, updateViewState] = useState('viewPhotos')

  function handleSizeChange(e) {
    updateViewState(e.target.value)
  }
  
  function addPhoto() {}

  return (
    <div style={container}>
      <h1>Photo App</h1>
      <Radio.Group value={viewState} onChange={handleSizeChange}>
        <Radio.Button value="viewPhotos">View Photos</Radio.Button>
        <Radio.Button value="addPhoto">Add Photo</Radio.Button>
      </Radio.Group>
      {
        viewState === 'viewPhotos' ? (
          <div>
            <h2 style={heading}>Photos</h2>
          </div>
        ) : (
          <div>
            <h2 style={heading}>Add Photo</h2>
            <Input style={withMargin} placeholder="Title" />
            <Upload>
              <Button style={withMargin}>
                <UploadOutlined /> Upload Image
              </Button>
            </Upload>
            <Button type="primary" onClick={addPhoto}>Add Photo</Button>
          </div>
        )
      }
    </div>
  );
}

const container = { width: 500, margin: '0 auto', padding: 50 }
const heading = { margin: '20px 0px' }
const withMargin = { marginBottom: 10 }

export default App;

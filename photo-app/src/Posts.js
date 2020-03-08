import React, { useReducer, useEffect } from 'react';

import { listPosts } from './graphql/queries'
import { onCreatePost } from './graphql/subscriptions'
import { API, graphqlOperation, Storage } from 'aws-amplify'

function reducer(state, action) {
  switch(action.type) {
    case 'SET_POSTS':
      return  action.posts
    case 'ADD_POST':
      return [action.post, ...state]
    default:
      return state
  }
}

async function getSignedPosts(posts) {
  const signedPosts = await Promise.all(
    posts.map(async item => {
      const signedUrl = await Storage.get(item.imageKey)
      item.imageUrl = signedUrl
      return item
    })
  )
  return signedPosts
}

function Posts() {
  const [posts, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    fetchPosts()

    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: async post => {
        const newPost = post.value.data.onCreatePost
        const signedUrl = await Storage.get(newPost.imageKey)
        newPost.imageUrl = signedUrl
        dispatch({ type: 'ADD_POST', post: newPost })
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function fetchPosts() {
    const postData = await API.graphql(graphqlOperation(listPosts))
    const { data: { listPosts: { items }}} = postData
    const signedPosts = await getSignedPosts(items)
    dispatch({ type: 'SET_POSTS', posts: signedPosts })
  }

  return (
    <div>
      <h2 style={heading}>Posts</h2>
      {
        posts.map(post => (
          <div key={post.id} style={postContainer}>
            <img style={postImage} src={post.imageUrl} />
            <h3 style={postTitle}>{post.title}</h3>
          </div>
        ))
      }
    </div>
  )
}

const postContainer = { padding: '20px 0px 0px', borderBottom: '1px solid #ddd' }
const heading = { margin: '20px 0px' }
const postImage = { width: 400 }
const postTitle = { marginTop: 4 }

export default Posts
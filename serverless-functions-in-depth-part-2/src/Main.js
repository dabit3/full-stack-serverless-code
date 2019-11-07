import React, { useState, useEffect } from 'react'
import Container from './Container'
import { API } from 'aws-amplify'
import { List } from 'antd';

function Main() {
  const [state, setState] = useState({products: [], loading: true})
  let didCancel = false
  useEffect(() => {
    getProducts()
    return () => didCancel = true
  }, [])
  async function getProducts() {
    const data = await API.get('ecommerceapi', '/products')
    console.log('data: ', data)
    if (didCancel) return
    setState({
      products: data.data.Items, loading: false
    })
  }
  async function updateItem() {
    try {
      const data = await API.put('ecommerceapi', '/products',
      { body: { id: "10f82a3c-8ae0-4dc3-aded-acf2482cd7e3" } })
    console.log('data: ', data)
    console.log('successfully updated item')
    } catch (err) {
      console.log('error: ', err)
    }
  }
  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={state.products}
        loading={state.loading}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={item.name}
              description={item.price}
            />
          </List.Item>
        )}
      />
      <button onClick={updateItem}>Update item</button>
    </Container>
  )
}

export default Main
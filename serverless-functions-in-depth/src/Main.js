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
    </Container>
  )
}

export default Main
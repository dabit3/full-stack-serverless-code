import React from 'react'

export default function Title({ title }) {
  return (
  <h1 style={header}>{title}</h1>
  )
}

const header = { fontSize: 44, fontWeight: 300, marginBottom: 5 }
import React from 'react'

export default function Button({ onClick, title }) {
  return (
    <button style={styles.button} onClick={onClick}>
      {title}
    </button>
  )
}

const styles = {
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
}
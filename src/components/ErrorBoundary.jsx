import React from 'react'

function ErrorBoundary({ error }) {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>{error}</h1>
    </div>
  )
}

export default ErrorBoundary
import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { getPerformance } from './graphql/queries'
import { API } from 'aws-amplify'

function Performance() {
  const [performance, setPerformance] = useState(null)
  const [loading, setLoading] = useState(true)

  let { id } = useParams()
  useEffect(() => {
    fetchPerformanceInfo()
  }, [])
  async function fetchPerformanceInfo() {
    try {
      const talkInfo = await API.graphql({
        query: getPerformance,
        variables: { id },
        authMode: 'AWS_IAM'
      })
      setPerformance(talkInfo.data.getPerformance)
      setLoading(false)
    } catch (err) {
      console.log('error fetching talk info...', err)
      setLoading(false)
    }
  }
  console.log('performance: ', performance)
  return (
    <div>
      <p>Performance</p>
      { loading && <h3>Loading...</h3>}
      {
        performance && (
          <div>
            <h1>{performance.performer}</h1>
            <h3>{performance.time}</h3>
            <p>{performance.description}</p>
          </div>
        )
      }
    </div>
  )
}

export default Performance
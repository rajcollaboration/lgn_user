import React from 'react'
import LeftSidebar from './LeftSidebar'
import StreamArea from './StreamArea'
import RightSidebar from './RightSidebar'

const Tournament2 = () => {
  return (
    <div style={{
        display: 'flex',
        width: '100%',
        minHeight: 'calc(100% - 80px)',
        justifyContent: 'space-between',
        transition: 'all 0.5s',
      }}>
        <LeftSidebar/>
        <StreamArea/>
        <RightSidebar/>
    </div>
  )
}

export default Tournament2
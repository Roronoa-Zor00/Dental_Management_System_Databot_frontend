import React from 'react'
import Sidebar from '../../components/Sidebar.jsx/Sidebar'
import { Outlet } from 'react-router-dom'

const Client = () => {
  return (
    <div className="layout">
    <div className="left-side">
      <Sidebar />
    </div>
    <div className="right-side">
      <Outlet/>
    </div>
  </div>
  )
}

export default Client
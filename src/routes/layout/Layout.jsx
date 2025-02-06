import React,{useEffect} from 'react'
import Sidebar from '../../components/Sidebar.jsx/Sidebar'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  useEffect(()=>{
    if(!token) {
      navigate('/login')
    }
  },[token])
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

export default Layout
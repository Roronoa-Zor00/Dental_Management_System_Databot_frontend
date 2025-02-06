import React from 'react'
import { Link } from 'react-router-dom'
import NotAuth from '../images/NotAuth.png'

const NotAuthorized = () => {
  return (
    <div className='page-not-found'>
      <div className="mb-2 image">
        <img  src={NotAuth} />
      </div>
        <div className="title mb-2">
           YOU ARR NOT AUTHORIZED
        </div>
        <div className="title">
            <Link className="title" to="/dashboard">GO BACK </Link>
        </div>
    </div>
  )
}

export default NotAuthorized
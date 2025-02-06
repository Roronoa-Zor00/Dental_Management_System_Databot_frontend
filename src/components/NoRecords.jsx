import React from 'react'
import { Link } from 'react-router-dom'
import NotFound from '../images/notfound.png'

const NoRecords = () => {
  return (
    <div className='page-not-found'>
        <div className="image">
            <img src={NotFound} alt="" />
        </div>
        <div className="title mb-2">
           NO RECORD FOUND!
        </div>
        <div className="title">
            <Link className="title" to="/dashboard">GO BACK</Link>
        </div>
    </div>
  )
}

export default NoRecords
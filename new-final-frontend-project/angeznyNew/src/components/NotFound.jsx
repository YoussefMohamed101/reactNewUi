import React from 'react'
import notFound from '../assets/images/error-404.webp'
const NotFound = () => {
  return (
    <div className='container'>
    <div className='row d-flex justify-content-center'>
    <div className='col-7 '>
    <img src={notFound} className='w-100'></img>
    </div>
    </div>
    </div>
  )
}

export default NotFound
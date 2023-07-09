import React, { Component } from 'react'
import success from '../../../../components/undraw_completed_03xt.svg'

export class Success extends Component {
  render() {
    return (
      <div>
      <div className='row w-100 d-flex justify-content-center my-5'>
       <div className='col-sm-12 col-md-6 col-xl-6'>
        <img className="" src={success}alt="failed"/>
        </div>
        </div>
      </div>
    )
  }
}

export default Success
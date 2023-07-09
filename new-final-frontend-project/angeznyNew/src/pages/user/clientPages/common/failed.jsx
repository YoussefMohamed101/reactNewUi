import React, { Component } from 'react'
import failed from '../../../../components/undraw_access_denied_re_awnf.svg'


export class Failed extends Component {
  render() {
    return (
      <div>
        <div className='row w-100 d-flex justify-content-center mt-5'>
        <div className='col-sm-12 col-md-6 col-xl-6'>
        <img className="h-75" src={failed}alt="failed"/>
        </div>
        </div>
      </div>
    )
  }
}

export default Failed
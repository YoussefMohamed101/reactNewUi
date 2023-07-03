import React from 'react';
import { MDBInput, MDBCheckbox, MDBBtn ,MDBTextArea} from 'mdb-react-ui-kit';
import contact from '../assets/images/contact-us-banner_1200x_b5d96e9c-3ac4-4678-9aff-aba24ff2b0fc_1600x.webp'

import '../styles/contactUs.css'
const ContactUs = () => {
  return (
    <div>
    <section>
    <div className='container'>
    <div className='row justify-content-center p-5 '>
    <h2 className='d-flex justify-content-around p-5 align-items-center text-info fw-bolder'>Contact us</h2>

    <div className='col-5 contact-us'>
    <img src={contact} className='contactImg'></img>
    </div>


    <div className='col-5 contactForm'>
    <form id='form' className='text-center' style={{ width: '100%', maxWidth: '300px' }}>
    

      <MDBInput label='Name' v-model='name' wrapperClass='mb-4' />

      <MDBInput type='email' label='Email address' v-model='email' wrapperClass='mb-4' />

      <MDBInput label='Subject' v-model='subject' wrapperClass='mb-4' />

      <MDBTextArea wrapperClass='mb-4' label='Message' />

      <MDBCheckbox wrapperClass='d-flex justify-content-center' label='Send me copy' />

      <MDBBtn  block color='info' className='  my-4 '>
        Send
      </MDBBtn>
    </form>
    </div>
    
    </div>
    </div>
    </section>
      </div>
  )
}

export default ContactUs
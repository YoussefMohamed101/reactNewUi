import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import "./footer.css";

const Footer = () => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        

        <div>
          <a href='www.fb.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='www.fb.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='www.fb.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='www.fb.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='www.fb.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='www.fb.com' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <p className='text-uppercase fw-bold mb-3 logoName'>
                <div color='secondary' icon='gem' className='me-3 nav-link    ' />
                <span className="firstLetter">A</span>ngezny
              </p>
              <p>
              Building websites and web applications using programming languages like HTML, CSS, JavaScript, and frameworks like Laravel, Django, or Ruby on Rails.
              </p>
            </MDBCol>

          

          

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contacts</h6>
              <p>
                <MDBIcon  icon='home' className='me-2 Icons ' />
                Cairo, NY 10012, US
              </p>
              <p>
                <MDBIcon  icon='envelope' className='me-3 Icons' />
                Angezny.com
              </p>
              <p>
                <MDBIcon  icon='phone' className='me-3 Icons' /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon  icon='print' className='me-3 Icons' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

     
    </MDBFooter>
  );
}

export default Footer


import React from 'react';
import '../styles/AboutUs.css';

import amira from '../assets/images/amirq.jpg'
import about from '../assets/images/background.jpg'
import ismail from '../assets/images/ismail.jpg'
import ibrahim from '../assets/images/Ibrahim.jpg'
import norhan from '../assets/images/norhan.jpg'
import omar from '../assets/images/omar.jpg'
import yossef from '../assets/images/yossef.jpg'
import contactUs from '../assets/images/bussiness/bus5.jpg'


const AboutUs = () => {
  return (
    <div >
    <section className='mb-5 sliderSection'>
    <div className='container'>
    <div className='row d-flex justify-content-center'>

    <div id="carouselExampleCaptions" className="carousel slide col-12 col-md-10 ">
   
    <div class="carousel-inner">
      <div className="carousel-item active d-flex justify-content-center">
        <img src={contactUs} className="d-block w-100 h-50 d-flex justify-content-center" alt="..."></img>
        <div className="carousel-caption d-none d-md-block">
        <p className="header">Programming companies can work with various industries and clients
        </p>
        
          <button className='buttonHeader'>View more</button>
        </div>
      </div>
      
      
    </div>
    </div>

  </div>
  </div>
  </section>

  <section style={{ backgroundColor:"rgb(239, 239, 239)"}} className='mb-5'>
  <div className='container'>
  <div className='row'>
  
  <div className='row Div-CONTAINER  d-flex justify-content-around'>
  
  <div className='col-md-4 col-10 contact-DIV1 mb-5'>
   <img src={about} className='contact-Imag1 '>
   </img>
   <div style={{marginTop:'350px'}}>
   <h2 >Read a brief about us...</h2>
   
   </div>
   
   </div>
   <div className='col-6'>
   

   <div className='row'>
   
   <p className='fs-3'>Company that specializes in providing software development services. These companies typically have a team of skilled programmers, developers, and engineers who work together to create and maintain software applications for clients.</p>
   </div>

   <div className='col-md-2 col-10 contact-DIV2 mb-5'>
   <img src={about} className='contact-Imag2 '>
   </img>
   
   
   </div>
   </div>
  </div>
  </div>
  </div>
  </section>


  
  <section>
  <div className='container'>
  <div className='row'>
  <div className='row DivCONTAINER  d-flex justify-content-around'>
  <div className='row text-center mb-5'>
  <h1>Our team</h1>
  </div>
  <div className='col-md-3 col-10 contactDIV mb-5 bg-dark'>
   <img src={ismail} className='contactImag '>
   </img>
   <div style={{marginTop:'350px'}}>
   <h2 >Ismail magdy</h2>
   <p>CEO</p>
   </div>
   
   </div>
   <div className='col-md-3 col-10 contact-DIV1 mb-5'>
   <img src={omar} className='contactImag '>
   </img>
   <div style={{marginTop:'350px'}}>
   <h2 >Omar gamal</h2>
   <p>CEO</p>
   </div>
   
   </div>
   <div className='col-md-3 col-10 contactDIV mb-5'>
   <img src={norhan} className='contactImag '>
   </img>
   <div style={{marginTop:'350px'}}>
   <h2 >Norhan khalid</h2>
   <p>CEO</p>
   </div>
   
   </div>
  </div>
  <div className='row DivCONTAINER  d-flex justify-content-around'>
  
  <div className='col-md-3 col-10 contactDIV mb-5 bg-dark'>
   <img src={amira} className='contactImag '>
   </img>
   <div style={{marginTop:'350px'}}>
   <h2 >Eatedal makram</h2>
   <p>CEO</p>
   </div>
   
   </div>
   <div className='col-md-3 col-10 contact-DIV1 mb-5'>
   <img src={ibrahim} className='contactImag '>
   </img>
   <div style={{marginTop:'350px'}}>
   <h2 >Ibrahim salah</h2>
   <p>CEO</p>
   </div>
   
   </div>
   <div className='col-md-3 col-10 contactDIV mb-5'>
   <img src={yossef} className='contactImag '>
   </img>
   <div style={{marginTop:'350px'}}>
   <h2 >Yossef mohamed</h2>
   <p>CEO</p>
   </div>
   
   </div>
  </div>
  </div>
  </div>
  </section>
  


 
    </div>
  );
};

export default AboutUs;
